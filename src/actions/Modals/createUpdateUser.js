import _ from 'lodash'


import {
  UserManagementClient, NotificationService, SecurityClassificationClient,
  kazFilter, filterItem, filterFieldType, filterCondition
} from '../../api'

export const CUU_ROLES_REQUEST = 'CUU_ROLES_REQUEST'
export const CUU_ROLES_SUCCESS = 'CUU_ROLES_SUCCESS'
export const CUU_ROLES_FAILURE = 'CUU_ROLES_FAILURE'


export const getRoles = (id) => {
  return async (dispatch, getState) => {
    const store = getState()
    dispatch({
      type: CUU_ROLES_REQUEST
    });
    try {
      let roles = await UserManagementClient.getRolesByUser(store.auth.token, id)
      dispatch({
        type: CUU_ROLES_SUCCESS,
        payload: _.values(_.mapKeys(roles, (value, key) => { value.name = key; return value }))
      });
    } catch (err) {
      dispatch({
        type: CUU_ROLES_FAILURE,
        payload: err
      })
    }
  }
}

export const CUU_GROUPS_REQUEST = 'CUU_GROUPS_REQUEST'
export const CUU_GROUPS_SUCCESS = 'CUU_GROUPS_SUCCESS'
export const CUU_GROUPS_FAILURE = 'CUU_GROUPS_FAILURE'

export const getAllGroups = (id) => {
  return async (dispatch, getState) => {
    const store = getState()

    dispatch({
      type: CUU_GROUPS_REQUEST
    });
    let filter = kazFilter({
      countFilter: 999,
      position: 0,
      items: []
    })
    filter.items.push(filterItem({
      field: 'userId',
      value: id,
      fType: filterFieldType.STRING,
      condition: filterCondition.EQUAL
    }))
    try {
      let groups = await UserManagementClient.getAllGroups(store.auth.token, filter)
      dispatch({
        type: CUU_GROUPS_SUCCESS,
        payload: groups
      });
    } catch (err) {
      dispatch({
        type: CUU_GROUPS_FAILURE,
        payload: err
      })
    }
  }
}

export const CUU_SC_REQUEST = 'CUU_SC_REQUEST'
export const CUU_SC_SUCCESS = 'CUU_SC_SUCCESS'
export const CUU_SC_FAILURE = 'CUU_SC_FAILURE'


export const getSecurityClassificationsByUser = (id) => {
  return async (dispatch, getState) => {
    const store = getState()
    dispatch({
      type: CUU_SC_REQUEST
    });
    try {
      let sc = await UserManagementClient.getSecurityClassificationsByUser(store.auth.token, id)
      dispatch({
        type: CUU_SC_SUCCESS,
        payload: _.values(_.mapKeys(sc, (value, key) => { value.gname = key; return value }))
      });
    } catch (err) {
      dispatch({
        type: CUU_SC_FAILURE,
        payload: err
      })
    }
  }
}

export const CUU_NTT_REQUEST = 'CUU_NTT_REQUEST'
export const CUU_NTT_SUCCESS = 'CUU_NTT_SUCCESS'
export const CUU_NTT_FAILURE = 'CUU_NTT_FAILURE'

export const getAllNotificationTransportTypes = () => {
  return async (dispatch, getState) => {
    const store = getState()
    dispatch({
      type: CUU_NTT_REQUEST
    });
    try {
      let transportTypes = await NotificationService.getAllNotificationTransportTypes(store.auth.token, null)
      dispatch({
        type: CUU_NTT_SUCCESS,
        payload: transportTypes
      });
    } catch (err) {
      dispatch({
        type: CUU_NTT_FAILURE,
        payload: err
      })
    }
  }
}

export const CUU_NC_REQUEST = 'CUU_NC_REQUEST'
export const CUU_NC_SUCCESS = 'CUU_NC_SUCCESS'
export const CUU_NC_FAILURE = 'CUU_NC_FAILURE'

export const getNotificationConfig = (id) => {
  return async (dispatch, getState) => {
    const store = getState()
    dispatch({
      type: CUU_NC_REQUEST
    });
    try {
      let config = await NotificationService.getNotificationConfig(store.auth.token, id, null)
      dispatch({
        type: CUU_NC_SUCCESS,
        payload: config
      });
    } catch (err) {
      dispatch({
        type: CUU_NC_FAILURE,
        payload: err
      })
    }
  }
}

export const CUU_LOAD_VALUES_REQUEST = 'CUU_LOAD_VALUES_REQUEST'
export const CUU_LOAD_VALUES_SUCCESS = 'CUU_LOAD_VALUES_SUCCESS'
export const CUU_LOAD_VALUES_FAILURE = 'CUU_LOAD_VALUES_FAILURE'

