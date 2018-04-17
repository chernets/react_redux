import _thrift, { request, callback } from '../thrift'

let getNotificationConfig = (token, id, filter = null) => request(_thrift.NotificationClient.getNotificationConfig(token, id, filter, callback))

export default getNotificationConfig