import React from 'react';
import {Route} from 'react-router';
import Base from './components/Base';
import Login from './components/login/Login';

function redirect(path){
  window.location.href = path || '/';
}

export default (
  <Route component={Base} >
    <Route path="/" component={Login} />
  </Route>
);