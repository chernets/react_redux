import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Delegates extends Component {
  constructor(props) {
    super(props)
  }

  // shouldComponentUpdate(nextProps) {
  //   return !_.isEqual(nextProps.sc, this.props.sc)
  // }

  render() {
    const translate = this.context.t
    return (
      <React.Fragment>
        <div className="create_doc_modal-header decision">
          <span className="create_doc_modal-content-title-bold">{translate('DELEGATION')}</span>
        </div>
        <div className="create_doc_modal-content decision clearfix">

        </div>
      </React.Fragment>
    )
  }
}

Delegates.contextTypes = {
  t: PropTypes.func.isRequired
}

export default Delegates