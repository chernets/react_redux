import _thrift, { request, callback } from '../thrift'

let getAllSecurityClassification = (token, filter = null) => request(_thrift.SecurityClassificationClient.getAllSecurityClassification(token, filter, callback))

export default getAllSecurityClassification