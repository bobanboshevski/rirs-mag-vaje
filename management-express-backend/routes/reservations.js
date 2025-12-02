const express = require('express');
const {getPastReservations, getFutureReservations} = require('../controllers/reservationsController.js');

const router = express.Router();

router.get('/past', getPastReservations);
router.get('/future', getFutureReservations);

module.exports = router;