import * as actions from '../../actions/Admin/filestorages'

const initValues = {
  list: [],
  selected: null,
  isFetching: false,
  error: null,
  account: null,
  type: null
}
export default (state = initValues, action) => {

  switch (action.type) {
    case actions.GET_ALL_FILE_STORAGE_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case actions.GET_ALL_FILE_STORAGE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        list: action.payload
      }
    case actions.GET_FILE_STORAGE_REQUEST:
      return {
        ...state,
        selected: null
      }
    case actions.GET_FILE_STORAGE_SUCCESS:
      return {
        ...state,
        selected: action.payload,
        error: null
      }
    case actions.CREATE_UPDATE_FILE_STORAGE_SUCCESS:
      return {
        ...state,
        selected: null,
        error: null
      }
    case actions.CREATE_UPDATE_FILE_STORAGE_FAILURE:
      return {
        ...state,
        error: action.payload
      }
    case actions.DESTROY_FILE_STORAGE_SUCCESS:
      return {
        ...state,
        selected: null
      }
    case actions.DESTROY_FILE_STORAGE_FAILURE:
      return {
        ...state,
        error: action.payload
      }
    case actions.CLEAN_STORE_FILE_STORAGE:
      return {
        ...initValues
      }
    case actions.SELECT_ACCOUNT_FILE_STORAGE:
      return {
        ...state,
        account: action.payload
      }
    case actions.SELECT_TYPE_FILE_STORAGE:
      return {
        ...state,
        type: action.payload
      }
    default:
      return state;
  }
}
