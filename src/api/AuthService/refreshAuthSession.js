import _thrift, { request, callback } from '../thrift'

let refreshAuthSession = (token) => request(_thrift.AuthClient.refreshAuthSession(token, callback))

export default refreshAuthSession