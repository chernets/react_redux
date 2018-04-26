import _thrift, { request, callback } from '../thrift'

let getRegistryById = (token, id, rules = []) => request(_thrift.AggregationDataClient.getRegistryById(token, id, rules, callback))

export default getRegistryById