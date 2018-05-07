import _thrift, { request, callback } from '../thrift'

let removeCustomField = (token, id) => request(_thrift.FilterClient.removeCustomField(token, id, callback))

export default removeCustomField