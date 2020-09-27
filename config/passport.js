const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
const axios = require('axios');
const User = require('../models/User');

module.exports = function (passport) {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: '/auth/facebook/redirect',
        profileFields: [
          'id',
          'displayName',
          'picture.type(large)',
          'email',
          'birthday',
          'friends',
          'first_name',
          'last_name',
          'middle_name',
          'gender',
          'link',
        ],
      },
      async (accessToken, refreshToken, profile, done) => {
        // const picture = `https://graph.facebook.com/me/picture?access_token=${accessToken}&&redirect=false`;
        let picture;
        axios
          .get(
            `https://graph.facebook.com/me/picture?access_token=${accessToken}&&redirect=false`
          )
          .then((res) => (picture = res.url))
          .catch((err) => console.log(err.message));

        console.log(profile);
        // console.log(picture);
        const newUser = {
          facebookId: profile.id,
          name: profile.displayName,
          image: profile.photos[0].value,
        };

        try {
          let user = await User.findOne({ facebookId: profile.id });

          if (user) {
            done(null, user);
          } else {
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (error) {
          console.error(error);
        }
      }
    )
  );

  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: '/auth/github/redirect',
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        const newUser = {
          githubId: profile.id,
          name: profile.displayName,
          image: profile.photos[0].value,
        };

        try {
          let user = await User.findOne({ githubId: profile.id });

          if (user) {
            done(null, user);
          } else {
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (error) {
          console.error(error);
        }
      }
    )
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/redirect',
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        const newUser = {
          googleId: profile.id,
          name: profile.displayName,
          image: profile.photos[0].value,
        };

        try {
          let user = await User.findOne({ googleId: profile.id });

          if (user) {
            done(null, user);
          } else {
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (error) {
          console.error(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    // User.findById(id, (err, user) => done(err, user));

    var userId = mongoose.Types.ObjectId(id);
    console.log(userId);
    User.findById(userId, function (err, user) {
      done(err, user);
    });
  });
};
