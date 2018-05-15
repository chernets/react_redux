import _thrift, { request, callback } from '../thrift'

let removeSecurityClassificationDependencies = (token, id, iDs) => request(_thrift.SecurityClassificationClient.removeSecurityClassificationDependencies(token, id, iDs, callback))

export default removeSecurityClassificationDependencies