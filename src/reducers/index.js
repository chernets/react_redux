import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as modal } from 'redux-modal'
import * as asyncInitialState from 'redux-async-initial-state';

import { i18nState } from "redux-i18n"
import sConfig from './sConfig'
import auth from './auth'
import users from './users'

import * as modals from './Modals'

const rootReducer = asyncInitialState.outerReducer(combineReducers({
  routing,
  i18nState,
  asyncInitialState: asyncInitialState.innerReducer,
  serverConfig: sConfig,
  auth,
  users,
  modal,
  modalCreateUpdateUser: modals.createUpdateUser,
  modalChangeRoles: modals.changeRoles,
  modalChangeSecurityClassifications: modals.changeSecurityClassifications
}));

export default rootReducer;
