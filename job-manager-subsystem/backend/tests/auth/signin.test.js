const request = require('supertest');
const { API_URL } = require('../setup');

describe('Auth Service - Signin', () => {
    const testUser = {
        email: `signin-test-${Date.now()}@example.com`,
        password: 'Password123!',
        role: 'company',
        country: 'Vietnam',
        address: '123 Test St',
        city: 'Test City',
        companyName: 'Test Company'
    };

    beforeAll(async () => {
        // Register the user first so we can sign in
        await request(API_URL)
            .post('/auth/signup')
            .send(testUser);
    });

    it('should login with valid credentials', async () => {
        const res = await request(API_URL)
            .post('/auth/signin')
            .send({
                email: testUser.email,
                password: testUser.password
            });

        expect(res.status).toBe(200);
        expect(res.body.user).toHaveProperty('_id');
        expect(res.body.user).toHaveProperty('email', testUser.email);
    });

    it('should fail login with invalid password', async () => {
        const res = await request(API_URL)
            .post('/auth/signin')
            .send({
                email: testUser.email,
                password: 'wrongpassword'
            });

        expect(res.status).toBe(400);
    });
});
