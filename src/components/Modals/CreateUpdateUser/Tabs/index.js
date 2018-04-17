import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Certificate extends Component {
  constructor(props) {
    super(props)
  }

  // shouldComponentUpdate(nextProps) {
  //   return !_.isEqual(nextProps.sc, this.props.sc)
  // }

  render() {
    const translate = this.context.t
    const { tabs, activeTab, handleUpdate } = this.props
    return (
      <div className="r-main_cont-tab fr">
        <ul className="r_tab-name">
          {_.filter(tabs, { visible: true }).map(tab => {
            return (
              <li className={`${activeTab === tab.name ? 'r_tab-name-active' : ''}`}
                onClick={() => handleUpdate(tab)}
                key={tab.name}
              >
                <a>{translate(tab.name)}</a>
                <span className="r_tab-name-underline"></span>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

Certificate.contextTypes = {
  t: PropTypes.func.isRequired
}

export default Certificate