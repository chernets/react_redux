import _thrift, { request, callback } from '../thrift'

let getAllDepartments = (token, filter = null) => request(_thrift.DepartmentClient.getAllDepartments(token, filter, callback))

export default getAllDepartments