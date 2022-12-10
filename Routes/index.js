const express = require('express');
// Get sub routers
const player = require('./player');
const team = require('./team');
const search = require('./search')

// Declare api final router
const router = express.Router();


// Set router
router.use('/player',player);
router.use('/team',team);
router.use('/search',search);


module.exports = router;