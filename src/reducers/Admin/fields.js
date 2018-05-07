import * as actions from '../../actions/Admin/fields'

const initValues = {
  list: [],
  selected: null,
  isFetching: false
}
export default (state = initValues, action) => {

  switch (action.type) {
    case actions.GET_ALL_FIELDS_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case actions.GET_ALL_FIELDS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        list: action.payload
      }
    case actions.GET_FIELDS_REQUEST:
      return {
        ...state,
        selected: null
      }
    case actions.GET_FIELDS_SUCCESS:
      return {
        ...state,
        selected: action.payload
      }
    case actions.CREATE_UPDATE_FIELDS_SUCCESS:
      return {
        ...state,
        selected: null
      }
    case actions.DESTROY_FIELDS_SUCCESS:
      return {
        ...state,
        selected: null
      }
    case actions.CLEAN_STORE_FIELDS:
      return {
        ...initValues
      }
    default:
      return state;
  }
}
