import _thrift, { request, callback } from '../thrift'

let createOrUpdateUser = (token, userOrGroup, login, password) => request(_thrift.UserManagementClient.createOrUpdateUser(token, userOrGroup, login, password, callback))

export default createOrUpdateUser