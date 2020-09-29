const express = require('express');
const router = express.Router();

const { getUser, addPark } = require('../controllers/user-controller');

router.route('/:userID').get(getUser);
router.route('/park/add').post(addPark);

module.exports = router;
