import React, { Component } from 'react';
import PropTypes from 'prop-types'
class RightBody extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired
  };

  render() {
    const translate = this.context.t;
    const { children } = this.props;
    return (
      <div className="business_proc-right-area" style={{height: 'calc(100% - 115px)', overflowY: 'scroll'}}>
        <div className="main-r-block">
          <div className="stage_main-block my_super_class">
            <div className="business_proc-right-contant">
              {children}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

RightBody.contextTypes = {
  t: PropTypes.func.isRequired
}
export default RightBody;