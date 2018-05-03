

import _thrift, { request, callback } from '../thrift'

let confirmUserPublicKey = (token, id, confirm) => request(_thrift.AdminClient.confirmUserPublicKey(token, id, confirm, callback))

export default confirmUserPublicKey