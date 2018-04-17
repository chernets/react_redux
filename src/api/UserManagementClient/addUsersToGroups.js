import _thrift, { request, callback } from '../thrift'

let addUsersToGroups = (token, listIDs, usersOrGroups) => request(_thrift.UserManagementClient.addUsersToGroups(token, listIDs, usersOrGroups, callback))

export default addUsersToGroups