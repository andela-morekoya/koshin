import 'isomorphic-fetch';
import apiPaths from './apiPaths';

export function callEndpoint(endpoint) {
  const url = apiPaths.API_URL + endpoint;
  return fetch(url, {
    credentials: 'include'
  })
    .then((res) => res.json())
    .catch((err) => err.json());
}

export function githubFetch(endpoint) {
  const url = apiPaths.GITHUB_REPO + endpoint;
  return fetch(url)
    .then((res) => res.json())
    .catch((err) => err.json());
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
  }).then((response) => response.json());
}