export const loadValues = (id = null) => {
  return async (dispatch, getState) => {
    dispatch({
      type: CUU_LOAD_VALUES_REQUEST
    });
    const store = getState()
    let filter = kazFilter({
      countFilter: 999,
      position: 0,
      items: []
    })
    filter.items.push(filterItem({
      field: 'userId',
      value: id,
      fType: filterFieldType.STRING,
      condition: filterCondition.EQUAL
    }))
    let filterDelegates = kazFilter({
      countFilter: 999,
      position: 0,
      items: []
    })
    filterDelegates.items.push(filterItem({
      field: 'clientToId',
      value: id,
      fType: filterFieldType.STRING,
      condition: filterCondition.EQUAL
    }))
    try {
      const result = await Promise.all([
        id === null ? [] : UserManagementClient.getRolesByUser(store.auth.token, id),
        id === null ? [] : UserManagementClient.getAllGroups(store.auth.token, filter),
        id === null ? [] : UserManagementClient.getSecurityClassificationsByUser(store.auth.token, id),
        NotificationService.getAllNotificationTransportTypes(store.auth.token, null),
        NotificationService.getNotificationConfig(store.auth.token, id, null),
        id === null ? [] : UserManagementClient.getAllClientDelegates(store.auth.token, filterDelegates),
      ])
      dispatch({
        type: CUU_LOAD_VALUES_SUCCESS,
        payload: {
          roles: _.values(_.mapValues(result[0], (value, key) => { value.name = key; return value })),
          groups: result[1],
          sc: _.values(_.mapValues(result[2], (value, key) => { value.gname = key; return value })),
          transportTypes: result[3],
          notification: result[4],
          delegates: result[5]
        }
      });
    } catch (err) {
      console.log(err)
    }
  }
}

export const CUU_DEFAULT_VALUES_SUCCESS = 'CUU_DEFAULT_VALUES_SUCCESS'

export const defaultValues = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: CUU_DEFAULT_VALUES_SUCCESS
    });
  }
}

export const CREATE_OR_UPDATE_REQUEST = 'CREATE_OR_UPDATE_REQUEST'
export const CREATE_OR_UPDATE_SUCCESS = 'CREATE_OR_UPDATE_SUCCESS'
export const CREATE_OR_UPDATE_FAILURE = 'CREATE_OR_UPDATE_FAILURE'

export const createOrUpdate = (values, userOrGroup, login) => {
  return async (dispatch, getState) => {
    dispatch({
      type: CREATE_OR_UPDATE_REQUEST
    });
    const store = getState()
    try {
      let requestUser = userOrGroup;
      let userList = [new UserOrGroup(userOrGroup)]
      let userIds = [userOrGroup.id]
      if (!_.isEqual(userOrGroup, values.userOrGroup) || !_.isEqual(login, values.login)) {
        requestUser = await UserManagementClient.createOrUpdateUser(store.auth.token, values.userOrGroup, values.login, null)
      }
      if (!_.isEqual(store.modalCreateUpdateUser.roles, values.roles)) { //Roles
        let removeIDs = _.difference(store.modalCreateUpdateUser.roles, values.roles).map(item => { return item.name })
        let addIDs = _.difference(values.roles, store.modalCreateUpdateUser.roles).map(item => { return item.name })
        if (removeIDs.length > 0) await UserManagementClient.revokeRolesFromUsersOrGroups(store.auth.token, userList, removeIDs)
        if (addIDs.length > 0) await UserManagementClient.addRolesToUsersOrGroups(store.auth.token, userList, addIDs)
      }
      if (!_.isEqual(store.modalCreateUpdateUser.sc, values.sc)) { //Security Classification
        let removeIDs = _.difference(store.modalCreateUpdateUser.sc, values.sc).map(item => { return item.id })
        let addIDs = _.difference(values.sc, store.modalCreateUpdateUser.sc).map(item => { return item.id })
        if (removeIDs.length > 0) await SecurityClassificationClient.removeSecurityClassificationsFromUserGroups(store.auth.token, removeIDs, userList)
        if (addIDs.length > 0) await SecurityClassificationClient.addSecurityClassificationsToUserGroups(store.auth.token, addIDs, userList)
      }
      if (!_.isEqual(store.modalCreateUpdateUser.groups, values.groups)) { //Groups
        let removeIDs = _.difference(store.modalCreateUpdateUser.groups, values.groups).map(item => { return item.id })
        let addIDs = _.difference(values.groups, store.modalCreateUpdateUser.groups).map(item => { return item.id })
        if (removeIDs.length > 0) await UserManagementClient.removeUsersFromGroups(store.auth.token, removeIDs, userIds)
        if (addIDs.length > 0) await UserManagementClient.addUsersToGroups(store.auth.token, addIDs, userIds)
      }
      if (!_.isEqual(store.modalCreateUpdateUser.notification, values.notification)) {
        await NotificationService.updateNotificationConfig(store.auth.token, userOrGroup.id, values.notification.map(item => { return new NotificationConfig(item) }))
      }
      if (!_.isEqual(store.modalCreateUpdateUser.delegates, values.delegates)) {
        let removeIDs = _.difference(store.modalCreateUpdateUser.delegates, values.delegates).map(item => { return item.id })
        let createDelegates = _.difference(values.delegates, store.modalCreateUpdateUser.delegates)
        if (removeIDs.length > 0) await UserManagementClient.revokeClientDelegates(store.auth.token, removeIDs)
        if (createDelegates.length > 0) await UserManagementClient.createOrUpdateClientDelegates(store.auth.token, userOrGroup.id, createDelegates)
      }
      dispatch({
        type: CREATE_OR_UPDATE_SUCCESS
      });
    } catch (err) {
      console.log(err)
      dispatch({
        type: CREATE_OR_UPDATE_FAILURE,
        payload: err
      });
    }

  }
}