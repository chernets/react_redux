export const GET_ALL_SESSIONS_REQUEST = 'GET_ALL_SESSIONS_REQUEST'
export const GET_ALL_SESSIONS_SUCCESS = 'GET_ALL_SESSIONS_SUCCESS'
export const GET_ALL_SESSIONS_FAILURE = 'GET_ALL_SESSIONS_FAILURE'

import { COUNT_FILTER } from '../../constant/variables'
import moment from 'moment'
import { UserManagementClient, AdminService, kazFilter, filterItem, filterFieldType, filterCondition } from '../../api/'

export const getAll = (loadingCount = true) => {
  return async (dispatch, getState) => {

    dispatch({
      type: GET_ALL_SESSIONS_REQUEST
    });
    const store = getState()
    let filter = kazFilter({
      countFilter: 25,
      position: (store.admin.sessions.page - 1) * COUNT_FILTER,
      items: []
    })
    filter.items.push(filterItem({
      field: 'isClosed',
      value: `${!store.admin.sessions.isClosed}`,
      fType: filterFieldType.BOOLEAN,
      condition: filterCondition.EQUAL
    }))
    if (store.admin.sessions.dateStart !== null) filter.items.push(filterItem({
      field: 'startDate',
      value: `${moment.utc(store.admin.sessions.dateStart).startOf('day').valueOf()}`,
      fType: filterFieldType.DATE,
      condition: filterCondition.MORE_OR_EQUAL
    }))
    if (store.admin.sessions.dateEnd !== null) filter.items.push(filterItem({
      field: 'expireDate',
      value: `${moment.utc(store.admin.sessions.dateEnd).endOf("day").valueOf()}`,
      fType: filterFieldType.DATE,
      condition: filterCondition.LESS_OR_EQUAL
    }))
    if (store.admin.sessions.user !== null) filter.items.push(filterItem({
      field: 'clientId',
      value: store.admin.sessions.user.id,
      fType: filterFieldType.STRING,
      condition: filterCondition.EQUAL
    }))
    try {
      let count = loadingCount ? await AdminService.getCountAllSessions(store.auth.token, filter) : store.admin.sessions.count
      let list = count > 0 ? await AdminService.getAllSessions(store.auth.token, filter) : []
      dispatch({
        type: GET_ALL_SESSIONS_SUCCESS,
        payload: {
          list,
          count
        }
      });
    } catch (err) {
      dispatch({
        type: GET_ALL_SESSIONS_FAILURE,
        payload: err
      })
    }
  }
}
export const SESSIONS_NEXT_PAGE = 'SESSIONS_NEXT_PAGE'
export const nextPage = () => {
  return async dispatch => {
    dispatch({
      type: SESSIONS_NEXT_PAGE
    });
    dispatch(getAll(false))
  }
}

export const SESSIONS_PREV_PAGE = 'SESSIONS_PREV_PAGE'
export const prevPage = () => {
  return async dispatch => {
    dispatch({
      type: SESSIONS_PREV_PAGE
    });
    dispatch(getAll(false))
  }
}

export const SESSIONS_CHANGE_START_DATE = 'SESSIONS_CHANGE_START_DATE'
export const changeDateStart = (dateTime) => {
  return async dispatch => {
    dispatch({
      type: SESSIONS_CHANGE_START_DATE,
      payload: dateTime
    });
    dispatch(getAll())
  }
}

export const SESSIONS_CHANGE_END_DATE = 'SESSIONS_CHANGE_END_DATE'
export const changeDateEnd = (dateTime) => {
  return async dispatch => {
    dispatch({
      type: SESSIONS_CHANGE_END_DATE,
      payload: dateTime
    });
    dispatch(getAll())
  }
}

export const SESSIONS_CHANGE_IS_CLOSED = 'SESSIONS_CHANGE_IS_CLOSED'
export const changeIsClosed = (isClosed) => {
  return async dispatch => {
    dispatch({
      type: SESSIONS_CHANGE_IS_CLOSED,
      payload: isClosed
    });
    dispatch(getAll())
  }
}

export const SESSIONS_CHANGE_USER = 'SESSIONS_CHANGE_USER'
export const changeUser = (user) => {
  return async dispatch => {
    dispatch({
      type: SESSIONS_CHANGE_USER,
      payload: user
    });
    dispatch(getAll())
  }
}

export const CLEAN_STORE_SESSIONS = 'CLEAN_STORE_SESSIONS'

export const clearStore = () => {
  return async dispatch => {
    dispatch({
      type: CLEAN_STORE_SESSIONS
    });
  }
}