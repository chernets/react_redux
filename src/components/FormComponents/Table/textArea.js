import React, { Component } from 'react';
import { Field } from 'react-final-form';

const TextArea = props => (
  <textarea {...props.input}
    readOnly={props.readOnly || false}
    className={`textarea${props.meta.error && props.meta.touched ? ' error' : ''}`}
    placeholder={props.placeholder}
  />
)

export default TextArea