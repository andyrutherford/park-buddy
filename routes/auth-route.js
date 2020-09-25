const express = require('express');
const router = express.Router();
const passport = require('passport');

const { githubAuth, googleAuth } = require('../controllers/auth-controller');

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

module.exports = router;
