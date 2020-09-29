const express = require('express');
const router = express.Router();

const { getUser, addPark } = require('../controllers/user-controller');

router.route('/').get(getUser);
router.route('/add').post(addPark);

module.exports = router;
