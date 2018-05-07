export const GET_ALL_EXTERNAL_MODULES_REQUEST = 'GET_ALL_EXTERNAL_MODULES_REQUEST'
export const GET_ALL_EXTERNAL_MODULES_SUCCESS = 'GET_ALL_EXTERNAL_MODULES_SUCCESS'
export const GET_ALL_EXTERNAL_MODULES_FAILURE = 'GET_ALL_EXTERNAL_MODULES_FAILURE'

import { AdminService, kazFilter, filterItem, filterFieldType, filterCondition } from '../../api/'

export const getAll = () => {
  return async (dispatch, getState) => {

    dispatch({
      type: GET_ALL_EXTERNAL_MODULES_REQUEST
    });
    const store = getState()
    try {
      let request = await AdminService.getAllExternalModules(store.auth.token, null)
      dispatch({
        type: GET_ALL_EXTERNAL_MODULES_SUCCESS,
        payload: request
      });
    } catch (err) {
      dispatch({
        type: GET_ALL_EXTERNAL_MODULES_FAILURE,
        payload: err
      })
    }
  }
}

export const CREATE_UPDATE_EXTERNAL_MODULES_REQUEST = 'CREATE_UPDATE_EXTERNAL_MODULES_REQUEST'
export const CREATE_UPDATE_EXTERNAL_MODULES_SUCCESS = 'CREATE_UPDATE_EXTERNAL_MODULES_SUCCESS'
export const CREATE_UPDATE_EXTERNAL_MODULES_FAILURE = 'CREATE_UPDATE_EXTERNAL_MODULES_FAILURE'

export const create = (url, user, userName, password) => {
  return async (dispatch, getState) => {
    dispatch({
      type: CREATE_EXTERNAL_MODULES_REQUEST
    });
    const store = getState()
    try {
      let request = await AdminService.registerExternalModule(store.auth.token, url, user, userName, password)
      dispatch({
        type: CREATE_EXTERNAL_MODULES_SUCCESS
      });
      dispatch(getAll())
    } catch (err) {
      dispatch({
        type: CREATE_EXTERNAL_MODULES_FAILURE,
        payload: err
      })
    }
  }
}

export const update = (id) => {
  return async (dispatch, getState) => {
    dispatch({
      type: UPDATE_EXTERNAL_MODULES_REQUEST
    });
    const store = getState()
    try {
      let request = await AdminService.refreshExternalModule(store.auth.token, id)
      dispatch({
        type: UPDATE_EXTERNAL_MODULES_SUCCESS
      });
      dispatch(getAll())
    } catch (err) {
      dispatch({
        type: UPDATE_EXTERNAL_MODULES_FAILURE,
        payload: err
      })
    }
  }
}

export const GET_EXTERNAL_MODULES_REQUEST = 'GET_EXTERNAL_MODULES_REQUEST'
export const GET_EXTERNAL_MODULES_SUCCESS = 'GET_EXTERNAL_MODULES_SUCCESS'
export const GET_EXTERNAL_MODULES_FAILURE = 'GET_EXTERNAL_MODULES_FAILURE'

export const byId = (obj = null) => {
  return async (dispatch, getState) => {
    dispatch({
      type: GET_EXTERNAL_MODULES_REQUEST
    });
    const store = getState()
    try {
      let request = new ExternalModule(obj === null ? { user : new UserOrGroup({
        type: UserOrGroupType.USER,
        userFirstName: ' '
      })} : obj)
      setTimeout(()=>{
        dispatch({
          type: GET_EXTERNAL_MODULES_SUCCESS,
          payload: request
        });
      }, obj === null ? 0 : 300)

    } catch (err) {
      dispatch({
        type: GET_EXTERNAL_MODULES_FAILURE,
        payload: err
      })
    }
  }
}

export const DESTROY_EXTERNAL_MODULES_REQUEST = 'DESTROY_EXTERNAL_MODULES_REQUEST'
export const DESTROY_EXTERNAL_MODULES_SUCCESS = 'DESTROY_EXTERNAL_MODULES_SUCCESS'
export const DESTROY_EXTERNAL_MODULES_FAILURE = 'DESTROY_EXTERNAL_MODULES_FAILURE'

export const destroy = (id, password) => {
  return async (dispatch, getState) => {
    dispatch({
      type: DESTROY_EXTERNAL_MODULES_REQUEST
    });
    const store = getState()
    try {
      let request = await AdminService.removeExternalModule(store.auth.token, id, password)
      dispatch({
        type: DESTROY_EXTERNAL_MODULES_SUCCESS
      });
      dispatch(getAll())
    } catch (err) {
      dispatch({
        type: DESTROY_EXTERNAL_MODULES_FAILURE,
        payload: err
      })
    }
  }
}

export const CLEAN_STORE_EXTERNAL_MODULES = 'CLEAN_STORE_EXTERNAL_MODULES'

export const clearStore = () => {
  return async dispatch => {
    dispatch({
      type: CLEAN_STORE_EXTERNAL_MODULES
    });
  }
}