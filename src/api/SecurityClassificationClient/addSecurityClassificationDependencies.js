import _thrift, { request, callback } from '../thrift'

let addSecurityClassificationDependencies = (token, id, iDs) => request(_thrift.SecurityClassificationClient.addSecurityClassificationDependencies(token, id, iDs, callback))

export default addSecurityClassificationDependencies