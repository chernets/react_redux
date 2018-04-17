import _thrift, { request, callback } from '../thrift'

let getInfo = () => request(_thrift.AuthClient.getInfo(callback))

export default getInfo