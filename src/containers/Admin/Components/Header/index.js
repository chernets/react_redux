import React, { Component } from 'react';
import PropTypes from 'prop-types'
class Header extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  };

  render() {
    const translate = this.context.t;
    const { label, onClick } = this.props;
    return (
      <header className="clearfix">
        <div className="create_doc-area font10 fr">
          <button className="create_doc" onClick={onClick}>
            <span>{translate(label)}</span>
          </button>
        </div>
      </header>
    )
  }
}

Header.contextTypes = {
  t: PropTypes.func.isRequired
}
export default Header;