import _thrift, { request, callback } from '../thrift'

let registerExternalModule = (token, url, user, userName, password) => request(_thrift.AdminClient.registerExternalModule(token, url, user, userName, password, callback))

export default registerExternalModule