import React, { Component } from 'react';
import { Field } from 'react-final-form';

const Input = props => (
  <input {...props.input}
    readOnly={props.readOnly || false}
    className={`input${props.meta.error && props.meta.touched ? ' error' : ''}`}
    placeholder={props.placeholder}
  />
)

export default Input