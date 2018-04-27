

import _thrift, { request, callback } from '../thrift'

let createOrUpdateFileStorage = (token, fileStorage, password, accId) => request(_thrift.AdminClient.createOrUpdateFileStorage(token, fileStorage, password, accId, callback))

export default createOrUpdateFileStorage