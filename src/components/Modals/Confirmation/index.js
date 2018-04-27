import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import { connectModal } from 'redux-modal'
import PropTypes from 'prop-types'

class Confirmation extends Component {

  render() {
    const { show, handleHide, closeModal, desc = '' } = this.props;
    const translate = this.context.t
    return (
      <Modal show={true} onHide={handleHide}>
        <Modal.Header className="modal_header">
          <h4>{translate('CONFIRMATION')}</h4>
        </Modal.Header>
        <Modal.Body className="modal_attach clearfix">
          <div className="doc_attach-area connect_relation clearfix">
            <div className="create_doc_modal-content" style={{ maxHeight: '300px' }}>
              <p className="create_doc_modal-content-title">{desc}</p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className='modal_footer'>
          <button className="btn_cancel bord_radius3" type="button" onClick={handleHide}>{translate('CANCEL')}</button>
          <button type="button" onClick={() => {
            this.props.closeModal('YES')
            handleHide()
          }} className="btn_ok">{translate('READY')}</button>
        </Modal.Footer>
      </Modal>
    )
  }
}
Confirmation.contextTypes = {
  t: PropTypes.func.isRequired
}
export default connectModal({ name: 'confirmation', destroyOnHide: true })(Confirmation)