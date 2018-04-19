import * as actions from '../../actions/Admin/registries'

const initValues = {
  list: [],
  selected: null,
  isFetching: false
}
export default (state = initValues, action) => {

  switch (action.type) {
    case actions.GET_ALL_REGISTRIES_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case actions.GET_ALL_REGISTRIES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        list: action.payload
      }
    case actions.CLEAN_STORE_REGISTRIES:
      return {
        ...initValues
      }
    default:
      return state;
  }
}
