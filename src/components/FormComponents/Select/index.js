import VirtualizedSelect from 'react-virtualized-select'
import React, { Component } from 'react';
import { Field } from 'react-final-form';
import _ from 'lodash'
import PropTypes from 'prop-types'


const Select = (props, context) => {
  return (
    <div className={`${props.meta.error && props.meta.touched ? 'error': ''}`}>
      <VirtualizedSelect options={props.options.map(item => {
        if (props.translate) item[props.labelKey] = context.t(item[props.labelKey])
        return item
      })}
        optionHeight={30}
        clearable={false}
        labelKey={props.labelKey}
        valueKey={props.valueKey}
        value={_.find(props.options, (itm) => {
          return itm[props.valueKey] === props.input.value
        })}
        disabled={props.disabled || false}
        onChange={(options) => props.input.onChange(options[props.valueKey])}
      />
    </div>
  )
}

export const SelectObj = (props, context) => {
  const hideError = props.hideError || false
  return (
    <div className={`${!hideError && props.meta.error && props.meta.touched ? 'error': ''}`}>
      <VirtualizedSelect options={props.options.map(item => {
        if (props.translate) item[props.labelKey] = context.t(item[props.labelKey])
        return item
      })}
        optionHeight={30}
        clearable={false}
        labelKey={props.labelKey}
        value={_.find(props.options, (itm) => {
          return itm.id === props.input.value.id
        })}
        disabled={props.disabled || false}
        onChange={(options) => props.input.onChange(options)}
      />
    </div>
  )
}

Select.contextTypes = {
  t: PropTypes.func.isRequired
}

SelectObj.contextTypes = {
  t: PropTypes.func.isRequired
}

export default Select