import React, { Component } from 'react';
import { Field } from 'react-final-form';

const CheckBoxCell = props => {
  return (
    <div className="checkbox_block no_label">
      <input id={props.id} type='checkbox' checked={props.cellData} readOnly={props.readOnly || false}/>
      <label htmlFor={props.id}></label>
    </div>
  )
}

export default CheckBoxCell