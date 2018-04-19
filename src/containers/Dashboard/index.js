import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Modals from '../../components/Modals';
import Main from '../Main'
import Users from '../Users'



class Dashboard extends Component {

  render() {
    return [
      <Navbar key='navbar' />,
      <Switch key='switch'>
        <Route path="/" exact component={Main} />
        <Route path="/users" render={props => (
          <Users {...props} admin={false} />
        )} />
        <Route path="/admin/users" render={props => (
          <Users {...props} admin={true} />
        )} />
      </Switch>,
      <Modals key='modals' />
    ]
  }
}

const mapStateToProps = (state) => {
  return {
    routing: state.routing
  };
};

export default connect(mapStateToProps)(Dashboard);
