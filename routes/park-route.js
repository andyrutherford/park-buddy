const express = require('express');
const router = express.Router();

const { addPark } = require('../controllers/park-controller');

router.route('/add').post(addPark);

module.exports = router;
