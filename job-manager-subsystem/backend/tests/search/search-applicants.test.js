const request = require('supertest');
const { API_URL } = require('../setup');

describe('Search Service - Search Applicants', () => {
    it('should search applicants by keyword', async () => {
        const keyword = 'React';
        const res = await request(API_URL)
            .get(`/search/applicants?q=${keyword}`);

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('should return empty list for non-matching keyword', async () => {
        const keyword = 'XylophonePlayerXYZ';
        const res = await request(API_URL)
            .get(`/search/applicants?q=${keyword}`);

        expect(res.status).toBe(200);
        expect(res.body).toEqual([]);
    });
});
