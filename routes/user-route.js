const express = require('express');
const router = express.Router();

const protect = require('../middleware/authMiddleware');
const {
  getUser,
  getUserParks,
  addPark,
} = require('../controllers/user-controller');

router.route('/:userID/parks').get(protect, getUserParks);
router.route('/:userID').get(getUser);
router.route('/park/add').post(protect, addPark);

module.exports = router;
