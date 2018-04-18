import _thrift, { request, callback } from '../thrift'

let getPatternProcessRoles = (token, id, filter = null) => request(_thrift.DocumentPatternClient.getPatternProcessRoles(token, id, filter, callback))

export default getPatternProcessRoles