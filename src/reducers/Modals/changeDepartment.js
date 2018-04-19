import * as actions from '../../actions/Modals'


const initValues = {
  isFetching: false,
  allDepartments: [],
  searchText: '',
  error: null
}
export default (state = initValues, action) => {
  switch (action.type) {
    case actions.changeDepartment.GET_ALL_DEPARTMENTS_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case actions.changeDepartment.GET_ALL_DEPARTMENTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        allDepartments: action.payload
      }
    case actions.changeDepartment.GET_ALL_DEPARTMENTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      }
    case actions.changeDepartment.SEARCH_DEPARTMENTS:
      return {
        ...state,
        searchText: action.payload,
        allDepartments: []
      }
      case actions.changeDepartment.GET_CLEAN_STORE_DEPARTMENTS:
      return {
        ...initValues
      }
    default:
      return state;
  }
}
