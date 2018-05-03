export const GET_ALL_PUBLIC_KEYS_REQUEST = 'GET_ALL_PUBLIC_KEYS_REQUEST'
export const GET_ALL_PUBLIC_KEYS_SUCCESS = 'GET_ALL_PUBLIC_KEYS_SUCCESS'
export const GET_ALL_PUBLIC_KEYS_FAILURE = 'GET_ALL_PUBLIC_KEYS_FAILURE'

import { UserManagementClient, AdminService, kazFilter, filterItem, filterFieldType, filterCondition } from '../../api/'

export const getAll = () => {
  return async (dispatch, getState) => {

    dispatch({
      type: GET_ALL_PUBLIC_KEYS_REQUEST
    });
    const store = getState()
    let filter = kazFilter({
      countFilter: 999,
      position: 0,
      items: []
    })
    if (store.admin.publickeys.keyStateFilter !== null && store.admin.publickeys.keyStateFilter.id !== null) {
      filter.items.push(filterItem({
        field: 'keyState',
        value: store.admin.publickeys.keyStateFilter.id,
        fType: filterFieldType.ENUMERATED,
        condition: filterCondition.EQUAL
      }))
    }
    try {
      let request = await UserManagementClient.getAllUserPublicKeyInfo(store.auth.token, filter)
      dispatch({
        type: GET_ALL_PUBLIC_KEYS_SUCCESS,
        payload: request
      });
    } catch (err) {
      dispatch({
        type: GET_ALL_PUBLIC_KEYS_FAILURE,
        payload: err
      })
    }
  }
}
export const SELECTED_FILTER_PUBLIC_KEYS = 'SELECTED_FILTER_PUBLIC_KEYS'

export const selectedFilter = (data) => {
  return async dispatch => {
    dispatch({
      type: SELECTED_FILTER_PUBLIC_KEYS,
      payload: data
    });
    dispatch(getAll())
  }
}

export const CONFIRM_USER_PUBLIC_KEYS_REQUEST = 'CONFIRM_USER_PUBLIC_KEYS_REQUEST'
export const CONFIRM_USER_PUBLIC_KEYS_SUCCESS = 'CONFIRM_USER_PUBLIC_KEYS_SUCCESS'
export const CONFIRM_USER_PUBLIC_KEYS_FAILURE = 'CONFIRM_USER_PUBLIC_KEYS_FAILURE'
export const confirmUserPublicKey = (id, confirm) => {
  return async (dispatch, getState) => {
    dispatch({
      type: CONFIRM_USER_PUBLIC_KEYS_REQUEST
    });
    const store = getState()
    try {
      let request = await AdminService.confirmUserPublicKey(store.auth.token, id, confirm)
      dispatch({
        type: CONFIRM_USER_PUBLIC_KEYS_SUCCESS
      });
      dispatch(getAll())
    } catch (err) {
      dispatch({
        type: CONFIRM_USER_PUBLIC_KEYS_FAILURE,
        payload: err
      })
    }
  }
}

export const CLEAN_STORE_PUBLIC_KEYS = 'CLEAN_STORE_PUBLIC_KEYS'

export const clearStore = () => {
  return async dispatch => {
    dispatch({
      type: CLEAN_STORE_PUBLIC_KEYS
    });
  }
}