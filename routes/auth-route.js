const express = require('express');
const router = express.Router();

const { githubAuth } = require('../controllers/auth-controller');

router.route('/github').post(githubAuth);

module.exports = router;
