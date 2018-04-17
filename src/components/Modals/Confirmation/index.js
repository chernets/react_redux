import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import { connectModal } from 'redux-modal'


class Confirmation extends Component {
  constructor() {
    super()
  }
  render() {
    const { show, handleHide } = this.props;
    return (
      <Modal show={true} onHide={handleHide}>
        <Modal.Header className="modal_header">
          <h4>
            {'SELECT_STATUS'}
          </h4>
        </Modal.Header>
      </Modal>
    )
  }
}
export default connectModal({ name: 'confirmation', destroyOnHide: true })(Confirmation)