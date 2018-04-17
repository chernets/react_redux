import * as actions from '../../actions/Modals'


const initValues = {
  isFetching: false,
  allRoles: [],
  error: null
}
export default (state = initValues, action) => {
  switch (action.type) {
    case actions.changeRoles.GET_ALL_ROLES_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case actions.changeRoles.GET_ALL_ROLES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        allRoles: action.payload
      }
      case actions.changeRoles.GET_ALL_ROLES_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      }
    default:
      return state;
  }
}
