import _ from 'lodash'
export const USERS_REQUEST = 'USERS_REQUEST'
export const USERS_SUCCESS = 'USERS_SUCCESS'
export const USERS_FAILURE = 'USERS_FAILURE'

export const USERS_NEXT_PAGE = 'USERS_NEXT_PAGE'
export const USERS_PREV_PAGE = 'USERS_PREV_PAGE'

export const USERS_ACCOUNT_SELECTED = 'USERS_ACCOUNT_SELECTED'
export const USERS_CLEAN_STATE = 'USERS_CLEAN_STATE'

export const USERS_ALL_ACCOUNTS = 'USERS_ALL_ACCOUNTS'

export const USERS_SELECT_SEARCH_FIELD = 'USERS_SELECT_SEARCH_FIELD'
export const USERS_SELECT_SEARCH_TEXT = 'USERS_SELECT_SEARCH_TEXT'

import {
  AdminService, kazFilter, filterItem,
  filterFieldType, filterCondition
} from '../api/'

import { COUNT_FILTER } from '../constant/variables'

const getFilter = (store) => {
  let filter = kazFilter({
    countFilter: COUNT_FILTER,
    position: (store.users.page - 1) * COUNT_FILTER,
    items: []
  })
  filter.items.push(filterItem({
    field: 'type',
    value: 'ClientType.NORMAL',
    fType: filterFieldType.ENUMERATED,
    condition: filterCondition.EQUAL
  }))
  if (store.users.accountSelected === null || store.users.accountSelected.id === null) {
    filter.items.push(filterItem({
      field: 'accountId',
      value: store.users.accounts.map(item => { return item.id }).join(';'),
      fType: filterFieldType.STRING,
      condition: filterCondition.IN
    }))
  } else {
    filter.items.push(filterItem({
      field: 'accountId',
      value: store.users.accountSelected.id,
      fType: filterFieldType.STRING,
      condition: filterCondition.EQUAL
    }))
  }
  if (_.trim(store.users.searchText) !== '' && _.trim(store.users.searchText).length > 2) {
    filter.items.push(filterItem({
      field: store.users.searchField,
      value: store.users.searchText,
      fType: filterFieldType.STRING,
      condition: filterCondition.CONTAIN
    }))
  }
  return filter
}


export const getAllUsers = (loadingCount = true) => {
  return async (dispatch, getState) => {
    const store = getState()
    dispatch({
      type: USERS_REQUEST
    });

    try {
      let count = loadingCount ? await AdminService.getCountAllUsersExt(store.auth.token, getFilter(store)) : store.users.count
      let users = count > 0 ? await AdminService.getAllUsersExt(store.auth.token, getFilter(store)) : []
      dispatch({
        type: USERS_SUCCESS,
        payload: {
          users,
          count
        }
      });
    } catch (err) {
      dispatch({
        type: USERS_FAILURE,
        payload: err
      })
    }
  }
}

export const nextPage = () => {
  return async dispatch => {
    dispatch({
      type: USERS_NEXT_PAGE
    });
    dispatch(getAllUsers(false))
  }
}

export const prevPage = () => {
  return async dispatch => {
    dispatch({
      type: USERS_PREV_PAGE
    });
    dispatch(getAllUsers(false))
  }
}

export const allAccounts = (admin) => {
  return async (dispatch, getState) => {
    const store = getState()
    dispatch({
      type: USERS_ALL_ACCOUNTS,
      payload: admin ? store.auth.accounts : store.auth.accountsNotSecurity
    })
    dispatch(getAllUsers(true))
  }
}

export const selectedAccount = (data) => {
  return async dispatch => {
    dispatch({
      type: USERS_ACCOUNT_SELECTED,
      payload: data
    });
    dispatch(getAllUsers(true))
  }
}

export const cleanState = () => {
  return async dispatch => {
    dispatch({
      type: USERS_CLEAN_STATE
    });
  }
}

export const handlerSearchField = (field) => {
  return async dispatch => {
    dispatch({
      type: USERS_SELECT_SEARCH_FIELD,
      payload: field
    });
    dispatch(getAllUsers(true))
  }
}

export const handlerSearchText = (data) => {
  return async dispatch => {
    dispatch({
      type: USERS_SELECT_SEARCH_TEXT,
      payload: data
    })
    dispatch(getAllUsers(true))
  }
}
