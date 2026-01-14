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
    // This will be implemented fully later, for now placeholder
    try {
        const { id } = req.params;
        const profile = await CompanyProfile.findOne({ companyId: id });
        if (!profile) {
             throw new BadRequestError('Profile not found');
        }
        res.status(200).send(profile);
    } catch(err) {
        next(err);
    }
}

module.exports = {
  createProfileInternal,
  getProfile
};
