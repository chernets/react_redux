import { URL, CORE } from '../constant/server'

const _thrift = {
  'AuthClient': new window.AuthServiceClient(new window.Thrift.Protocol(new window.Thrift.Transport(`${URL}${CORE}thrift/auth-json`))),
  'UserManagementClient' : new window.UserManagementServiceClient(new window.Thrift.Protocol(new window.Thrift.Transport(`${URL}${CORE}thrift/user-management-json`))),
  'AdminClient' : new window.AdminServiceClient(new window.Thrift.Protocol(new window.Thrift.Transport(`${URL}${CORE}thrift/admin-json`))),
  'NotificationClient' : new window.NotificationServiceClient(new window.Thrift.Protocol(new window.Thrift.Transport(`${URL}${CORE}thrift/notification-json`))),
  'SecurityClassificationClient' : new window.SecurityClassificationServiceClient(new window.Thrift.Protocol(new window.Thrift.Transport(`${URL}${CORE}thrift/securityClassification-json`))),
}

export const request = (fn) => {
  return new Promise((resolve, reject) => {
    fn
      .fail((jqXHR, status, error) => {
        if (jqXHR.status === 404) reject(jqXHR)
        reject(error)
      })
      .done((result) => {
        resolve(result)
      })
      .always(() => { });
  })
}

export const callback = () => {}

export default _thrift 