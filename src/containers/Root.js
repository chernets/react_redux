import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import App from './App';
import routes from '../config/routes.js';
import moment from 'moment'
moment.locale('ru');

import I18n from "redux-i18n"

export default class Root extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  render() {
    const { store, history } = this.props;
    const isDevEnv = process.env.NODE_ENV === 'development';

    return (
      <Provider store={store}>
        <I18n translations={{}} forceRefresh={true} useReducer={true}>
          <ConnectedRouter history={history}>
            <App>{routes}</App>
          </ConnectedRouter>
        </I18n>
      </Provider>
    );
  }
}
