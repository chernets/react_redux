import * as AuthService from './AuthService'
import * as UserManagementClient from './UserManagementClient'
import * as AdminService from './AdminService'
import * as NotificationService from './NotificationService'
import * as SecurityClassificationClient from './SecurityClassificationClient'

const kazFilter = (data) => {
  return new KazFilter(data)
}

const filterItem = (data) => {
  return new FilterItem(data)
}

const filterFieldType = FilterFieldType

const filterCondition = FilterCondition
export {
  kazFilter,
  filterItem,
  filterFieldType,
  filterCondition,
  AuthService,
  AdminService,
  UserManagementClient,
  NotificationService,
  SecurityClassificationClient
}