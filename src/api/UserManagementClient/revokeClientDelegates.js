import _thrift, { request, callback } from '../thrift'

let revokeClientDelegates = (token, ids) => request(_thrift.UserManagementClient.revokeClientDelegates(token, ids, callback))

export default revokeClientDelegates