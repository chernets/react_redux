

import { AggregationDataClient, UserManagementClient, AccountGroupClient, AccountClient, AdminService, kazFilter, filterItem, filterFieldType, filterCondition } from '../../api/'
import { fileStorageType } from '../../utils/translateEnum';

export const GET_ALL_ACCOUNTS_GROUP_REQUEST = 'GET_ALL_ACCOUNTS_GROUP_REQUEST'
export const GET_ALL_ACCOUNTS_GROUP_SUCCESS = 'GET_ALL_ACCOUNTS_GROUP_SUCCESS'
export const GET_ALL_ACCOUNTS_GROUP_FAILURE = 'GET_ALL_ACCOUNTS_GROUP_FAILURE'

export const getAllAccountGroups = () => {
  return async (dispatch, getState) => {

    dispatch({
      type: GET_ALL_ACCOUNTS_GROUP_REQUEST
    });
    const store = getState()
    try {
      let request = await AccountGroupClient.getAllAccountGroup(store.auth.token, kazFilter({
        countFilter: 999,
        position: 0,
        items: []
      }))
      dispatch({
        type: GET_ALL_ACCOUNTS_GROUP_SUCCESS,
        payload: request
      });
    } catch (err) {
      dispatch({
        type: GET_ALL_ACCOUNTS_GROUP_FAILURE,
        payload: err
      })
    }
  }
}

export const GET_ALL_ACCOUNTS_FS_REQUEST = 'GET_ALL_ACCOUNTS_FS_REQUEST'
export const GET_ALL_ACCOUNTS_FS_SUCCESS = 'GET_ALL_ACCOUNTS_FS_SUCCESS'
export const GET_ALL_ACCOUNTS_FS_FAILURE = 'GET_ALL_ACCOUNTS_FS_FAILURE'

export const getAllFileStorages = () => {
  return async (dispatch, getState) => {

    dispatch({
      type: GET_ALL_ACCOUNTS_FS_REQUEST
    });
    const store = getState()
    try {
      let request = await AdminService.getAllFileStorages(store.auth.token, kazFilter({
        countFilter: 999,
        position: 0,
        items: []
      }))
      dispatch({
        type: GET_ALL_ACCOUNTS_FS_SUCCESS,
        payload: request
      });
    } catch (err) {
      dispatch({
        type: GET_ALL_ACCOUNTS_FS_FAILURE,
        payload: err
      })
    }
  }
}

export const GET_ALL_ACCOUNTS_REQUEST = 'GET_ALL_ACCOUNTS_REQUEST'
export const GET_ALL_ACCOUNTS_SUCCESS = 'GET_ALL_ACCOUNTS_SUCCESS'
export const GET_ALL_ACCOUNTS_FAILURE = 'GET_ALL_ACCOUNTS_FAILURE'

export const getAll = (admin = false) => {
  return async (dispatch, getState) => {

    dispatch({
      type: GET_ALL_ACCOUNTS_REQUEST
    });
    const store = getState()
    const filter = kazFilter({
      countFilter: 999,
      position: 0,
      items: []
    })
    try {
      let request = admin ? await AccountClient.getAllAccounts(store.auth.token, filter) : await UserManagementClient.getAccounts(store.auth.token, filter)
      dispatch({
        type: GET_ALL_ACCOUNTS_SUCCESS,
        payload: request
      });
    } catch (err) {
      dispatch({
        type: GET_ALL_ACCOUNTS_FAILURE,
        payload: err
      })
    }
  }
}

export const CREATE_UPDATE_ACCOUNTS_REQUEST = 'CREATE_UPDATE_ACCOUNTS_REQUEST'
export const CREATE_UPDATE_ACCOUNTS_SUCCESS = 'CREATE_UPDATE_ACCOUNTS_SUCCESS'
export const CREATE_UPDATE_ACCOUNTS_FAILURE = 'CREATE_UPDATE_ACCOUNTS_FAILURE'

export const createUpdate = (obj, admin = false) => {
  return async (dispatch, getState) => {
    dispatch({
      type: CREATE_UPDATE_ACCOUNTS_REQUEST
    });
    const store = getState()
    try {
      let request = await AccountClient.createOrUpdateAccount(store.auth.token, obj)
      dispatch({
        type: CREATE_UPDATE_ACCOUNTS_SUCCESS
      });
      dispatch(getAll(admin))
    } catch (err) {
      dispatch({
        type: CREATE_UPDATE_ACCOUNTS_FAILURE,
        payload: err
      })
    }
  }
}

export const GET_ACCOUNTS_REQUEST = 'GET_ACCOUNTS_REQUEST'
export const GET_ACCOUNTS_SUCCESS = 'GET_ACCOUNTS_SUCCESS'
export const GET_ACCOUNTS_FAILURE = 'GET_ACCOUNTS_FAILURE'

export const byId = (id = null) => {
  return async (dispatch, getState) => {
    dispatch({
      type: GET_ACCOUNTS_REQUEST
    });
    const store = getState()
    try {
      let request = id !== null ? new Account(id) : new Account({
        confidential: false,
        storages : [
          new FileStorage({
            type: FileStorageType.PRIMARY,
            readOnly: true
          }),
          new FileStorage({
            type: FileStorageType.ARCHIVE,
            readOnly: true
          }),
        ]
      })
      setTimeout(() => {
        dispatch({
          type: GET_ACCOUNTS_SUCCESS,
          payload: request
        });
      }, id === null ? 0 : 300)

    } catch (err) {
      dispatch({
        type: GET_ACCOUNTS_FAILURE,
        payload: err
      })
    }
  }
}

export const CLEAN_STORE_ACCOUNTS = 'CLEAN_STORE_ACCOUNTS'

export const clearStore = () => {
  return async dispatch => {
    dispatch({
      type: CLEAN_STORE_ACCOUNTS
    });
  }
}