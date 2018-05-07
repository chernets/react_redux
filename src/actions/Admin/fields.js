export const GET_ALL_FIELDS_REQUEST = 'GET_ALL_FIELDS_REQUEST'
export const GET_ALL_FIELDS_SUCCESS = 'GET_ALL_FIELDS_SUCCESS'
export const GET_ALL_FIELDS_FAILURE = 'GET_ALL_FIELDS_FAILURE'

import { AggregationDataClient, FilterClient, kazFilter, filterItem, filterFieldType, filterCondition } from '../../api/'

export const getAll = () => {
  return async (dispatch, getState) => {

    dispatch({
      type: GET_ALL_FIELDS_REQUEST
    });
    const store = getState()
    try {
      let request = await FilterClient.getAllCustomFields(store.auth.token, null, true)
      dispatch({
        type: GET_ALL_FIELDS_SUCCESS,
        payload: request
      });
    } catch (err) {
      dispatch({
        type: GET_ALL_FIELDS_FAILURE,
        payload: err
      })
    }
  }
}

export const CREATE_UPDATE_FIELDS_REQUEST = 'CREATE_UPDATE_FIELDS_REQUEST'
export const CREATE_UPDATE_FIELDS_SUCCESS = 'CREATE_UPDATE_FIELDS_SUCCESS'
export const CREATE_UPDATE_FIELDS_FAILURE = 'CREATE_UPDATE_FIELDS_FAILURE'

export const createUpdate = (obj) => {
  return async (dispatch, getState) => {
    dispatch({
      type: CREATE_UPDATE_FIELDS_REQUEST
    });
    const store = getState()
    try {
      let request = await FilterClient.createOrUpdateCustomField(store.auth.token, obj)
      dispatch({
        type: CREATE_UPDATE_FIELDS_SUCCESS
      });
      dispatch(getAll())
    } catch (err) {
      dispatch({
        type: CREATE_UPDATE_FIELDS_FAILURE,
        payload: err
      })
    }
  }
}

export const GET_FIELDS_REQUEST = 'GET_FIELDS_REQUEST'
export const GET_FIELDS_SUCCESS = 'GET_FIELDS_SUCCESS'
export const GET_FIELDS_FAILURE = 'GET_FIELDS_FAILURE'

export const byId = (obj = null) => {
  return async (dispatch, getState) => {
    dispatch({
      type: GET_FIELDS_REQUEST
    });
    const store = getState()
    try {
      let request = new FilterField(obj)
      setTimeout(()=>{
        dispatch({
          type: GET_FIELDS_SUCCESS,
          payload: request
        });
      }, obj === null ? 0 : 300)

    } catch (err) {
      dispatch({
        type: GET_FIELDS_FAILURE,
        payload: err
      })
    }
  }
}

export const DESTROY_FIELDS_REQUEST = 'DESTROY_FIELDS_REQUEST'
export const DESTROY_FIELDS_SUCCESS = 'DESTROY_FIELDS_SUCCESS'
export const DESTROY_FIELDS_FAILURE = 'DESTROY_FIELDS_FAILURE'

export const destroy = (id) => {
  return async (dispatch, getState) => {
    dispatch({
      type: DESTROY_FIELDS_REQUEST
    });
    const store = getState()
    try {
      let request = await FilterClient.removeCustomField(store.auth.token, id)
      dispatch({
        type: DESTROY_FIELDS_SUCCESS
      });
      dispatch(getAll())
    } catch (err) {
      dispatch({
        type: DESTROY_FIELDS_FAILURE,
        payload: err
      })
    }
  }
}

export const CLEAN_STORE_FIELDS = 'CLEAN_STORE_FIELDS'

export const clearStore = () => {
  return async dispatch => {
    dispatch({
      type: CLEAN_STORE_FIELDS
    });
  }
}