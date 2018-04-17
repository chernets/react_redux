import _thrift, { request, callback } from '../thrift'

let authenticate = (login, password, device = null, ip = null, findOpened = true, langCode = 'ru') => request(_thrift.AuthClient.authenticate(login, password, device, ip, findOpened, langCode, callback))

export default authenticate