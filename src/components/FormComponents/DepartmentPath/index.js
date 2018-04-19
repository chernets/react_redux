import React, { Component } from 'react';
import { Field } from 'react-final-form';

const DepartmentPath = props => [
  <textarea {...props.input} {...props.inputProps} key='input' value={props.input.value !== null ? props.input.value.path : props.input.value}/>,
  props.meta.error && props.meta.touched && <span key='error'>{props.meta.error}</span>
]

export default DepartmentPath