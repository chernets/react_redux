import _thrift, { request, callback } from '../thrift'

let getAccounts = (token, filter = null) => request(_thrift.UserManagementClient.getAccounts(token, filter, callback))

export default getAccounts