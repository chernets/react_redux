import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Modals from '../../components/Modals';
import Main from '../Main'
import Users from '../Users'
import { Registries, FileStorages, PublicKeys, ExternalModules, Fields, Represenrations, Sessions, Accounts, SecurityClassification, Reports } from '../Admin'
import { ToastContainer } from 'react-toastify';

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
        <Route path="/admin/registries" render={props => (
          <Registries {...props} />
        )} />
        <Route path="/admin/filestorages" render={props => (
          <FileStorages {...props} />
        )} />
        <Route path="/admin/publickeys" render={props => (
          <PublicKeys {...props} />
        )} />
        <Route path="/admin/externalmodule" render={props => (
          <ExternalModules {...props} />
        )} />
        <Route path="/admin/fields" render={props => (
          <Fields {...props} />
        )} />
        <Route path="/admin/represenration" render={props => (
          <Represenrations {...props} />
        )} />
        <Route path="/admin/sessions" render={props => (
          <Sessions {...props} />
        )} />
        <Route path="/admin/accounts" render={props => (
          <Accounts {...props} />
        )} />
        <Route path="/admin/securityClassification" render={props => (
          <SecurityClassification {...props} />
        )} />
        <Route path="/admin/reports" render={props => (
          <SecurityClassification {...props} />
        )} />
        <Redirect to="/" />
      </Switch>,
      <Modals key='modals' />,
      <ToastContainer key='toast' />
    ]
  }
}

const mapStateToProps = (state) => {
  return {
    routing: state.routing
  };
};

export default connect(mapStateToProps)(Dashboard);
