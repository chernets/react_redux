import _thrift, { request, callback } from '../thrift'

let getAllSessions = (token, filter = null) => request(_thrift.AdminClient.getAllSessions(token, filter, callback))

export default getAllSessions