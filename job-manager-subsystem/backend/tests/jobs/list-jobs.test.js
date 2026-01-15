const request = require('supertest');
const { API_URL } = require('../setup');

describe('Job Service - List Jobs', () => {
    const testUser = {
        email: `job-list-${Date.now()}@example.com`,
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

        // Post a job to list
        await agent.post('/jobs/jobs').send({
            title: 'List Test Job',
            description: 'Test job for listing',
            requirements: 'None',
            salaryRange: 'Negotiable',
            skills: ['Test'],
            companyId: companyId
        });
    });

    it('should list jobs for company', async () => {
        const res = await agent.get(`/jobs/jobs/company/${companyId}`);
        
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });
});
