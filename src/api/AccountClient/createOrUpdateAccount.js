import _thrift, { request, callback } from '../thrift'

let createOrUpdateAccount = (token, account) => request(_thrift.AccountClient.createOrUpdateAccount(token, account, callback))

export default createOrUpdateAccount