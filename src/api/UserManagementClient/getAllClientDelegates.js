import _thrift, { request, callback } from '../thrift'

let getAllClientDelegates = (token, filter = null) => request(_thrift.UserManagementClient.getAllClientDelegates(token, filter, callback))

export default getAllClientDelegates