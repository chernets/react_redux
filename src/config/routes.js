import React from 'react';
import { Route, Switch } from 'react-router-dom';s

import PrivateRoute from '../components/PrivateRoute'
import SignIn from '../containers/SignIn/';
import Dashboard from '../containers/Dashboard'

export default (
  <Switch>
    <Route path="/login" component={SignIn} />
    <PrivateRoute path="/" component={Dashboard} />
  </Switch>
);
