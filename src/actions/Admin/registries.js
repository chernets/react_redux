export const GET_ALL_REGISTRIES_REQUEST = 'GET_ALL_REGISTRIES_REQUEST'
export const GET_ALL_REGISTRIES_SUCCESS = 'GET_ALL_REGISTRIES_SUCCESS'
export const GET_ALL_REGISTRIES_FAILURE = 'GET_ALL_REGISTRIES_FAILURE'

import { AggregationDataClient, kazFilter, filterItem, filterFieldType, filterCondition } from '../../api/'

export const getAll = () => {
  return async (dispatch, getState) => {

    dispatch({
      type: GET_ALL_REGISTRIES_REQUEST
    });
    const store = getState()
    try {
      let request = await AggregationDataClient.getAllRegistries(store.auth.token, null, true)
      dispatch({
        type: GET_ALL_REGISTRIES_SUCCESS,
        payload: request
      });
    } catch (err) {
      dispatch({
        type: GET_ALL_REGISTRIES_FAILURE,
        payload: err
      })
    }
  }
}

export const CREATE_UPDATE_REGISTRIES_REQUEST = 'CREATE_UPDATE_REGISTRIES_REQUEST'
export const CREATE_UPDATE_REGISTRIES_SUCCESS = 'CREATE_UPDATE_REGISTRIES_SUCCESS'
export const CREATE_UPDATE_REGISTRIES_FAILURE = 'CREATE_UPDATE_REGISTRIES_FAILURE'

export const createUpdate = (obj, userList = [], accList = []) => {
  return async (dispatch, getState) => {
    dispatch({
      type: CREATE_UPDATE_REGISTRIES_REQUEST
    });
    const store = getState()
    try {
      let request = await AggregationDataClient.createOrUpdateRegistry(store.auth.token, obj, userList, accList)
      dispatch({
        type: CREATE_UPDATE_REGISTRIES_SUCCESS
      });
      dispatch(getAll())
    } catch (err) {
      dispatch({
        type: CREATE_UPDATE_REGISTRIES_FAILURE,
        payload: err
      })
    }
  }
}

export const GET_REGISTRIES_REQUEST = 'GET_REGISTRIES_REQUEST'
export const GET_REGISTRIES_SUCCESS = 'GET_REGISTRIES_SUCCESS'
export const GET_REGISTRIES_FAILURE = 'GET_REGISTRIES_FAILURE'

export const byId = (id = null) => {
  return async (dispatch, getState) => {
    dispatch({
      type: GET_REGISTRIES_REQUEST
    });
    const store = getState()
    try {
      let request = id !== null ? await AggregationDataClient.getRegistryById(store.auth.token, id, [AggregationRequiredType.REGISTRY_RULE, AggregationRequiredType.REGISTRY_USERS, AggregationRequiredType.REGISTRY_ACCOUNTS]) : new Registry({
        accountList: [],
        userOrGrList: []
      })
      dispatch({
        type: GET_REGISTRIES_SUCCESS,
        payload: request
      });
    } catch (err) {
      dispatch({
        type: GET_REGISTRIES_FAILURE,
        payload: err
      })
    }
  }
}

export const DESTROY_REGISTRIES_REQUEST = 'DESTROY_REGISTRIES_REQUEST'
export const DESTROY_REGISTRIES_SUCCESS = 'DESTROY_REGISTRIES_SUCCESS'
export const DESTROY_REGISTRIES_FAILURE = 'DESTROY_REGISTRIES_FAILURE'

export const destroy = (id) => {
  return async (dispatch, getState) => {
    dispatch({
      type: DESTROY_REGISTRIES_REQUEST
    });
    const store = getState()
    try {
      let request = await AggregationDataClient.removeRegistry(store.auth.token, id)
      dispatch({
        type: DESTROY_REGISTRIES_SUCCESS
      });
      dispatch(getAll())
    } catch (err) {
      dispatch({
        type: DESTROY_REGISTRIES_FAILURE,
        payload: err
      })
    }
  }
}

export const CLEAN_STORE_REGISTRIES = 'CLEAN_STORE_REGISTRIES'

export const clearStore = () => {
  return async dispatch => {
    dispatch({
      type: CLEAN_STORE_REGISTRIES
    });
  }
}