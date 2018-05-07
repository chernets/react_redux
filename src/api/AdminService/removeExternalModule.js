import _thrift, { request, callback } from '../thrift'

let removeExternalModule = (token, id, password) => request(_thrift.AdminClient.removeExternalModule(token, id, password, callback))

export default removeExternalModule