export const isUserLoggedIn = () => fetch('/loggedin', { credentials: 'include' })
  .then(res => res.json()).
  then(user => {
    return user;
  })
  .catch((err) => {
    return Promise.reject(err);
  });