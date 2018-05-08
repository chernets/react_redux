import React, { Component } from 'react';
import { Field } from 'react-final-form';

const Input = props => {

  return (
    <div className={`checkbox_block${props.label === undefined ? ' no_label' : ''}`}>
      <input id={props.id} {...props.input} checked={props.input.value} type='checkbox' />
      <label htmlFor={props.id}>{props.label && <span>{props.label}</span>}</label>
    </div>
  )
}

export default Input