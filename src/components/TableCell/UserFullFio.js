import React from 'react';
const UserFullFio = ({ cellData }) => {
  return (
    <div className="table_person-ava">
      <span className="msg-ava">
        <img src={cellData.getAvatar()} />
      </span>
      <span>{cellData.getFioFull()}</span>
    </div>
  )
}

export default UserFullFio