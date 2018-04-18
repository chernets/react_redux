import React from 'react';
const DepartmentName = ({ cellData }) => {
  return (
    <span>{cellData !== null ? cellData.name : ''}</span>
  )
}

export default DepartmentName