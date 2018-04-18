import VirtualizedSelect from 'react-virtualized-select'
import React, { Component } from 'react';
import { Field } from 'react-final-form';
import _ from 'lodash'
import PropTypes from 'prop-types'


const Select = (props, context) => {
  return (
    <VirtualizedSelect options={props.options.map(item => {
        if(props.translate) item[props.labelKey] = context.t(item[props.labelKey])
        return item
      })}
      optionHeight={30}
      clearable={false}
      labelKey={props.labelKey}
      valueKey={props.valueKey}
      value={_.find(props.options, (itm) => {
        return itm[props.valueKey] === props.input.value
      })}
      onChange={(options) => props.input.onChange(options[props.valueKey])}
    />
  )
}

Select.contextTypes = {
  t: PropTypes.func.isRequired
}

export default Select