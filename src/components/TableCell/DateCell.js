import React from 'react';
import moment from 'moment'
const DateCell = ({format= 'DD.MM.YYYY', cellData}) => {
  return (
    <span>
      {moment(cellData).format(format)}
    </span>
  )
}

export default DateCell