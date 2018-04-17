import VirtualizedSelect from 'react-virtualized-select'
import React, { Component } from 'react';
import { Field } from 'react-final-form';
import _ from 'lodash'
import PropTypes from 'prop-types'


const Select = (props, context) => {
  return (
    <VirtualizedSelect options={props.options.map(item => {
        if(props.translate) item.name = context.t(item.name)
        return item
      })}
      optionHeight={30}
      clearable={false}
      labelKey={props.showKey}
      valueKey={props.showKey}
      value={_.find(props.options, { value: props.input.value })}
      onChange={(options) => props.input.onChange(options.value)}
    />
  )
}

Select.contextTypes = {
  t: PropTypes.func.isRequired
}

export default Select