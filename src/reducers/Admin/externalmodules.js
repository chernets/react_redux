import * as actions from '../../actions/Admin/externalmodules'

const initValues = {
  list: [],
  selected: null,
  isFetching: false,
  error: null
}
export default (state = initValues, action) => {
  switch (action.type) {
    case actions.GET_ALL_EXTERNAL_MODULES_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case actions.GET_ALL_EXTERNAL_MODULES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        list: action.payload
      }
    case actions.GET_EXTERNAL_MODULES_REQUEST:
      return {
        ...state,
        selected: null
      }
    case actions.GET_EXTERNAL_MODULES_SUCCESS:
      return {
        ...state,
        selected: action.payload,
        error: null
      }
    case actions.CREATE_EXTERNAL_MODULES_SUCCESS:
      return {
        ...state,
        selected: null,
        error: null
      }
    case actions.CREATE_EXTERNAL_MODULES_FAILURE:
      return {
        ...state,
        error: action.payload
      }
      case actions.UPDATE_EXTERNAL_MODULES_SUCCESS:
      return {
        ...state,
        selected: null,
        error: null
      }
    case actions.UPDATE_EXTERNAL_MODULES_FAILURE:
      return {
        ...state,
        error: action.payload
      }
    case actions.DESTROY_EXTERNAL_MODULES_SUCCESS:
      return {
        ...state,
        selected: null
      }
    case actions.DESTROY_EXTERNAL_MODULES_FAILURE:
      return {
        ...state,
        error: action.payload
      }
    case actions.CLEAN_STORE_EXTERNAL_MODULES:
      return {
        ...initValues
      }
    default:
      return state;
  }
}
