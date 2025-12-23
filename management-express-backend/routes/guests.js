const express = require('express');
const {getGuests} = require('../controllers/guestsController.js');

const router = express.Router();

router.get('/', getGuests);

module.exports = router;