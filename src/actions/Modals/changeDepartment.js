import _ from 'lodash'


import {
  DepartmentClient,
  kazFilter, filterItem, filterFieldType, filterCondition
} from '../../api'

export const GET_ALL_DEPARTMENTS_REQUEST = 'GET_ALL_DEPARTMENTS_REQUEST'
export const GET_ALL_DEPARTMENTS_SUCCESS = 'GET_ALL_DEPARTMENTS_SUCCESS'
export const GET_ALL_DEPARTMENTS_FAILURE = 'GET_ALL_DEPARTMENTS_FAILURE'

export const getAllDepartments = () => {
  return async (dispatch, getState) => {
    const store = getState()
    dispatch({
      type: GET_ALL_DEPARTMENTS_REQUEST
    });
    let filter = kazFilter({
      countFilter: 25,
      position: store.modalChangeDepartments.allDepartments.length,
      items: []
    })
    filter.items.push(filterItem({
      field: 'withPath',
      value: null,
      fType: filterFieldType.STRING,
      condition: filterCondition.EQUAL
    }))
    filter.items.push(filterItem({
      field: 'accountId',
      value: store.auth.accounts.map(itm => {return itm.id}).join(';'),
      fType: filterFieldType.STRING,
      condition: filterCondition.IN
    }))
    if (store.modalChangeDepartments.searchText !== '') {
      filter.items.push(filterItem({
        field: 'name',
        value: store.modalChangeDepartments.searchText,
        fType: filterFieldType.STRING,
        condition: filterCondition.CONTAIN
      }))
    }
    try {
      let allDepartments = await DepartmentClient.getAllDepartments(store.auth.token, filter)
      dispatch({
        type: GET_ALL_DEPARTMENTS_SUCCESS,
        payload: [...store.modalChangeDepartments.allDepartments, ...allDepartments]
      });
    } catch (err) {
      dispatch({
        type: GET_ALL_DEPARTMENTS_FAILURE,
        payload: err
      })
    }
  }
}

export const SEARCH_DEPARTMENTS = 'SEARCH_DEPARTMENTS'

export const searchDepartments = (searchText) => {
  return async dispatch => {
    dispatch({
      type: SEARCH_DEPARTMENTS,
      payload: searchText
    })
    dispatch(getAllDepartments())
  }
}

export const GET_CLEAN_STORE_DEPARTMENTS = 'GET_CLEAN_STORE_DEPARTMENTS'

export const cleanStore = () => {
  return async dispatch => {
    dispatch({
      type: GET_CLEAN_STORE_DEPARTMENTS
    })
  }
}