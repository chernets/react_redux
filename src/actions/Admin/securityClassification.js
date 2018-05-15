

import { SecurityClassificationClient, UserManagementClient, AccountGroupClient, AccountClient, AdminService, kazFilter, filterItem, filterFieldType, filterCondition } from '../../api/'
import _ from 'lodash'
export const GET_ALL_SECURITY_CLASSIFICATION_ADMIN_REQUEST = 'GET_ALL_SECURITY_CLASSIFICATION_ADMIN_REQUEST'
export const GET_ALL_SECURITY_CLASSIFICATION_ADMIN_SUCCESS = 'GET_ALL_SECURITY_CLASSIFICATION_ADMIN_SUCCESS'
export const GET_ALL_SECURITY_CLASSIFICATION_ADMIN_FAILURE = 'GET_ALL_SECURITY_CLASSIFICATION_ADMIN_FAILURE'

export const getAll = () => {
  return async (dispatch, getState) => {

    dispatch({
      type: GET_ALL_SECURITY_CLASSIFICATION_ADMIN_REQUEST
    });
    const store = getState()
    const filter = kazFilter({
      countFilter: 999,
      position: 0,
      items: []
    })
    try {
      let request = await SecurityClassificationClient.getAllSecurityClassification(store.auth.token, filter)
      let allDependencies = await Promise.all(request.map(item => {
        return SecurityClassificationClient.getAllSecurityClassificationDependencies(store.auth.token,item.id, null)
      }))
      dispatch({
        type: GET_ALL_SECURITY_CLASSIFICATION_ADMIN_SUCCESS,
        payload: request.map((item, index) => {
          item.dependencies = allDependencies[index]
          return item
        })
      });
    } catch (err) {
      dispatch({
        type: GET_ALL_SECURITY_CLASSIFICATION_ADMIN_FAILURE,
        payload: err
      })
    }
  }
}

export const CREATE_UPDATE_SECURITY_CLASSIFICATION_ADMIN_REQUEST = 'CREATE_UPDATE_SECURITY_CLASSIFICATION_ADMIN_REQUEST'
export const CREATE_UPDATE_SECURITY_CLASSIFICATION_ADMIN_SUCCESS = 'CREATE_UPDATE_SECURITY_CLASSIFICATION_ADMIN_SUCCESS'
export const CREATE_UPDATE_SECURITY_CLASSIFICATION_ADMIN_FAILURE = 'CREATE_UPDATE_SECURITY_CLASSIFICATION_ADMIN_FAILURE'

export const createUpdate = (obj) => {
  return async (dispatch, getState) => {
    dispatch({
      type: CREATE_UPDATE_SECURITY_CLASSIFICATION_ADMIN_REQUEST
    });
    const store = getState()
    try {
      let request = await SecurityClassificationClient.createOrUpdateSecurityClassification(store.auth.token, new SecurityClassification(obj))
      if (!_.isEqual(store.admin.securityClassification.selected.dependencies, obj.dependencies)) { 
        let removeIDs = _.difference(store.admin.securityClassification.selected.dependencies, obj.dependencies).map(item => { return item.id })
        let addIDs = _.difference(obj.dependencies, store.admin.securityClassification.selected.dependencies).map(item => { return item.id })
        if (removeIDs.length > 0) await SecurityClassificationClient.removeSecurityClassificationDependencies(store.auth.token, request.id, removeIDs)
        if (addIDs.length > 0) await SecurityClassificationClient.addSecurityClassificationDependencies(store.auth.token, request.id, addIDs)
      }
      dispatch({
        type: CREATE_UPDATE_SECURITY_CLASSIFICATION_ADMIN_SUCCESS
      });
      dispatch(getAll())
    } catch (err) {
      dispatch({
        type: CREATE_UPDATE_SECURITY_CLASSIFICATION_ADMIN_FAILURE,
        payload: err
      })
    }
  }
}

export const GET_SECURITY_CLASSIFICATION_ADMIN_REQUEST = 'GET_SECURITY_CLASSIFICATION_ADMIN_REQUEST'
export const GET_SECURITY_CLASSIFICATION_ADMIN_SUCCESS = 'GET_SECURITY_CLASSIFICATION_ADMIN_SUCCESS'
export const GET_SECURITY_CLASSIFICATION_ADMIN_FAILURE = 'GET_SECURITY_CLASSIFICATION_ADMIN_FAILURE'

export const byId = (id = null) => {
  return async (dispatch, getState) => {
    dispatch({
      type: GET_SECURITY_CLASSIFICATION_ADMIN_REQUEST
    });
    const store = getState()
    try {
      let request = new SecurityClassification(id)
      request.dependencies = id === null ? [] : id.dependencies
      setTimeout(() => {
        dispatch({
          type: GET_SECURITY_CLASSIFICATION_ADMIN_SUCCESS,
          payload: request
        });
      }, id === null ? 0 : 300)

    } catch (err) {
      dispatch({
        type: GET_SECURITY_CLASSIFICATION_ADMIN_FAILURE,
        payload: err
      })
    }
  }
}

export const DESTROY_SECURITY_CLASSIFICATION_ADMIN_REQUEST = 'DESTROY_SECURITY_CLASSIFICATION_ADMIN_REQUEST'
export const DESTROY_SECURITY_CLASSIFICATION_ADMIN_SUCCESS = 'DESTROY_SECURITY_CLASSIFICATION_ADMIN_SUCCESS'
export const DESTROY_SECURITY_CLASSIFICATION_ADMIN_FAILURE = 'DESTROY_SECURITY_CLASSIFICATION_ADMIN_FAILURE'

export const destroy = (id) => {
  return async (dispatch, getState) => {
    dispatch({
      type: DESTROY_SECURITY_CLASSIFICATION_ADMIN_REQUEST
    });
    const store = getState()
    try {
      let request = await SecurityClassificationClient.removeSecurityClassification(store.auth.token, id)
      dispatch({
        type: DESTROY_SECURITY_CLASSIFICATION_ADMIN_SUCCESS
      });
      dispatch(getAll())
    } catch (err) {
      dispatch({
        type: DESTROY_SECURITY_CLASSIFICATION_ADMIN_FAILURE,
        payload: err
      })
    }
  }
}
export const CLEAN_STORE_SECURITY_CLASSIFICATION_ADMIN = 'CLEAN_STORE_SECURITY_CLASSIFICATION_ADMIN'

export const clearStore = () => {
  return async dispatch => {
    dispatch({
      type: CLEAN_STORE_SECURITY_CLASSIFICATION_ADMIN
    });
  }
}