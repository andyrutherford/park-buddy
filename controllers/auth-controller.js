const fetch = require('node-fetch');
const axios = require('axios');

const User = require('../models/User');

// @desc    Auth with github
// @route   POST /auth/github
// @access  PUBLIC
exports.githubAuth = async (req, res, next) => {
  const { code, state } = req.body;
  if (!state || !code) {
    return res.status(401).send('Code and state are required.');
  }

  try {
    const body = {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
      state,
    };
    console.log(body);
    const github = await axios.post(
      'https://github.com/login/oauth/access_token',
      body
    );

    const accessToken = github.data.split('=')[1].split('&')[0];

    // Get users github profile
    const githubUser = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `token ${accessToken}` },
    });

    // Get users github email
    const githubEmails = await axios.get('https://api.github.com/user/emails', {
      headers: { Authorization: `token ${accessToken}` },
    });
    const primaryEmail = githubEmails.data.filter(
      (email) => email.primary === true
    )[0].email;
    console.log(githubUser, primaryEmail);
  } catch (error) {
    console.log(error.message);
  }
};

// @desc    Auth with google
// @route   GET /auth/google
// @access  PUBLIC
exports.googleAuth = async (req, res, next) => {};
