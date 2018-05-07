import * as AuthService from './AuthService'
import * as UserManagementClient from './UserManagementClient'
import * as AdminService from './AdminService'
import * as NotificationService from './NotificationService'
import * as SecurityClassificationClient from './SecurityClassificationClient'
import * as DocumentPatternClient from './DocumentPatternClient'
import * as DepartmentClient from './DepartmentClient'
import * as AggregationDataClient from './AggregationDataClient'
import * as FilterClient from './FilterClient'
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
  SecurityClassificationClient,
  DocumentPatternClient,
  DepartmentClient,
  AggregationDataClient,
  FilterClient
}