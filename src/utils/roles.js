

import store from '../store/configureStore'

const hasRole = (roleName) => {
  const state = store.getState();
  return state.auth.roles.indexOf(roleName) !== -1
}

export {
  hasRole
}