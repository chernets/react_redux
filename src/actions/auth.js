export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

import { ACCOUNTS_COUNT_FILTER } from '../constant/variables'
import { AuthService, UserManagementClient, 
  kazFilter, filterItem, filterFieldType, filterCondition } from '../api/'

export const loginRequest = (login, password) => {
  return async dispatch => {

    dispatch({
      type: LOGIN_REQUEST
    });

    try {
      let authenticate = await AuthService.authenticate(login, password)
      let filter = kazFilter({
        countFilter: ACCOUNTS_COUNT_FILTER,
        position: 0,
        items: []
      });
      let accounts = await UserManagementClient.getAccounts(authenticate.id, filter)
      filter.items.push({
        field: 'NOT_SECURITY',
        value: 'NOT_SECURITY',
        fType: filterFieldType.STRING,
        condition: filterCondition.EQUAL
      })
      let accountsNotSecurity = await UserManagementClient.getAccounts(authenticate.id, filter)
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          authenticate,
          accounts,
          accountsNotSecurity
        }
      });
      localStorage.setItem('token', authenticate.id)
    } catch (err) {
      dispatch({
        type: LOGIN_FAILURE,
        payload: err
      })
      localStorage.removeItem('token')
    }
  }
}
