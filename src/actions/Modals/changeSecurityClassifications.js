import _ from 'lodash'

import {
  SecurityClassificationClient,
  kazFilter, filterItem, filterFieldType, filterCondition
} from '../../api'

export const GET_ALL_SECURITY_CLASSIFICATION_REQUEST = 'GET_ALL_SECURITY_CLASSIFICATION_REQUEST'
export const GET_ALL_SECURITY_CLASSIFICATION_SUCCESS = 'GET_ALL_SECURITY_CLASSIFICATION_SUCCESS'
export const GET_ALL_SECURITY_CLASSIFICATION_FAILURE = 'GET_ALL_SECURITY_CLASSIFICATION_FAILURE'

export const getAllSecurityClassifications = () => {
  return async (dispatch, getState) => {
    const store = getState()
    dispatch({
      type: GET_ALL_SECURITY_CLASSIFICATION_REQUEST
    });
    let filter = kazFilter({
      countFilter: 127,
      position: 0,
      items: []
    })
    try {
      let allSecurityClassifications = await SecurityClassificationClient.getAllSecurityClassification(store.auth.token, filter)
      let request = allSecurityClassifications.map(itm => {
        return SecurityClassificationClient.getAllSecurityClassificationDependencies(store.auth.token, itm.id, filter)
      })
      let dependencies = await Promise.all(request)
      dispatch({
        type: GET_ALL_SECURITY_CLASSIFICATION_SUCCESS,
        payload: allSecurityClassifications.map((itm, index) => {
          return {
            ...itm,
            dependencies: dependencies[index]
          }
        })
      });
    } catch (err) {
      dispatch({
        type: GET_ALL_SECURITY_CLASSIFICATION_FAILURE,
        payload: err
      })
    }
  }
}