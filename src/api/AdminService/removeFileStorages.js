
import _thrift, { request, callback } from '../thrift'

let removeFileStorages = (token, ids, password) => request(_thrift.AdminClient.removeFileStorages(token, ids, password, callback))

export default removeFileStorages