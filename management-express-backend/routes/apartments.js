const express = require('express');
const {getApartments} = require('../controllers/apartmentsController.js');

const router = express.Router();

router.get('/', getApartments);

module.exports = router;