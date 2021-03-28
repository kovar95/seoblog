import fetch from 'isomorphic-fetch';
import { API } from '../config';

export const emailContactForm = (data) => {
  let emailEndpoin;
  if (data.authorEmail) {
    emailEndpoin = `${API}/contact-blog-author`;
  } else {
    emailEndpoin = `${API}/contact`;
  }

  return fetch(`${emailEndpoin}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
