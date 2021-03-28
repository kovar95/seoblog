import fetch from 'isomorphic-fetch';
import { API } from '../config';
import queryString from 'query-string'
import {isAuth, handleResponse} from './auth'

export const createBlog = (blog, token) => {
  let createBlogEndpoin;
  if (isAuth()) {
    if (isAuth().role === 1) {
      createBlogEndpoin = `${API}/blog`
    } else if (isAuth().role === 0) {
      createBlogEndpoin = `${API}/user/blog`
    }
  }

  return fetch(`${createBlogEndpoin}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: blog,
  })
    .then((response) => {
      handleResponse(response)
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const listBlogsWithCategoriesAndTags = (skip, limit) => {
  const data = {
    limit,
    skip,
  };

  return fetch(`${API}/blogs-categories-tags`, {
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

export const singleBlog = (slug) => {
  return fetch(`${API}/blog/${slug}`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};


export const listRelated = (blog) => {

  return fetch(`${API}/blogs/related`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(blog),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const list = (username) => {

  let listBlogsEndpoin;

    if (username) {
      listBlogsEndpoin = `${API}/${username}/blogs`
    } else {
      listBlogsEndpoin = `${API}/blogs`
    }

  
  return fetch(`${listBlogsEndpoin}`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};


export const removeBlog = (slug, token) => {

  let deleteBlogEndpoin;
  if (isAuth()) {
    if (isAuth().role === 1) {
     deleteBlogEndpoin = `${API}/blog/${slug}`
    } else if (isAuth().role === 0) {
     deleteBlogEndpoin = `${API}/user/blog/${slug}`
    }
  }


  return fetch(`${deleteBlogEndpoin}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type':'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      handleResponse(response)
      return response.json();
    })
    .catch((err) => console.log(err));
};


export const updateBlog = (blog, token, slug) => {

  let updateBlogEndpoin;
  if (isAuth()) {
    if (isAuth().role === 1) {
    updateBlogEndpoin = `${API}/blog/${slug}`
    } else if (isAuth().role === 0) {
    updateBlogEndpoin = `${API}/user/blog/${slug}`
    }
  }

  return fetch(`${updateBlogEndpoin}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: blog,
  })
    .then((response) => {
      handleResponse(response)
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const listSearch = (params) => {
  console.log('search params', params)
  let query = queryString.stringify(params)
  console.log('query params', query)

  return fetch(`${API}/blogs/search?${query}`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};