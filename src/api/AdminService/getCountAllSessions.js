import _thrift, { request, callback } from '../thrift'

let getCountAllSessions = (token, filter = null) => request(_thrift.AdminClient.getCountAllSessions(token, filter, callback))

export default getCountAllSessions