import React, { Component } from 'react';
import PropTypes from 'prop-types'
class RightTitle extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired
  };

  render() {
    const translate = this.context.t;
    const { label } = this.props;
    return (
      
        <div className="business_proc-right-top no-pointer">
          <div className="r-main_cont-tab">
            <ul className="r_tab-name">
              <li>
                <a>{translate(label)}:</a>
                <span className="r_tab-name-underline"></span>
              </li>
            </ul>
          </div>
        </div>
      
    )
  }
}

RightTitle.contextTypes = {
  t: PropTypes.func.isRequired
}
export default RightTitle;