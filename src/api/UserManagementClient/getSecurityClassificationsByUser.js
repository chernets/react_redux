import _thrift, { request, callback } from '../thrift'

let getSecurityClassificationsByUser = (token, id) => request(_thrift.UserManagementClient.getSecurityClassificationsByUser(token, id, callback))

export default getSecurityClassificationsByUser