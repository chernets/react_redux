import React, { Component } from 'react';
import { Field } from 'react-final-form';

const Input = props => {
  return [
    <input id={props.id} {...props.input} {...props.inputProps} key='input' />,
    <label htmlFor={props.id} key='label'><span>{props.label}</span></label>,
    props.meta.error && props.meta.touched && <span key='error'>{props.meta.error}</span>
  ]
}

export default Input