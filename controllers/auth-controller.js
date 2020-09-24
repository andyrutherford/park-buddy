const fetch = require('node-fetch');
const axios = require('axios');

const User = require('../models/User');

// @desc    Auth with github
// @route   POST /api/auth/github
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

    console.log(accessToken);
    res.send(accessToken);
  } catch (error) {
    console.log(error.message);
  }
};
