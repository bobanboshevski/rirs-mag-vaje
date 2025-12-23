// main routes
const express = require('express');
const {getExample} = require('../controllers/exampleController.js');
const reservationRouter = require('./reservations.js');
const apartmentsRouter = require('./apartments.js');
const guestsRouter = require('./guests.js');

const router = express.Router();

router.get('/example', getExample);

router.use('/reservations', reservationRouter);

router.use('/apartments', apartmentsRouter);

router.use('/guests', guestsRouter);

module.exports = router;