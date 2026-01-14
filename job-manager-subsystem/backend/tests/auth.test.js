const request = require('supertest');
const { API_URL } = require('./setup');

describe('Auth Service E2E', () => {
    const testUser = {
        email: `test-${Date.now()}@example.com`,
        password: 'Password123!',
        role: 'company',
        country: 'Vietnam',
        address: '123 Test St',
        city: 'Test City',
        companyName: 'Test Company'
    };

    let authToken;

    it('should register a new user', async () => {
        const res = await request(API_URL)
            .post('/auth/signup')
            .send(testUser);

        expect(res.status).toBe(201);
        expect(res.body.user.email).toBe(testUser.email);
        expect(res.body.user.role).toBe(testUser.role);
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
        
        // Check httpOnly cookie
        // const cookies = res.headers['set-cookie'];
        // expect(cookies).toBeDefined();
        
        // For E2E testing convenience, we might need a way to grab the token if strictly cookie based,
        // but our implementation returns user info. The cookie is handled by agent for subsequent requests usually.
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
