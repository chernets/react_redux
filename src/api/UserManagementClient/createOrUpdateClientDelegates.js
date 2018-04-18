import _thrift, { request, callback } from '../thrift'

let createOrUpdateClientDelegates = (token, userId, clientDelegates) => request(_thrift.UserManagementClient.createOrUpdateClientDelegates(token, userId, clientDelegates, callback))

export default createOrUpdateClientDelegates