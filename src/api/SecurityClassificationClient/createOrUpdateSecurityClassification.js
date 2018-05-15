import _thrift, { request, callback } from '../thrift'

let createOrUpdateSecurityClassification = (token, obj) => request(_thrift.SecurityClassificationClient.createOrUpdateSecurityClassification(token, obj, callback))

export default createOrUpdateSecurityClassification