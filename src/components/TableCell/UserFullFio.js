import React from 'react';
const UserFullFio = ({ rowData }) => {
  return (
    <div className="table_person-ava">
      <span className="msg-ava">
        <img src={rowData.userOrGroup.getAvatar()} />
      </span>
      <span>{rowData.userOrGroup.getFioFull()}</span>
    </div>
  )
}

export default UserFullFio