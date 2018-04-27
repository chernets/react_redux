import _thrift, { request, callback } from '../thrift'

let getAllFileStorages = (token, filter = null) => request(_thrift.AdminClient.getAllFileStorages(token, filter, callback))

export default getAllFileStorages