import React from 'react';
import { render } from 'react-dom';
import { Route, Router, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import './styles/styles.css'; //Webpack can import CSS files too!
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import Base from './components/Base';
import Main from './Main';
import store from './store/configureStore';
import { fetchUser } from './actions/userActions';

function isLoggedIn() {
  store.dispatch(fetchUser());
}

const routes = (
  <Provider store={store} >
    <Router history={browserHistory}>
      <Route path="/" component={Base} onEnter={isLoggedIn()}>
        <IndexRoute component={Main} />
      </Route>
    </Router>
  </Provider>
);

render(routes, document.getElementById('output'));