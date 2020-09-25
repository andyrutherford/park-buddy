const express = require('express');
const router = express.Router();
const passport = require('passport');

const {
  githubAuth,
  googleAuth,
  loginSuccess,
  loginFail,
  logout,
} = require('../controllers/auth-controller');

router.route('/github').post(githubAuth);
router
  .route('/google')
  .get(passport.authenticate('google', { scope: ['profile'] }));
router
  .route('/google/callback')
  .get(
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
      res.redirect('http://localhost:3000/explore');
    }
  );

router.route('/success').get(loginSuccess);
router.route('/fail/').get(loginFail);
router.route('/logout').get(logout);

module.exports = router;
