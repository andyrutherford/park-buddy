export const githubAuth = (code) => async (dispatch) => {
  dispatch({ type: 'GITHUB_AUTH_START' });
  const data = { code, state: sessionStorage.getItem('authState') };
  try {
    const res = await fetch('http://localhost:5000/api/auth/github', {
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
