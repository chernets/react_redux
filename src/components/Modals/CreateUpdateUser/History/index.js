import React, { Component } from 'react';
import PropTypes from 'prop-types';

class History extends Component {
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
          <span className="create_doc_modal-content-title-bold">{translate('HISTORY')}</span>
        </div>
        <div className="create_doc_modal-content decision clearfix">

        </div>
      </React.Fragment>
    )
  }
}

History.contextTypes = {
  t: PropTypes.func.isRequired
}

export default History