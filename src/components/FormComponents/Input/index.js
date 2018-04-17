import React, { Component } from 'react';
import { Field } from 'react-final-form';

const Input = props => [
  <input {...props.input} {...props.inputProps} key='input'/>,
  props.meta.error && props.meta.touched && <span key='error'>{props.meta.error}</span>
]

export default Input