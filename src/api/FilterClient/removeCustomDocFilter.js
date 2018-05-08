import _thrift, { request, callback } from '../thrift'

let removeCustomDocFilter = (token, id) => request(_thrift.FilterClient.removeCustomDocFilter(token, id, callback))

export default removeCustomDocFilter