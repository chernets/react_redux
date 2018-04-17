import _thrift, { request, callback } from '../thrift'

let getAllUsers = (token, filter = null) => request(_thrift.UserManagementClient.getAllUsers(token, filter, callback))

export default getAllUsers