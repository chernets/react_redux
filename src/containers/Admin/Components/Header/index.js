import React, { Component } from 'react';
import PropTypes from 'prop-types'
class Header extends Component {
  static propTypes = {
    label: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.any
  };

  render() {
    const translate = this.context.t;
    const { label, onClick, children } = this.props;
    return (
      <header className="clearfix">
        {children}
        {label !== undefined && <div className="create_doc-area font10 fr">
          <button className="create_doc" onClick={onClick}>
            <span>{translate(label)}</span>
          </button>
        </div>}
      </header>
    )
  }
}

Header.contextTypes = {
  t: PropTypes.func.isRequired
}
export default Header;