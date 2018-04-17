import _thrift, { request, callback } from '../thrift'

let addSecurityClassificationsToUserGroups = (token, listIDs, usersOrGroups) => request(_thrift.SecurityClassificationClient.addSecurityClassificationsToUserGroups(token, listIDs, usersOrGroups, callback))

export default addSecurityClassificationsToUserGroups