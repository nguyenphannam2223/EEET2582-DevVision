const profileRepository = require("../repositories/profile.repository");
const { BadRequestError, kafkaWrapper } = require("@devvision/common");

const createProfileInternal = async (req, res, next) => {
  try {
    const { companyId, name, email, country, city, address, phoneNumber } =
      req.body;

    if (!companyId || !name || !email || !country) {
      throw new BadRequestError("Missing required fields");
    }

    const existingProfile = await profileRepository.findByCompanyId(companyId);
    if (existingProfile) {
      return res.status(200).send(existingProfile); // Idempotency
    }

    const profile = await profileRepository.create({
      companyId,
      name,
      email,
      country,
      city,
      address,
      phoneNumber,
    });

    res.status(201).send(profile);
  } catch (err) {
    next(err);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const profile = await profileRepository.findByCompanyId(id);
    if (!profile) {
      throw new BadRequestError("Profile not found");
    }
    res.status(200).send(profile);
  } catch (err) {
    next(err);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    delete updates.companyId;

    const profile = await profileRepository.updateByCompanyId(id, updates);

    if (!profile) {
      throw new BadRequestError("Profile not found");
    }

    // Propagate Country and Profile updates to Kafka (Req 4.3.1)
    await kafkaWrapper.publish("profile-updates", {
      type: "PROFILE_UPDATED",
      companyId: id,
      country: profile.country,
      name: profile.name,
      email: profile.email,
      updates: updates,
    });

    res.status(200).send(profile);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createProfileInternal,
  getProfile,
  updateProfile,
};
