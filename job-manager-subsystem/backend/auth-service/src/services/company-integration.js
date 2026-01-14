const axios = require('axios');

// Ideally this URL comes from env vars or service discovery
const COMPANY_SERVICE_URL = process.env.COMPANY_SERVICE_URL || 'http://company-service:3000';

const createCompanyProfile = async (companyId, profileData) => {
    try {
        const response = await axios.post(`${COMPANY_SERVICE_URL}/internal/profiles`, {
            companyId,
            ...profileData
        });
        return response.data;
    } catch (error) {
        console.error('Error creating company profile:', error.message);
        throw new Error('Failed to create company profile');
    }
};

module.exports = {
    createCompanyProfile
};
