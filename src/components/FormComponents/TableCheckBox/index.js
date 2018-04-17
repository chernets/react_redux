import React, { Component } from 'react';
import { Field } from 'react-final-form';

const TableCheckBox = props => {
  console.log(props)
  return (
    <div className="checkbox_block no_label">
      <input id={props.id} {...props.input} {...props.inputProps} />
      <label htmlFor={props.id}><span>{props.label}</span></label>
    </div>
  )
}

export default TableCheckBox