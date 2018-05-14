import * as actions from '../../actions/Admin/accounts'

const initValues = {
  list: [],
  groupsList: [],
  fileStoragesList: [],
  selected: null,
  isFetching: false
}
export default (state = initValues, action) => {

  switch (action.type) {

    case actions.GET_ALL_ACCOUNTS_FS_SUCCESS:
      return {
        ...state,
        fileStoragesList: action.payload
      }
    case actions.GET_ALL_ACCOUNTS_GROUP_SUCCESS:
      return {
        ...state,
        groupsList: action.payload
      }
    case actions.GET_ALL_ACCOUNTS_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case actions.GET_ALL_ACCOUNTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        list: action.payload
      }
    case actions.GET_ACCOUNTS_REQUEST:
      return {
        ...state,
        selected: null
      }
    case actions.GET_ACCOUNTS_SUCCESS:
      return {
        ...state,
        selected: action.payload
      }
    case actions.CREATE_UPDATE_ACCOUNTS_SUCCESS:
      return {
        ...state,
        selected: null
      }
    case actions.DESTROY_ACCOUNTS_SUCCESS:
      return {
        ...state,
        selected: null
      }
    case actions.CLEAN_STORE_ACCOUNTS:
      return {
        ...initValues
      }
    default:
      return state;
  }
}
