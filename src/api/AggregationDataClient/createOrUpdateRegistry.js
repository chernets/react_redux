import _thrift, { request, callback } from '../thrift'

let createOrUpdateRegistry = (token, register, userList, accList) => request(_thrift.AggregationDataClient.createOrUpdateRegistry(token, register, userList, accList, callback))

export default createOrUpdateRegistry