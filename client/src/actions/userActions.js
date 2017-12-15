import axios from 'axios';

export function setLoginView() {
  return { type: 'SET_LOGIN_VIEW' };
}

export function setAnalyzeView() {
  return { type: 'SET_ANALYZE_VIEW' };
}

export function setUsername(username) {
  return { type: 'SET_USERNAME', payload: username };
}

export function setPassword(password) {
  return { type: 'SET_PASSWORD', payload: password };
}

export function getUser() {
  return (dispatch) => {
    axios.get('/api/getUser')
      .then((res) => {
        console.log(res);
        dispatch({ type: 'LOGIN_CHECK', payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export function loginUser(un, pw) {
  return () => {
    axios.post('/login', { username: un, password: pw })
      .then((response) => {
        console.log(response.body);
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function signupUser(un, pw) {
  return () => {
    axios.post('/signup', { username: un, password: pw })
      .then((response) => {
        console.log('-------------> userActions', response.body);
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
