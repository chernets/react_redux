import _thrift, { request, callback } from '../thrift'

let getRolesByUser = (token, id) => request(_thrift.UserManagementClient.getRolesByUser(token, id, callback))

export default getRolesByUser