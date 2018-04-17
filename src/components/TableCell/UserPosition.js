import React from 'react';
const UserPosition = ({ rowData }) => {
  return (
    <span>{rowData.userOrGroup.position}</span>
  )
}

export default UserPosition