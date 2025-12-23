const request = require('supertest');
const express = require('express');
const apartmentsRouter = require('../../routes/apartments');
// integration tests, api/route tests
const app = express();
app.use('/apartments', apartmentsRouter);

describe('Apartments Routes', () => {
    describe('GET /apartments', () => {
        it('should respond with status 200', async () => {
            const response = await request(app).get('/apartments');
            expect(response.status).toBe(200);
        });

        it('should return JSON content type', async () => {
            const response = await request(app).get('/apartments');
            expect(response.type).toBe('application/json');
        });

        it('should return an array', async () => {
            const response = await request(app).get('/apartments');
            expect(Array.isArray(response.body)).toBe(true);
        });

        it('should return 3 apartments', async () => {
            const response = await request(app).get('/apartments');
            expect(response.body.length).toBe(3);
        });
    });
});