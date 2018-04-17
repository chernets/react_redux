import _thrift, { request, callback } from '../thrift'

let getAllNotificationTransportTypes = (token, filter = null) => request(_thrift.NotificationClient.getAllNotificationTransportTypes(token, filter, callback))

export default getAllNotificationTransportTypes