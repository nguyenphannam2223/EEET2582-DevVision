const userRepository = require("../repositories/user.repository");
const {
  generateToken,
  generateRefreshToken,
  verifyToken,
} = require("../utils/token");
const { createCompanyProfile } = require("../services/company-integration");
const { BadRequestError, kafkaWrapper } = require("@devvision/common");

const register = async (req, res, next) => {
  try {
    const {
      email,
      password,
      country,
      companyName,
      address,
      city,
      phoneNumber,
    } = req.body;

    // Basic Validation
    if (!email || !password || !country) {
      throw new BadRequestError("Email, password, and country are required");
    }

    // Password Strength (Req 1.2.1)
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!passwordRegex.test(password)) {
      throw new BadRequestError(
        "Password must be at least 8 chars, contain 1 number, 1 special char, 1 uppercase letter"
      );
    }

    // Email Syntax (Req 1.2.2)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new BadRequestError("Invalid email format");
    }

    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new BadRequestError("Email already in use");
    }

    const user = await userRepository.create({
      email,
      password,
      role: "company",
    });

    // Create Profile in Company Service
    let profile;
    try {
      profile = await createCompanyProfile(user.id, {
        name: companyName || email.split("@")[0],
        country,
        email,
        address,
        city,
        phoneNumber,
      });
    } catch (err) {
      // Rollback
      await userRepository.deleteById(user.id);
      throw new Error(
        "Failed to create company profile, registration aborted."
      );
    }

    // Propagate Country and Profile to Kafka (Req 4.3.1)
    await kafkaWrapper.publish("profile-updates", {
      type: "PROFILE_CREATED",
      companyId: user.id,
      country: country,
      name: companyName || email.split("@")[0],
      email: email,
    });

    const accessToken = await generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });
    const refreshToken = await generateRefreshToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    res.status(201).send({ accessToken, refreshToken, user });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new BadRequestError("Invalid credentials");
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new BadRequestError("Invalid credentials");
    }

    const accessToken = await generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });
    const refreshToken = await generateRefreshToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    res.status(200).send({ accessToken, refreshToken, user });
  } catch (err) {
    next(err);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      throw new BadRequestError("Refresh Token is required");
    }

    const payload = await verifyToken(refreshToken);

    // In a real system, checking against a whitelist/blacklist of refresh tokens in Redis is recommended (Req 2.3.2/2.2.3)
    // For now we just verify signature/encryption and expiration.

    const accessToken = await generateToken({
      id: payload.id,
      email: payload.email,
      role: payload.role,
    });
    // Optionally rotate refresh token

    res.status(200).send({ accessToken });
  } catch (err) {
    throw new BadRequestError("Invalid Refresh Token");
  }
};

module.exports = {
  register,
  login,
  refreshToken,
};
