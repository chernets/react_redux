import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as modal } from 'redux-modal'
import * as asyncInitialState from 'redux-async-initial-state';

import { i18nState } from "redux-i18n"
import sConfig from './sConfig'
import auth from './auth'
import users from './users'

import * as modals from './Modals'
import * as admin from './Admin'

import createUpdateUser from './Modals/createUpdateUser'
import changeRoles from './Modals/changeRoles'
import changeSecurityClassifications from './Modals/changeSecurityClassifications'
import changeUserOrGroups from './Modals/changeUserOrGroups'
import changeDepartment from './Modals/changeDepartment'

const rootReducer = asyncInitialState.outerReducer(combineReducers({
  routing,
  i18nState,
  asyncInitialState: asyncInitialState.innerReducer,
  serverConfig: sConfig,
  auth,
  users,
  modal,
  modalCreateUpdateUser: createUpdateUser,
  modalChangeRoles: changeRoles,
  modalChangeSecurityClassifications: changeSecurityClassifications,
  modalChangeUserOrGroups: changeUserOrGroups,
  modalChangeDepartments: changeDepartment,
  admin: combineReducers({ ...admin }),
  modals: combineReducers({...modals})
}));

export default rootReducer;
