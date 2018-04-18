import _ from 'lodash'
import { show } from 'redux-modal'
import {
  UserManagementClient, DocumentPatternClient,
  kazFilter, filterItem, filterFieldType, filterCondition
} from '../../api'

export const SHOW_CHANGE_USER_OR_GROUPS = 'SHOW_CHANGE_USER_OR_GROUPS'

export const showModal = ({ showUsers = true, showGroups = true, showSecurityClassification = false,
  multiSelect = true, useBpmRoles = false, userOrGroupsSelected = [], userOrGroupsIgnored = [],
  userOrGroupsFixed = [], securityClassificationSelected = [], securityClassificationFixed = [],
  accounts = [], userDoNotHasGroups = false, profileUserEdit = null, patternId = null,
  docPatternStageActionType = null, name = 'ADD_REMOVE_USERS', cb
}) => {
  return async (dispatch, getState) => {
    const store = getState()
    dispatch({
      type: SHOW_CHANGE_USER_OR_GROUPS,
      payload: {
        name,
        showUsers,
        showGroups,
        showSecurityClassification,
        multiSelect,
        useBpmRoles,
        userOrGroupsSelected,
        userOrGroupsIgnored,
        userOrGroupsFixed,
        securityClassificationSelected,
        securityClassificationFixed,
        accounts: accounts.length === 0 ? store.auth.accounts : accounts,
        userDoNotHasGroups,
        profileUserEdit,
        patternId: null,
        docPatternStageActionType,
        viewType: showUsers ? 'USERS' : 'GROUPS'
      }
    });

    dispatch(show('changeUserOrGroups', {
      closeModal: cb
    }))
  }
}


export const GET_ALL_USERS_OR_GROUPS_REQUEST = 'GET_ALL_USERS_OR_GROUPS_REQUEST'
export const GET_ALL_USERS_OR_GROUPS_SUCCESS = 'GET_ALL_USERS_OR_GROUPS_SUCCESS'
export const GET_ALL_USERS_OR_GROUPS_FAILURE = 'GET_ALL_USERS_OR_GROUPS_FAILURE'

export const getAllUsersOrGroups = (firstLoad = false) => {
  return async (dispatch, getState) => {
    const store = getState()
    dispatch({
      type: GET_ALL_USERS_OR_GROUPS_REQUEST
    });
    let filter = kazFilter({
      countFilter: 25,
      position: store.modalChangeUserOrGroups.allUserOrGroups.length,
      orders: ['alphabetical'],
      items: []
    })
    if (store.modalChangeUserOrGroups.profileUserEdit !== null &&
      store.modalChangeUserOrGroups.userDoNotHasGroups &&
      store.modalChangeUserOrGroups.viewType !== 'USERS'
    ) {
      filter.items.push(filterItem({
        field: 'userDoNotHasGroups',
        value: store.modalChangeUserOrGroups.profileUserEdit,
        fType: filterFieldType.STRING,
        condition: filterCondition.EQUAL
      }))
    }
    try {
      let allUserOrGroups = null;
      let bpmRoles = firstLoad && store.modalChangeUserOrGroups.patternId !== null ? await DocumentPatternClient.getPatternProcessRoles(store.auth.token, store.modalChangeUserOrGroups.patternId, null) : []
      if (store.modalChangeUserOrGroups.viewType === 'USERS') {
        allUserOrGroups = await UserManagementClient.getAllUsers(store.auth.token, filter)
      } else {
        allUserOrGroups = await UserManagementClient.getAllGroups(store.auth.token, filter)
      }
      dispatch({
        type: GET_ALL_USERS_OR_GROUPS_SUCCESS,
        payload: {
          bpmRoles: bpmRoles.map(item => {
            return new UserOrGroup({
              id: item.key,
              userOrGroupId: item.key,
              userFirstName: item.name,
              type: 0
            })
          }),
          allUserOrGroups: [...store.modalChangeUserOrGroups.allUserOrGroups, ...allUserOrGroups]
        }
      });
    } catch (err) {
      dispatch({
        type: GET_ALL_USERS_OR_GROUPS_FAILURE,
        payload: err
      })
    }
  }
}

export const GET_CLEAN_STORE_USERS_OR_GROUPS_REQUEST = 'GET_CLEAN_STORE_USERS_OR_GROUPS_REQUEST'

export const cleanStore = () => {
  return async dispatch => {
    dispatch({
      type: GET_CLEAN_STORE_USERS_OR_GROUPS_REQUEST
    })
  }
}