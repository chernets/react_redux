import * as actions from '../../actions/Admin/represenrations'

const initValues = {
  list: [],
  selected: null,
  isFetching: false
}
export default (state = initValues, action) => {

  switch (action.type) {
    case actions.GET_ALL_REPRESENRATIONS_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case actions.GET_ALL_REPRESENRATIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        list: action.payload
      }
    case actions.GET_REPRESENRATIONS_REQUEST:
      return {
        ...state,
        selected: null
      }
    case actions.GET_REPRESENRATIONS_SUCCESS:
      return {
        ...state,
        selected: action.payload
      }
    case actions.CREATE_UPDATE_REPRESENRATIONS_SUCCESS:
      return {
        ...state,
        selected: null
      }
    case actions.DESTROY_REPRESENRATIONS_SUCCESS:
      return {
        ...state,
        selected: null
      }
    case actions.CLEAN_STORE_REPRESENRATIONS:
      return {
        ...initValues
      }
    default:
      return state;
  }
}
