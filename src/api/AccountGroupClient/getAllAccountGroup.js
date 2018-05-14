import _thrift, { request, callback } from '../thrift'

let getAllAccountGroup = (token, filter = null) => request(_thrift.AccountGroupClient.getAllAccountGroup(token, filter, callback))

export default getAllAccountGroup