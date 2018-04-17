import * as actions from '../actions'
export default (state = {
  users: [],
  page: 1,
  count: 0,
  isFetching: false,
  error: null,
  accounts: [],
  accountSelected: null,
  searchField: 'FIO',
  searchText: ''
}, action) => {

  switch (action.type) {
    case actions.users.USERS_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case actions.users.USERS_SUCCESS:
      return {
        ...state,
        users: action.payload.users,
        count: action.payload.count,
        error: null,
        isFetching: false
      }
    case actions.users.USERS_FAILURE:
      return {
        ...state,
        users: [],
        error: action.payload,
        isFetching: false
      }
    case actions.users.USERS_NEXT_PAGE:
      return {
        ...state,
        page: state.page + 1
      }
    case actions.users.USERS_PREV_PAGE:
      return {
        ...state,
        page: state.page - 1
      }
    case actions.users.USERS_ACCOUNT_SELECTED:
      return {
        ...state,
        page: 1,
        count: 0,
        accountSelected: action.payload
      }
    case actions.users.USERS_ALL_ACCOUNTS:
      return {
        ...state,
        accounts: action.payload
      }
    case actions.users.USERS_SELECT_SEARCH_FIELD:
      return {
        ...state,
        searchField: action.payload
      }

    case actions.users.USERS_SELECT_SEARCH_TEXT:
      return {
        ...state,
        searchText: action.payload
      }
    case actions.users.USERS_CLEAN_STATE:
      return {
        ...state,
        page: 1,
        count: 0,
        accountSelected: null,
        accounts: [],
        users: [],
        searchField: 'FIO',
        searchText: ''
      }

    default:
      return state;
  }
}

