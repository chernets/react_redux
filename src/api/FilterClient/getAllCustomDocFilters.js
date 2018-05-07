import _thrift, { request, callback } from '../thrift'

let getAllCustomDocFilters = (token, filter = null) => request(_thrift.FilterClient.getAllCustomDocFilters(token, filter, callback))

export default getAllCustomDocFilters