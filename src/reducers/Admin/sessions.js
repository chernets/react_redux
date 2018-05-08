import * as actions from '../../actions'
const initValues = {
  list: [],
  page: 1,
  count: 0,
  isFetching: false,
  error: null,
  isClosed: true,
  dateStart: null,
  dateEnd: null,
  user: null
}

export default (state = initValues, action) => {

  switch (action.type) {

    case actions.admin.sessions.GET_ALL_SESSIONS_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case actions.admin.sessions.GET_ALL_SESSIONS_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isFetching: false
      }
    case actions.admin.sessions.SESSIONS_NEXT_PAGE:
      return {
        ...state,
        page: state.page + 1
      }
    case actions.admin.sessions.SESSIONS_PREV_PAGE:
      return {
        ...state,
        page: state.page - 1
      }
    case actions.admin.sessions.SESSIONS_CHANGE_START_DATE:
      return {
        ...state,
        page: 1,
        dateStart: action.payload
      }

    case actions.admin.sessions.SESSIONS_CHANGE_END_DATE:
      return {
        ...state,
        page: 1,
        dateEnd: action.payload
      }
    case actions.admin.sessions.SESSIONS_CHANGE_IS_CLOSED:
      return {
        ...state,
        page: 1,
        isClosed: action.payload
      }
    case actions.admin.sessions.SESSIONS_CHANGE_USER:
      return {
        ...state,
        page: 1,
        user: action.payload
      }
    case actions.admin.sessions.CLEAN_STORE_SESSIONS:
      return initValues;
    default:
      return state;
  }
}
