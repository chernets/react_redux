import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Field } from 'react-final-form';


const List = (props, context) => {
  const show = props.hideMore ? props.hideMore : false
  const count = 10
  return (
    <ul className="number_list">
      {props.list.slice(0, !show ? count : props.list.length).map(itm => {
        return (
          <li key={itm}>
            <span>{itm}</span>
          </li>
        )
      })}
      {!show && props.list.length > count && <li><span>{context.t('YET')} {props.list.length - count}</span></li>}
    </ul>
  )
}
List.contextTypes = {
  t: PropTypes.func.isRequired
}
export default List