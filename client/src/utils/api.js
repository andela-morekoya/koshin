import 'isomorphic-fetch';
import apiPaths from './apiPaths';

export function callEndpoint(endpoint) {
  const url = apiPaths.API_URL + endpoint;
  return fetch(url, {
    credentials: 'include'
  })
    .then((res) => {
      if (res.status >= 400) {
        throw new Error("Bad response from server");
      }
      return res.json();
    });
}

export function githubFetch(endpoint, token) {
  let url = apiPaths.GITHUB_REPO + endpoint;
  if (token) {
    if (url.endsWith('?')) {
      url += 'access_token=' + token;
    } else {
      url += '&access_token=' + token;
    }
  }
  return fetch(url)
    .then((res) => {
      if (res.status >= 400) {
        throw new Error("Bad response from server");
      }
      return res.json();
    });
}

export function postEndpoint(endpoint, data) {
  const url = apiPaths.API_URL + endpoint;
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  }).then((res) => {
    if (res.status >= 400) {
      throw new Error("Bad response from server");
    }
    return res.json();
  });
}

export function updateEndPoint(endpoint, data) {
  const url = apiPaths.API_URL + endpoint;
  return fetch(url, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  }).then((res) => {
    if (res.status >= 400) {
      throw new Error("Bad response from server");
    }
    return res.json();
  });
}

export function deleteEndPoint(endpoint, data) {
  const url = apiPaths.API_URL + endpoint;
  return fetch(url, {
    method: 'DELETE',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  }).then((res) => {
    if (res.status >= 400) {
      throw new Error("Bad response from server");
    }
    return res.json();
  });
}