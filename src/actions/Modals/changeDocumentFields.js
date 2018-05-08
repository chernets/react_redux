import _ from 'lodash'


import {
  FilterClient,
  kazFilter, filterItem, filterFieldType, filterCondition
} from '../../api'

export const GET_ALL_FIELDS_MODAL_REQUEST = 'GET_ALL_FIELDS_MODAL_REQUEST'
export const GET_ALL_FIELDS_MODAL_SUCCESS = 'GET_ALL_FIELDS_MODAL_SUCCESS'
export const GET_ALL_FIELDS_MODAL_FAILURE = 'GET_ALL_FIELDS_MODAL_FAILURE'

export const getAllFields = () => {
  return async (dispatch, getState) => {
    const store = getState()
    dispatch({
      type: GET_ALL_FIELDS_MODAL_REQUEST
    });
    let filter = kazFilter({
      countFilter: 50,
      position: store.modals.changeDocumentFields.allFields.length,
      items: []
    })
    try {
      let allFields = await FilterClient.getAllCustomFields(store.auth.token, filter)
      dispatch({
        type: GET_ALL_FIELDS_MODAL_SUCCESS,
        payload: [...store.modals.changeDocumentFields.allFields, ...allFields]
      });
    } catch (err) {
      dispatch({
        type: GET_ALL_FIELDS_MODAL_FAILURE,
        payload: err
      })
    }
  }
}

export const GET_CLEAN_STORE_FIELDS_MODAL = 'GET_CLEAN_STORE_FIELDS_MODAL'

export const cleanStore = () => {
  return async dispatch => {
    dispatch({
      type: GET_CLEAN_STORE_FIELDS_MODAL
    })
  }
}