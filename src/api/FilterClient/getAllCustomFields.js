import _thrift, { request, callback } from '../thrift'

let getAllCustomFields = (token, filter = null) => request(_thrift.FilterClient.getAllCustomFields(token, filter, callback))

export default getAllCustomFields