import _thrift, { request, callback } from '../thrift'

let createOrUpdateCustomFilterItem = (token, obj) => request(_thrift.FilterClient.createOrUpdateCustomFilterItem(token, obj, callback))

export default createOrUpdateCustomFilterItem