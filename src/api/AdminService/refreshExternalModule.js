import _thrift, { request, callback } from '../thrift'

let refreshExternalModule = (token, id) => request(_thrift.AdminClient.refreshExternalModule(token, id, callback))

export default refreshExternalModule