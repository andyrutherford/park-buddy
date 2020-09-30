const express = require('express');
const router = express.Router();
const passport = require('passport');

const CLIENT_URL = 'http://localhost:3000';

const {
  loginSuccess,
  loginFail,
  logout,
} = require('../controllers/auth-controller');

router.route('/facebook').get(
  passport.authenticate('facebook', {
    scope: ['public_profile', 'email'],
  })
);
router.route('/facebook/redirect').get(
  passport.authenticate('facebook', {
    successRedirect: CLIENT_URL + '/login',
    failureRedirect: '/auth/login/failed',
  })
);

router
  .route('/google')
  .get(passport.authenticate('google', { scope: ['profile'] }));
router.route('/google/redirect').get(
  passport.authenticate('google', {
    successRedirect: CLIENT_URL + '/login',
    failureRedirect: '/auth/login/failed',
  })
);

router
  .route('/github')
  .get(passport.authenticate('github', { scope: ['user:email'] }));
router.route('/github/redirect').get(
  passport.authenticate('github', {
    successRedirect: CLIENT_URL + '/login',
    failureRedirect: '/auth/login/failed',
  })
);

router.route('/success').get(loginSuccess);
router.route('/fail').get(loginFail);
router.route('/logout').get(logout);

module.exports = router;
