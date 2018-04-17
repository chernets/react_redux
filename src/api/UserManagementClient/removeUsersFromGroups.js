import _thrift, { request, callback } from '../thrift'

let removeUsersFromGroups = (token, listIDs, usersOrGroups) => request(_thrift.UserManagementClient.removeUsersFromGroups(token, listIDs, usersOrGroups, callback))

export default removeUsersFromGroups