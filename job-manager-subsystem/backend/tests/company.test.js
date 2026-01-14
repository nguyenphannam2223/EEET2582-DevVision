const request = require('supertest');
const { API_URL } = require('./setup');

describe('Company Service E2E', () => {
    const testUser = {
        email: `company-${Date.now()}@example.com`,
        password: 'Password123!',
        role: 'company',
        country: 'Vietnam'
    };
    let authToken;
    let companyId;
    let agent = request.agent(API_URL); // To persist cookies

    beforeAll(async () => {
        // Register and Login
        await agent.post('/auth/signup').send(testUser);
        const loginRes = await agent.post('/auth/signin').send({
            email: testUser.email,
            password: testUser.password
        });
        companyId = loginRes.body.user._id || loginRes.body.user.id;
    });

    it('should update company profile', async () => {
        const updateData = {
            name: 'Tech Corp',
            country: 'Vietnam',
            city: 'Ho Chi Minh',
            address: 'District 1'
        };

        const res = await agent
            .put(`/companies/${companyId}`)
            .send(updateData);

        expect(res.status).toBe(200);
        expect(res.body.name).toBe(updateData.name);
        expect(res.body.country).toBe(updateData.country);
    });

    it('should get company profile', async () => {
        const res = await agent.get(`/companies/${companyId}`);
        expect(res.status).toBe(200);
        expect(res.body.companyId).toBe(companyId);
    });
});
