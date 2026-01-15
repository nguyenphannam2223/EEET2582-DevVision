const request = require('supertest');
const { API_URL } = require('../setup');

describe('Company Service - Get Profile', () => {
    const testUser = {
        email: `company-get-${Date.now()}@example.com`,
        password: 'Password123!',
        role: 'company',
        country: 'Vietnam'
    };
    let companyId;
    let agent = request.agent(API_URL);

    beforeAll(async () => {
        await agent.post('/auth/signup').send(testUser);
        const loginRes = await agent.post('/auth/signin').send({
            email: testUser.email,
            password: testUser.password
        });
        companyId = loginRes.body.user._id || loginRes.body.user.id;
    });

    it('should get company profile', async () => {
        const res = await agent.get(`/companies/${companyId}`);
        expect(res.status).toBe(200);
        expect(res.body.companyId).toBe(companyId);
    });
});
