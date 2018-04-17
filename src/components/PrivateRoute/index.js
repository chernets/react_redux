import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, token, ...attributes }) => {
  const render = (props) => {
    if (token !== null) {
      return <Component {...props} />;
    } else {
      return (<Redirect to={{
        pathname: '/login',
      }} />);
    }
  };
  return <Route {...attributes} render={render} />;
};

const mapStateToProps = state => ({
    token: state.auth.token
});

export default connect(mapStateToProps)(PrivateRoute);