import _thrift, { request, callback } from '../thrift'

let getCountAllUsersExt = (token, filter = null) => request(_thrift.AdminClient.getCountAllUsersExt(token, filter, callback))

export default getCountAllUsersExt