import React, { Component } from 'react';
import PropTypes from 'prop-types'
class RightFooter extends Component {
  static propTypes = {
    disabled: PropTypes.bool.isRequired
  };

  render() {
    const translate = this.context.t;
    const { disabled = false } = this.props;
    return (
      <div className="business_proc-btn">
        <div className="btn_select">
          <span className={`btn_select-text ${disabled ? 'disabled' : ''}`}>{translate('SAVE')}</span>
        </div>
      </div>
    )
  }
}

RightFooter.contextTypes = {
  t: PropTypes.func.isRequired
}
export default RightFooter;