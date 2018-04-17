import React, { Component } from 'react';
import { Field } from 'react-final-form';

const TextArea = props => [
  <textarea {...props.input} {...props.inputProps} key='input'/>,
  props.meta.error && props.meta.touched && <span key='error'>{props.meta.error}</span>
]

export default TextArea