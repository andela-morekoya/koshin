import React from 'react';
import { render } from 'react-dom';
import { Route, Router, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import 'jquery';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './styles/styles.css'; //Webpack can import CSS files too!
import Base from './components/Base';
import Main from './Main';
import Settings from './components/Settings';
import store from './store/configureStore';
import { fetchUser } from './actions/userActions';

function redirectToHome() {
  window.location.href = '/';
}

function isLoggedIn(nextState, replace, cb) {
  store.dispatch(fetchUser())
    .then((user) => {
      const data = user.data ? user.data.github : null;
      const location = window.location.pathname;
      if (location !== '/' && !data) {
        redirectToHome();
        return cb();
      }
      return cb();
    })
    .catch((err) => {
      redirectToHome();
      return cb();
    });
}

const routes = (
  <Provider store={store} >
    <Router history={browserHistory}>
      <Route path="/" component={Base} onEnter={isLoggedIn}>
        <IndexRoute component={Main} />
        <Route path="/settings" component={Settings} />
        <Route path="*" onEnter={redirectToHome} />
      </Route>
    </Router>
  </Provider>
);

render(routes, document.getElementById('output'));