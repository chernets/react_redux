import React, { Component } from 'react';
import PropTypes from 'prop-types'
class RightTitle extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    show: PropTypes.bool,
    toogleShow: PropTypes.func
  };

  render() {
    const translate = this.context.t;
    const { label, toogleShow = null, show = false } = this.props;
    return (
      <div className={`business_proc-right-top${toogleShow !== null ? '' : ' no-pointer'}${show ? ' open' : ''}`} onClick={toogleShow}>
        <div className="r-main_cont-tab">
          <ul className={`r_tab-name ${toogleShow === null ? '' : ' r_tab-arr'}`}>
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