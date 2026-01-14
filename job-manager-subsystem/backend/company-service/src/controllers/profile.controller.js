const CompanyProfile = require('../models/profile.model');
const { BadRequestError } = require('@devvision/common');

const createProfileInternal = async (req, res, next) => {
  try {
    const { companyId, name, email, country, city, address, phoneNumber } = req.body;

    if (!companyId || !name || !email || !country) {
      throw new BadRequestError('Missing required fields');
    }

    const existingProfile = await CompanyProfile.findOne({ companyId });
    if (existingProfile) {
        return res.status(200).send(existingProfile); // Idempotency
    }

    const profile = new CompanyProfile({
      companyId,
      name,
      email,
      country,
      city,
      address,
      phoneNumber
    });
    
    await profile.save();

    res.status(201).send(profile);
  } catch (err) {
    next(err);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const profile = await CompanyProfile.findOne({ companyId: id });
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
    // In a real scenario, we should verify that req.currentUser.id === id (companyId)
    // Assuming Auth Middleware populates req.currentUser and Gateway passes it

    const updates = req.body;
    // Prevent updating companyId or critical fields if needed
    delete updates.companyId;

    const profile = await CompanyProfile.findOneAndUpdate(
      { companyId: id },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!profile) {
      throw new BadRequestError("Profile not found");
    }

    res.status(200).send(profile);
  } catch (err) {
    next(err);
  }
};

const uploadLogo = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!req.file) {
      throw new BadRequestError("No file uploaded");
    }

    // Generate full URL (assuming served from /uploads route)
    const logoUrl = `/uploads/${req.file.filename}`;

    const profile = await CompanyProfile.findOneAndUpdate(
      { companyId: id },
      { logoUrl },
      { new: true }
    );

    if (!profile) {
      throw new BadRequestError("Profile not found");
    }

    res.status(200).send(profile);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createProfileInternal,
  getProfile,
  updateProfile,
  uploadLogo,
};
