import React, { Component } from 'react';
import moment from 'moment'

class Main extends Component {
  state = {
    dateTime: moment(),
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        ...this.state,
        dateTime: moment()
      })
    }, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { dateTime = moment() } = this.state
    return (
      <div className="dashboard-header">
        <div className="dashboard_title">
          <p className="dashboard_time">{dateTime.format('HH:mm')}</p>
          <p className="dashboard_date">
            <span>{dateTime.format('DD MMMM')}</span>
            <span className="dashboard_week">{dateTime.format('dddd')}</span>
          </p>
        </div>
      </div>
    )
  }
}

export default Main;
