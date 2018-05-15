import _ from 'lodash'
export const GET_ALL_REPORT_ADMIN_REQUEST = 'GET_ALL_REPORT_ADMIN_REQUEST'
export const GET_ALL_REPORT_ADMIN_SUCCESS = 'GET_ALL_REPORT_ADMIN_SUCCESS'
export const GET_ALL_REPORT_ADMIN_FAILURE = 'GET_ALL_REPORT_ADMIN_FAILURE'

import { AggregationDataClient, FilterClient, kazFilter, filterItem, filterFieldType, filterCondition } from '../../api/'

export const getAll = () => {
  return async (dispatch, getState) => {

    dispatch({
      type: GET_ALL_REPORT_ADMIN_REQUEST
    });
    const store = getState()
    try {
      let request = await FilterClient.getAllCustomDocFilters(store.auth.token, null)
      dispatch({
        type: GET_ALL_REPORT_ADMIN_SUCCESS,
        payload: _.sortBy(request, 'position')
      });
    } catch (err) {
      dispatch({
        type: GET_ALL_REPORT_ADMIN_FAILURE,
        payload: err
      })
    }
  }
}

export const CREATE_UPDATE_REPORT_ADMIN_REQUEST = 'CREATE_UPDATE_REPORT_ADMIN_REQUEST'
export const CREATE_UPDATE_REPORT_ADMIN_SUCCESS = 'CREATE_UPDATE_REPORT_ADMIN_SUCCESS'
export const CREATE_UPDATE_REPORT_ADMIN_FAILURE = 'CREATE_UPDATE_REPORT_ADMIN_FAILURE'

export const createUpdate = (obj) => {
  return async (dispatch, getState) => {
    dispatch({
      type: CREATE_UPDATE_REPORT_ADMIN_REQUEST
    });
    const store = getState()
    try {
      let request = await Promise.all(_.differenceBy(store.admin.represenrations.selected.filters, obj.filters, 'id').map(item => {
        return FilterClient.removeCustomFilterItem(store.auth.token, item.id)
      }))
      request = await Promise.all(obj.filters.map(item => {
        return FilterClient.createOrUpdateCustomFilterItem(store.auth.token, new CustomFilterItem(item))
      }))
      request = await FilterClient.createOrUpdateCustomDocFilter(store.auth.token, new DocFilter(obj), request.map(item => {return item.id}), _.values(obj.fields).map(item => { return item.id}))
      dispatch({
        type: CREATE_UPDATE_REPORT_ADMIN_SUCCESS
      });
      dispatch(getAll())
    } catch (err) {
      dispatch({
        type: CREATE_UPDATE_REPORT_ADMIN_FAILURE,
        payload: err
      })
    }
  }
}

export const GET_REPORT_ADMIN_REQUEST = 'GET_REPORT_ADMIN_REQUEST'
export const GET_REPORT_ADMIN_SUCCESS = 'GET_REPORT_ADMIN_SUCCESS'
export const GET_REPORT_ADMIN_FAILURE = 'GET_REPORT_ADMIN_FAILURE'

export const byId = (obj = null) => {
  return async (dispatch, getState) => {
    dispatch({
      type: GET_REPORT_ADMIN_REQUEST
    });
    const store = getState()
    try {
      let request = new DocFilter({
        ...obj,
        forMobile: obj === null || obj.forMobile === null ? false : obj.forMobile,
        forRegistry: obj === null || obj.forRegistry === null ? false : obj.forRegistry,
        key: obj === null || obj.key === null ? 'key' : obj.key,
        value: obj === null || obj.value === null ? 'value' : obj.value,
        position: obj === null || obj.position === null ? store.admin.represenrations.list.length : obj.position,
        filters: obj === null || obj.filters === null ? [] : obj.filters,
        fields: obj === null || obj.fields === null ? [] : obj.fields,
      })
      setTimeout(() => {
        dispatch({
          type: GET_REPORT_ADMIN_SUCCESS,
          payload: request
        });
      }, obj === null ? 0 : 300)

    } catch (err) {
      dispatch({
        type: GET_REPORT_ADMIN_FAILURE,
        payload: err
      })
    }
  }
}

export const DESTROY_REPORT_ADMIN_REQUEST = 'DESTROY_REPORT_ADMIN_REQUEST'
export const DESTROY_REPORT_ADMIN_SUCCESS = 'DESTROY_REPORT_ADMIN_SUCCESS'
export const DESTROY_REPORT_ADMIN_FAILURE = 'DESTROY_REPORT_ADMIN_FAILURE'

export const destroy = (id) => {
  return async (dispatch, getState) => {
    dispatch({
      type: DESTROY_REPORT_ADMIN_REQUEST
    });
    const store = getState()
    try {
      let request = await FilterClient.removeCustomDocFilter(store.auth.token, id)
      dispatch({
        type: DESTROY_REPORT_ADMIN_SUCCESS
      });
      dispatch(getAll())
    } catch (err) {
      dispatch({
        type: DESTROY_REPORT_ADMIN_FAILURE,
        payload: err
      })
    }
  }
}

export const CLEAN_STORE_REPORT_ADMIN = 'CLEAN_STORE_REPORT_ADMIN'

export const clearStore = () => {
  return async dispatch => {
    dispatch({
      type: CLEAN_STORE_REPORT_ADMIN
    });
  }
}