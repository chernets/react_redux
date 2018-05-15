import _thrift, { request, callback } from '../thrift'

let removeSecurityClassification = (token, id) => request(_thrift.SecurityClassificationClient.removeSecurityClassification(token, id, callback))

export default removeSecurityClassification