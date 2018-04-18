import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment'


class CustomInput extends React.Component {

  render() {
    return (
      <span className="calendar-area">
        <input {...this.props} />
      </span>
    )
  }
}

class DateTime extends Component {

  render() {
    const { input, meta,
      showTimeSelect = true, dateFormat = 'DD.MM.YYYY HH:mm', minDate,
      maxDate, maxTime, isClearable = true,
      placeholder = 'SELECT_DATE'
    } = this.props
    const translate = this.context.t
    let params = {}
    if (minDate) {
      params.minDate = moment(minDate)
    }
    if (maxDate) {
      params.maxDate = moment(maxDate)
    }
    if (minDate && (maxTime || maxDate)) {
      let max = maxTime || maxDate
      params.minTime = moment(minDate).format('DD.MM.YYYY') === moment(input.value).format('DD.MM.YYYY') ? moment(minDate).add(1, 'minutes') : moment(input.value).startOf('day')
      params.maxTime = moment(max).format('DD.MM.YYYY') === moment(input.value).format('DD.MM.YYYY') ? moment(max).subtract(1, 'minutes') : moment(input.value).endOf('day')
    }
    return [
      <DatePicker key='datePicker'
        customInput={<CustomInput />}
        className="calendar input bord_radius2"
        placeholderText={translate(placeholder)}
        selected={input.value === -1 || input.value === null || input.value === '' ? null : moment(input.value)}
        showTimeSelect={showTimeSelect}
        timeFormat="HH:mm"
        dateFormat={dateFormat}
        onChange={(dateTime) => {
          input.onChange(dateTime)
        }}
        onKeyDown={e => {
          e.preventDefault()
        }}
        isClearable={isClearable}
        {...params}
      />,
      meta.error && meta.touched && <span key='error'>{meta.error}</span>
    ]
  }
}

DateTime.contextTypes = {
  t: PropTypes.func.isRequired
}


export default DateTime