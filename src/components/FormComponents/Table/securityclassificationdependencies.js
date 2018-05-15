import React, { Component } from 'react';
import { Field } from 'react-final-form';

const SecurityClassificationDependencies = props => {
  return (
    props.input.value.map(item => {
      return (
        <span className='sc-name'  style={{fontSize: '12px', marginBottom: '5px'}} key={item.id}>{item.gname.substr(0, 3)}</span>
      )
    })
  )
}

export default SecurityClassificationDependencies