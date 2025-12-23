const {getApartments} = require('../../controllers/apartmentsController');

describe('Apartments Controller', () => {
    let req, res;

    beforeEach(() => {
        req = {};
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
    });

    describe('getApartments', () => {
        it('should return an array of apartments', () => {
            getApartments(req, res);

            expect(res.json).toHaveBeenCalledTimes(1);
            const apartments = res.json.mock.calls[0][0];
            expect(Array.isArray(apartments)).toBe(true);
            expect(apartments.length).toBe(3);
        });

        it('should return apartments with correct properties', () => {
            getApartments(req, res);

            const apartments = res.json.mock.calls[0][0];
            const apartment = apartments[0];

            expect(apartment).toHaveProperty('id');
            expect(apartment).toHaveProperty('name');
            expect(apartment).toHaveProperty('building');
            expect(apartment).toHaveProperty('floor');
            expect(apartment).toHaveProperty('number');
            expect(apartment).toHaveProperty('maxGuests');
            expect(apartment).toHaveProperty('bedrooms');
            expect(apartment).toHaveProperty('bathrooms');
            expect(apartment).toHaveProperty('pricePerNight');
            expect(apartment).toHaveProperty('status');
            expect(apartment).toHaveProperty('amenities');
            expect(apartment).toHaveProperty('description');
        });

        it('should return apartments with correct data types', () => {
            getApartments(req, res);

            const apartments = res.json.mock.calls[0][0];
            const apartment = apartments[0];

            expect(typeof apartment.id).toBe('string');
            expect(typeof apartment.name).toBe('string');
            expect(typeof apartment.pricePerNight).toBe('number');
            expect(Array.isArray(apartment.amenities)).toBe(true);
        });

        it('should return Lakeview Apartment as first item', () => {
            getApartments(req, res);

            const apartments = res.json.mock.calls[0][0];
            expect(apartments[0].name).toBe('Lakeview Apartment');
            expect(apartments[0].id).toBe('apt_001');
        });

        it('should return apartments with different statuses', () => {
            getApartments(req, res);

            const apartments = res.json.mock.calls[0][0];
            const statuses = apartments.map(apt => apt.status);

            expect(statuses).toContain('available');
            expect(statuses).toContain('occupied');
            expect(statuses).toContain('maintenance');
        });

        it('should return apartments with valid amenities', () => {
            getApartments(req, res);

            const apartments = res.json.mock.calls[0][0];

            apartments.forEach(apartment => {
                expect(apartment.amenities.length).toBeGreaterThan(0);
                apartment.amenities.forEach(amenity => {
                    expect(typeof amenity).toBe('string');
                });
            });
        });

        it('should return apartments with positive prices', () => {
            getApartments(req, res);

            const apartments = res.json.mock.calls[0][0];

            apartments.forEach(apartment => {
                expect(apartment.pricePerNight).toBeGreaterThan(0);
            });
        });
    });
});