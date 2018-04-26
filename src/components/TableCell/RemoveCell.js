import React from 'react';
const RemoveCell = (props) => {
  return (
    <span onClick={props.onClick}><i style={{fontSize: '14px'}} className="fa fa-trash-o" aria-hidden="true"></i></span>
  )
}

export default RemoveCell