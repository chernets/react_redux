export const GET_ALL_FILE_STORAGE_REQUEST = 'GET_ALL_FILE_STORAGE_REQUEST'
export const GET_ALL_FILE_STORAGE_SUCCESS = 'GET_ALL_FILE_STORAGE_SUCCESS'
export const GET_ALL_FILE_STORAGE_FAILURE = 'GET_ALL_FILE_STORAGE_FAILURE'

import { AdminService, kazFilter, filterItem, filterFieldType, filterCondition } from '../../api/'

export const getAll = () => {
  return async (dispatch, getState) => {

    dispatch({
      type: GET_ALL_FILE_STORAGE_REQUEST
    });
    const store = getState()
    let filter = kazFilter({
      countFilter: 999,
      position: 0,
      items: []
    })
    if(store.admin.filestorages.account === null || store.admin.filestorages.account.id === null){
      filter.items.push(filterItem({
        field: 'accountId',
        value: sstore.admin.filestorages.account.id,
        fType: filterFieldType.STRING,
        condition: filterCondition.EQUAL
      }))
    }else{
      filter.items.push(filterItem({
        field: 'accountId',
        value: store.auth.accounts.map(itm => { return itm.id }).join(';'),
        fType: filterFieldType.STRING,
        condition: filterCondition.IN
      }))
    }
    try {
      let request = await AdminService.getAllFileStorages(store.auth.token, filter)
      dispatch({
        type: GET_ALL_FILE_STORAGE_SUCCESS,
        payload: request
      });
    } catch (err) {
      dispatch({
        type: GET_ALL_FILE_STORAGE_FAILURE,
        payload: err
      })
    }
  }
}

export const CREATE_UPDATE_FILE_STORAGE_REQUEST = 'CREATE_UPDATE_FILE_STORAGE_REQUEST'
export const CREATE_UPDATE_FILE_STORAGE_SUCCESS = 'CREATE_UPDATE_FILE_STORAGE_SUCCESS'
export const CREATE_UPDATE_FILE_STORAGE_FAILURE = 'CREATE_UPDATE_FILE_STORAGE_FAILURE'

export const createUpdate = (obj, password, accId) => {
  return async (dispatch, getState) => {
    dispatch({
      type: CREATE_UPDATE_FILE_STORAGE_REQUEST
    });
    const store = getState()
    try {
      let request = await AdminService.createOrUpdateFileStorage(store.auth.token, obj, password, accId)
      dispatch({
        type: CREATE_UPDATE_FILE_STORAGE_SUCCESS
      });
      dispatch(getAll())
    } catch (err) {
      dispatch({
        type: CREATE_UPDATE_FILE_STORAGE_FAILURE,
        payload: err
      })
    }
  }
}

export const GET_FILE_STORAGE_REQUEST = 'GET_FILE_STORAGE_REQUEST'
export const GET_FILE_STORAGE_SUCCESS = 'GET_FILE_STORAGE_SUCCESS'
export const GET_FILE_STORAGE_FAILURE = 'GET_FILE_STORAGE_FAILURE'

export const byId = (fileStorage = new FileStorage({
  type: FileStorageType.PRIMARY,
  readOnly: true
})) => {
  return async (dispatch, getState) => {
    dispatch({
      type: GET_FILE_STORAGE_REQUEST
    });
    const store = getState()
    try {
      let request = fileStorage
      setTimeout(() => {
        dispatch({
          type: GET_FILE_STORAGE_SUCCESS,
          payload: request
        });
      }, 300)

    } catch (err) {
      dispatch({
        type: GET_FILE_STORAGE_FAILURE,
        payload: err
      })
    }
  }
}

export const DESTROY_FILE_STORAGE_REQUEST = 'DESTROY_FILE_STORAGE_REQUEST'
export const DESTROY_FILE_STORAGE_SUCCESS = 'DESTROY_FILE_STORAGE_SUCCESS'
export const DESTROY_FILE_STORAGE_FAILURE = 'DESTROY_FILE_STORAGE_FAILURE'

export const destroy = (ids, password) => {
  return async (dispatch, getState) => {
    dispatch({
      type: DESTROY_FILE_STORAGE_REQUEST
    });
    const store = getState()
    try {
      let request = await AdminService.removeFileStorages(store.auth.token, ids, password)
      dispatch({
        type: DESTROY_FILE_STORAGE_SUCCESS
      });
      dispatch(getAll())
    } catch (err) {
      dispatch({
        type: DESTROY_FILE_STORAGE_FAILURE,
        payload: err
      })
    }
  }
}

export const CLEAN_STORE_FILE_STORAGE = 'CLEAN_STORE_FILE_STORAGE'

export const clearStore = () => {
  return async dispatch => {
    dispatch({
      type: CLEAN_STORE_FILE_STORAGE
    });
  }
}