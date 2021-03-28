import fetch from 'isomorphic-fetch';
import cookie from 'js-cookie';
import { API } from '../config';
import Router from 'next/router';

export const handleResponse = (response) => {
  if (response.status === 401) {
    signout(() => {
      Router.push({
        pathname: '/signin',
        query: {
          message: 'Your session is expired. Please signin',
        },
      });
    });
  } else {
    return
  }
};

export const preSignup = (user) => {
  return fetch(`${API}/pre-signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};


export const signup = (user) => {
  return fetch(`${API}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const signin = (user) => {
  return fetch(`${API}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const signout = (next) => {
  removeCookie('token');
  removeFromLocalStorage('user');
  next();

  return fetch(`${API}/singout`, {
    method: 'GET',
  })
    .then((response) => {
      console.log('Signout successful');
    })
    .catch((err) => console.log(err));
};

//set, get and remove cookie
export const setCookie = (key, value) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 1,
    });
  }
};

export const removeCookie = (key) => {
  if (process.browser) {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

export const getCookie = (key) => {
  if (process.browser) {
    return cookie.get(key);
  }
};

//set data to local storage and remove data from it
export const setAtLocalStorage = (key, value) => {
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeFromLocalStorage = (key) => {
  if (process.browser) {
    localStorage.removeItem(key);
  }
};

export const getFromLocalStorage = (key) => {
  if (process.browser) {
    return localStorage.getItem(key);
  }
};

//authenticate user by passing data to localstorage and cookies
export const authenticate = (data, next) => {
  setCookie('token', data.token);
  setAtLocalStorage('user', data.user);
  next();
};

export const isAuth = () => {
  if (process.browser) {
    let cookieChecked = getCookie('token');
    if (cookieChecked) {
      if (getFromLocalStorage('user')) {
        return JSON.parse(getFromLocalStorage('user'));
      } else {
        return false;
      }
    }
  }
};

export const updateUser = (user, next) => {
  if (getFromLocalStorage('user')) {
    let auth = JSON.parse(getFromLocalStorage('user'));
    auth = user;
    setAtLocalStorage('user', auth);
    next();
  }
};

// forgot pass

export const forgotPassword = (email) => {
  return fetch(`${API}/forgot-password`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email}),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const resetPassword = (resetInfo) => {
  return fetch(`${API}/reset-password`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(resetInfo),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};


export const loginWithGoogle = (user) => {
  return fetch(`${API}/google-login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};















