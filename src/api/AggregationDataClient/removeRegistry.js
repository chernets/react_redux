import _thrift, { request, callback } from '../thrift'

let removeRegistry = (token, id) => request(_thrift.AggregationDataClient.removeRegistry(token, id, callback))

export default removeRegistry