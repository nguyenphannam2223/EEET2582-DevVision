const request = require('supertest');
const { API_URL } = require('./setup');

describe('Search Service E2E', () => {
    // Assuming database is seeded with mock data ("John Doe", "React")

    it('should search applicants by keyword', async () => {
        const keyword = 'React';
        const res = await request(API_URL)
            .get(`/search/applicants?q=${keyword}`);

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        // We expect at least one result since we seeded data
        if (res.body.length > 0) {
             const applicant = res.body[0];
             // Verify keyword match in relevant fields
             const match = applicant.skills.includes(keyword) || 
                           applicant.headline.includes(keyword) ||
                           applicant.name.includes(keyword);
             expect(match).toBe(true);
        }
    });

    it('should return empty list for non-matching keyword', async () => {
        const keyword = 'XylophonePlayerXYZ';
        const res = await request(API_URL)
            .get(`/search/applicants?q=${keyword}`);

        expect(res.status).toBe(200);
        expect(res.body).toEqual([]);
    });
});
