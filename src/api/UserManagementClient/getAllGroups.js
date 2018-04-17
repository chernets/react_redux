import _thrift, { request, callback } from '../thrift'

let getAllGroups = (token, filter = null) => request(_thrift.UserManagementClient.getAllGroups(token, null, filter, callback))

export default getAllGroups