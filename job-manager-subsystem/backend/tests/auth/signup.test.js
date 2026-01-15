const request = require('supertest');
const { API_URL } = require('../setup');

describe('Auth Service - Signup', () => {
    const testUser = {
        email: `test-${Date.now()}@example.com`,
        password: 'Password123!',
        role: 'company',
        country: 'Vietnam',
        address: '123 Test St',
        city: 'Test City',
        companyName: 'Test Company'
    };

    it('should register a new user', async () => {
        const res = await request(API_URL)
            .post('/auth/signup')
            .send(testUser);

        expect(res.status).toBe(201);
        expect(res.body.user.email).toBe(testUser.email);
        expect(res.body.user.role).toBe(testUser.role);
    });
});
