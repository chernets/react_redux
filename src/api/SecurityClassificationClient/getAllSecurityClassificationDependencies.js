import _thrift, { request, callback } from '../thrift'

let getAllSecurityClassificationDependencies = (token, id, filter = null) => request(_thrift.SecurityClassificationClient.getAllSecurityClassificationDependencies(token, id, filter, callback))

export default getAllSecurityClassificationDependencies