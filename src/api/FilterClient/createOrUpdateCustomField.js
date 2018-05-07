import _thrift, { request, callback } from '../thrift'

let createOrUpdateCustomField = (token, obj) => request(_thrift.FilterClient.createOrUpdateCustomField(token, obj, callback))

export default createOrUpdateCustomField