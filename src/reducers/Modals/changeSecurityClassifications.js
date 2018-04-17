import * as actions from '../../actions/Modals'


const initValues = {
  isFetching: false,
  allSecurityClassification: [],
  error: null
}
export default (state = initValues, action) => {
  switch (action.type) {
    case actions.changeSecurityClassifications.GET_ALL_SECURITY_CLASSIFICATION_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case actions.changeSecurityClassifications.GET_ALL_SECURITY_CLASSIFICATION_SUCCESS:
      return {
        ...state,
        isFetching: false,
        allSecurityClassification: action.payload
      }
      case actions.changeSecurityClassifications.GET_ALL_SECURITY_CLASSIFICATION_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      }
    default:
      return state;
  }
}
