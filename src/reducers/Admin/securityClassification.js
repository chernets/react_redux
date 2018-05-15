import * as actions from '../../actions/Admin/securityClassification'

const initValues = {
  list: [],
  selected: null,
  isFetching: false
}
export default (state = initValues, action) => {

  switch (action.type) {
    case actions.GET_ALL_SECURITY_CLASSIFICATION_ADMIN_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case actions.GET_ALL_SECURITY_CLASSIFICATION_ADMIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        list: action.payload
      }
    case actions.GET_SECURITY_CLASSIFICATION_ADMIN_REQUEST:
      return {
        ...state,
        selected: null
      }
    case actions.GET_SECURITY_CLASSIFICATION_ADMIN_SUCCESS:
      return {
        ...state,
        selected: action.payload
      }
    case actions.CREATE_UPDATE_SECURITY_CLASSIFICATION_ADMIN_SUCCESS:
      return {
        ...state,
        selected: null
      }
    case actions.DESTROY_SECURITY_CLASSIFICATION_ADMIN_SUCCESS:
      return {
        ...state,
        selected: null
      }
    case actions.CLEAN_STORE_SECURITY_CLASSIFICATION_ADMIN:
      return {
        ...initValues
      }
    default:
      return state;
  }
}
