import _thrift, { request, callback } from '../thrift'

let getAllUserPublicKeyInfo = (token, filter = null) => request(_thrift.UserManagementClient.getAllUserPublicKeyInfo(token, filter, callback))

export default getAllUserPublicKeyInfo