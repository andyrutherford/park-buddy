export const logout = () => async (dispatch) => {
  console.log('logout');
  window.open('http://localhost:5000/auth/logout', '_self');
  alert('You have logged out.');
};

export const getAuth = () => async (dispatch) => {
  fetch('http://localhost:5000/auth/success', {
    method: 'GET',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true,
    },
  })
    .then((response) => {
      if (response.status === 200) return response.json();
      throw new Error('failed to authenticate user');
    })
    .then((responseJson) => {
      dispatch({ type: 'AUTH_SUCCESS', payload: responseJson.user });
    })
    .catch((error) => {
      dispatch({ type: 'AUTH_FAIL', payload: 'User authentication failed' });
    });
};

export const githubAuth = (code) => async (dispatch) => {
  dispatch({ type: 'GITHUB_AUTH_START' });
  const data = { code, state: sessionStorage.getItem('authState') };
  try {
    const res = await fetch('http://localhost:5000/auth/github', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const auth = await res.json();
    console.log(auth);
    dispatch({ type: 'GITHUB_AUTH_SUCCESS' });
    return auth;
  } catch (error) {
    console.log(error);
  }
  console.log(code);
};

export const googleAuth = (code) => async (dispatch) => {
  dispatch({ type: 'GITHUB_AUTH_START' });
  const data = { code, state: sessionStorage.getItem('authState') };
  try {
    const res = await fetch('http://localhost:5000/auth/github', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const auth = await res.json();
    console.log(auth);
    dispatch({ type: 'GITHUB_AUTH_SUCCESS' });
    return auth;
  } catch (error) {
    console.log(error);
  }
  console.log(code);
};
