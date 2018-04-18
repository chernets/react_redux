import * as actions from '../../actions/Modals'


const initValues = {
  name: 'ADD_REMOVE_USERS',  //название окна
  showUsers: true,
  showGroups: true,
  showSecurityClassification: false,
  multiSelect: true,
  useBpmRoles: false,
  userOrGroupsSelected: [],
  userOrGroupsIgnored: [],
  userOrGroupsFixed: [],
  securityClassificationSelected: [],
  securityClassificationFixed: [],
  accounts: [],
  userDoNotHasGroups: false,
  profileUserEdit: null,
  patternId: null,
  docPatternStageActionType: null,
  viewType: 'USERS',
  searchText: '',
  isFetching: false,
  allUserOrGroups: [],
  bpmRoles: [],
  error: null
}
export default (state = initValues, action) => {
  switch (action.type) {

    case actions.changeUserOrGroups.SHOW_CHANGE_USER_OR_GROUPS:
      return {
        ...state,
        ...action.payload
      }
    case actions.changeUserOrGroups.GET_ALL_USERS_OR_GROUPS_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case actions.changeUserOrGroups.GET_ALL_USERS_OR_GROUPS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        allUserOrGroups: action.payload.allUserOrGroups,
        bpmRoles: action.payload.bpmRoles
      }
    case actions.changeUserOrGroups.GET_ALL_USERS_OR_GROUPS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      }
    case actions.changeUserOrGroups.SEARCH_USERS_OR_GROUPS:
      return{
        ...state,
        searchText: action.payload,
        allUserOrGroups: []
      }
    case actions.changeUserOrGroups.GET_CLEAN_STORE_USERS_OR_GROUPS_REQUEST:
      return {
        ...initValues
      }
    default:
      return state;
  }
}
