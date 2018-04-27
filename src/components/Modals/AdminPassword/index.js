import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import { connectModal } from 'redux-modal'
import PropTypes from 'prop-types'

class AdminPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      password: ''
    }
  }
  render() {
    const { show, handleHide, closeModal, desc = '' } = this.props;
    const translate = this.context.t
    return (
      <Modal show={true} onHide={handleHide}>
        <Modal.Header className="modal_header">
          <h4>{translate('ADMINISTRATOR_PASSWORD')}</h4>
        </Modal.Header>
        <Modal.Body className="modal_attach clearfix">
          <div className="doc_attach-area clearfix">
            <div className="create_doc_modal-content">
              <div className="column_content">
                <span className="create_doc_modal-content-title">{translate('PASSWORD')}</span>
                <div className="key-sec_pass">
                  <input type="password" value={this.state.password} onChange={e => this.setState({ password: e.target.value })} className="input bord_radius3" />
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className='modal_footer'>
          <button className="btn_cancel bord_radius3" type="button" onClick={handleHide}>{translate('CANCEL')}</button>
          <button disabled={this.state.password.length === 0} type="button" onClick={() => {
            this.props.closeModal(this.state.password)
            handleHide()
          }} className="btn_ok">{translate('CONFIRM')}</button>
        </Modal.Footer>
      </Modal>
    )
  }
}
AdminPassword.contextTypes = {
  t: PropTypes.func.isRequired
}
export default connectModal({ name: 'adminPassword', destroyOnHide: true })(AdminPassword)