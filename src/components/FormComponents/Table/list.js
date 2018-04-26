import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Field } from 'react-final-form';


const List = (props, context) => {
  return (
    <ul className="number_list">
      {props.list.slice(0, 10).map(itm => {
        return (
          <li key={itm}>
            <span>{itm}</span>
          </li>
        )
      })}
      {props.list.length > 10 && <li><span>{context.t('YET')} {props.list.length - 10}</span></li>}
    </ul>
  )
}
List.contextTypes = {
  t: PropTypes.func.isRequired
}
export default List