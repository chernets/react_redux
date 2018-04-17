import _thrift, { request, callback } from '../thrift'

let revokeRolesFromUsersOrGroups = (token, usersOrGroups, listIDs) => request(_thrift.UserManagementClient.revokeRolesFromUsersOrGroups(token, usersOrGroups, listIDs, callback))

export default revokeRolesFromUsersOrGroups