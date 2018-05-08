import * as actions from '../../actions/Modals'


const initValues = {
  isFetching: false,
  allFields: [],
  error: null
}
export default (state = initValues, action) => {
  switch (action.type) {
    case actions.changeDocumentFields.GET_ALL_FIELDS_MODAL_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case actions.changeDocumentFields.GET_ALL_FIELDS_MODAL_SUCCESS:
      return {
        ...state,
        isFetching: false,
        allFields: action.payload
      }
    case actions.changeDocumentFields.GET_ALL_FIELDS_MODAL_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      }
      case actions.changeDocumentFields.GET_CLEAN_STORE_FIELDS_MODAL:
      return {
        ...initValues
      }
    default:
      return state;
  }
}
