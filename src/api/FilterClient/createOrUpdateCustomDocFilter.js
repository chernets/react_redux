import _thrift, { request, callback } from '../thrift'

let createOrUpdateCustomDocFilter = (token, filter, customFilterItems, filterFieldsWithPosition) => request(_thrift.FilterClient.createOrUpdateCustomDocFilter(token, filter, customFilterItems, filterFieldsWithPosition, callback))

export default createOrUpdateCustomDocFilter