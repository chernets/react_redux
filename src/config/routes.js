import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFoundPage from '../containers/NotFoundPage';

import PrivateRoute from '../components/PrivateRoute'
import SignIn from '../containers/SignIn/';
import Dashboard from '../containers/Dashboard'

export default (
  <Switch>
    <Route path="/login" component={SignIn} />
    <PrivateRoute path="/" component={Dashboard} />
    <Route component={NotFoundPage} />
  </Switch>
);
