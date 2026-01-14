const request = require('supertest');
const { API_URL } = require('./setup');

describe('Job Service E2E', () => {
    const testUser = {
        email: `job-poster-${Date.now()}@example.com`,
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

    it('should post a new job', async () => {
        const jobData = {
            title: 'Senior Node.js Developer',
            description: 'We are looking for an expert backend developer.',
            requirements: 'Node.js, Express, MongoDB, Docker',
            salaryRange: '$3000 - $5000',
            skills: ['Node.js', 'MongoDB'],
            companyId: companyId
        };

        const res = await agent
            .post('/jobs/jobs')
            .send(jobData);

        expect(res.status).toBe(201);
        expect(res.body.title).toBe(jobData.title);
        expect(res.body.skills).toEqual(expect.arrayContaining(['Node.js']));
    });

    it('should list jobs for company', async () => {
        const res = await agent.get(`/jobs/jobs/company/${companyId}`);
        
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body[0].title).toBe('Senior Node.js Developer');
    });
});
