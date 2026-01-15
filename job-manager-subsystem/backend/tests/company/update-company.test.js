const request = require('supertest');
const { API_URL } = require('../setup');

describe('Company Service - Update Profile', () => {
    const testUser = {
        email: `company-update-${Date.now()}@example.com`,
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

    it('should update company profile', async () => {
        const updateData = {
            name: 'Updated Tech Corp',
            country: 'Vietnam',
            city: 'Ho Chi Minh',
            address: 'District 1'
        };

        const res = await agent
            .put(`/companies/${companyId}`)
            .send(updateData);

        expect(res.status).toBe(200);
        expect(res.body.name).toBe(updateData.name);
    });
});
