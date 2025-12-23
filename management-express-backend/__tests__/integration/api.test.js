const request = require('supertest');
const app = require('../../app');
// unit tests
describe('API Integration Tests', () => {
    describe('GET /test', () => {
        it('should return test message', async () => {
            const response = await request(app).get('/test');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({message: 'Test route works!'});
        });
    });

    describe('GET /api/apartments', () => {
        it('should return all apartments', async () => {
            const response = await request(app).get('/api/apartments');

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBe(3);
        });

        it('should return apartments with correct structure', async () => {
            const response = await request(app).get('/api/apartments');

            const apartment = response.body[0];
            expect(apartment).toHaveProperty('id');
            expect(apartment).toHaveProperty('name');
            expect(apartment).toHaveProperty('building');
            expect(apartment).toHaveProperty('pricePerNight');
            expect(apartment).toHaveProperty('status');
            expect(apartment).toHaveProperty('amenities');
            expect(Array.isArray(apartment.amenities)).toBe(true);
        });
    });

    describe('GET /api/guests', () => {
        it('should return all guests', async () => {
            const response = await request(app).get('/api/guests');

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });
    });

    describe('GET /api/reservations/past', () => {
        it('should return past reservations', async () => {
            const response = await request(app).get('/api/reservations/past');

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });
    });

    describe('GET /api/reservations/future', () => {
        it('should return future reservations', async () => {
            const response = await request(app).get('/api/reservations/future');

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });
    });

    describe('Error Handling', () => {
        it('should return 404 for unknown routes', async () => {
            const response = await request(app).get('/api/unknown-route');

            expect(response.status).toBe(404);
        });
    });
});