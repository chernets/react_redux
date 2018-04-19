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

export const CLEAN_STORE_REGISTRIES = 'CLEAN_STORE_REGISTRIES'

export const clearStore = () => {
  return async dispatch => {
    dispatch({
      type: CLEAN_STORE_REGISTRIES
    });
  }
}