import _thrift, { request, callback } from '../thrift'

let removeSecurityClassificationsFromUserGroups = (token, listIDs, usersOrGroups) => request(_thrift.SecurityClassificationClient.removeSecurityClassificationsFromUserGroups(token, listIDs, usersOrGroups, callback))

export default removeSecurityClassificationsFromUserGroups