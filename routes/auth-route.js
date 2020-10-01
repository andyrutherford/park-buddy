const express = require('express');
const router = express.Router();
const passport = require('passport');

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
    successRedirect: process.env.PRODUCTION_URL + '/login',
    failureRedirect: '/auth/login/failed',
  })
);

router
  .route('/google')
  .get(passport.authenticate('google', { scope: ['profile'] }));
router.route('/google/redirect').get(
  passport.authenticate('google', {
    successRedirect: process.env.PRODUCTION_URL + '/login',
    failureRedirect: '/auth/login/failed',
  })
);

router
  .route('/github')
  .get(passport.authenticate('github', { scope: ['user:email'] }));
router.route('/github/redirect').get(
  passport.authenticate('github', {
    successRedirect: process.env.PRODUCTION_URL + '/login',
    failureRedirect: '/auth/login/failed',
  })
);

router.route('/success').get(loginSuccess);
router.route('/fail').get(loginFail);
router.route('/logout').get(logout);

module.exports = router;
