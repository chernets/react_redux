import _ from 'lodash'


import {
  UserManagementClient, 
  kazFilter, filterItem, filterFieldType, filterCondition
} from '../../api'

export const GET_ALL_ROLES_REQUEST = 'GET_ALL_ROLES_REQUEST'
export const GET_ALL_ROLES_SUCCESS = 'GET_ALL_ROLES_SUCCESS'
export const GET_ALL_ROLES_FAILURE = 'GET_ALL_ROLES_FAILURE'

export const getAllRoles = () => {
  return async (dispatch, getState) => {
    const store = getState()
    dispatch({
      type: GET_ALL_ROLES_REQUEST
    });
    let filter = kazFilter({
      countFilter: 127,
      position: 0,
      items: []
    })
    try {
      let allRoles = await UserManagementClient.getAllExistingRoles(store.auth.token, filter)
      dispatch({
        type: GET_ALL_ROLES_SUCCESS,
        payload: allRoles
      });
    } catch (err) {
      dispatch({
        type: GET_ALL_ROLES_FAILURE,
        payload: err
      })
    }
  }
}