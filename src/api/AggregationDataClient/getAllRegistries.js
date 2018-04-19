import _thrift, { request, callback } from '../thrift'

let getAllRegistries = (token, filter = null, admin = false) => request(_thrift.AggregationDataClient.getAllRegistries(token, filter, admin, callback))

export default getAllRegistries