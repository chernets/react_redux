import React from 'react';
const UserDepartmentName = ({ rowData }) => {
  return (
    <span>{rowData.userOrGroup.department !== null ? rowData.userOrGroup.department.name : ''}</span>
  )
}

export default UserDepartmentName