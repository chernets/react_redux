import * as actions from '../actions'
export default (state = {
  token: localStorage.getItem('token') || null,
  isFetching: false,
  error: null
}, action) => {
  switch (action.type) {
    case actions.auth.LOGIN_REQUEST:
    return {
      ...state,
      isFetching: true
    }
    case actions.auth.LOGIN_SUCCESS:
      return {
        ...action.payload.authenticate,
        token: action.payload.authenticate.id,
        accounts: action.payload.accounts,
        accountsNotSecurity: action.payload.accountsNotSecurity,
        error: null,
        isFetching: false
      }
    case actions.auth.LOGIN_FAILURE:
      return {
        token: null,
        error: action.payload,
        isFetching: false
      }
    default:
      return state;
  }
}

