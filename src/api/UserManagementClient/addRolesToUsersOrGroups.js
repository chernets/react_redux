import _thrift, { request, callback } from '../thrift'

let addRolesToUsersOrGroups = (token, usersOrGroups, listIDs) => request(_thrift.UserManagementClient.addRolesToUsersOrGroups(token, usersOrGroups, listIDs, callback))

export default addRolesToUsersOrGroups