import React, { Component } from 'react';
import { Field } from 'react-final-form'
import { ACCOUNTS_COUNT_FILTER } from '../../../../constant/variables';
class NotificationCheckBox extends Component {
  constructor(props) {
    super(props)
  }


  shouldComponentUpdate(nextProps) {
    if (nextProps.rowData.selectedForUser[nextProps.columnData.key] !== this.props.rowData.selectedForUser[this.props.columnData.key]) {
      return true
    }
    return false
  }

  render() {
    const { columnData, rowData, rowIndex } = this.props
    return (
      <Field name={`notification[${rowIndex}].selectedForUser.${columnData.key}`} type='checkbox' component={(props) => {
        return (
          <div className="checkbox_block no_label">
            <input id={columnData.key + rowData.key} type='checkbox' {...props.input} disabled={!rowData.allowedForUser[columnData.key]} />
            <label htmlFor={columnData.key + rowData.key}></label>
          </div>
        )
      }} />
    )
  }
}

export default NotificationCheckBox