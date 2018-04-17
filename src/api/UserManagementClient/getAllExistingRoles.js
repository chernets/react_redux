import _thrift, { request, callback } from '../thrift'

let getAllExistingRoles = (token, filter = null) => request(_thrift.UserManagementClient.getAllExistingRoles(token, filter, callback))

export default getAllExistingRoles