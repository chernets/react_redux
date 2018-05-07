import _thrift, { request, callback } from '../thrift'

let getAllExternalModules = (token, filter = null) => request(_thrift.AdminClient.getAllExternalModules(token, filter, callback))

export default getAllExternalModules