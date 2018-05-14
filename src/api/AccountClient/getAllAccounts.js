import _thrift, { request, callback } from '../thrift'

let getAllAccounts = (token, filter = null) => request(_thrift.AccountClient.getAllAccounts(token, filter, callback))

export default getAllAccounts