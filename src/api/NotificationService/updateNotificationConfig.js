import _thrift, { request, callback } from '../thrift'

let updateNotificationConfig = (token, id, notification) => request(_thrift.NotificationClient.updateNotificationConfig(token, id, notification, callback))

export default updateNotificationConfig