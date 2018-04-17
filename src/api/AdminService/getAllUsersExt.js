import _thrift, { request, callback } from '../thrift'

let getAllUsersExt = (token, filter = null) => request(_thrift.AdminClient.getAllUsersExt(token, filter, callback))

export default getAllUsersExt