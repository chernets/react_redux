import React from 'react';
const CreateCell = (props) => {
  return (
    <span onClick={props.onClick} className="add_digest-tr">+</span>
  )
}

export default CreateCell