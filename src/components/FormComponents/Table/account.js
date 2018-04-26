import React, { Component } from 'react';
import { Field } from 'react-final-form';

const Account = props => {
  return (
    <div className="checkbox_block no_label">
      <input id={props.id} {...props.input}
        checked={props.checked}
        type='checkbox'
        onChange={props.onChange}
      />
      <label htmlFor={props.id}><span>{props.label}</span></label>
    </div>
  )
}

export default Account