import _thrift, { request, callback } from '../thrift'

let removeCustomFilterItem = (token, id) => request(_thrift.FilterClient.removeCustomFilterItem(token, id, callback))

export default removeCustomFilterItem