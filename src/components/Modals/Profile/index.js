import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'react-bootstrap'
import { connectModal } from 'redux-modal'

import { Form, Field } from 'react-final-form'
import Input from '../../FormComponents/Input'
import TextArea from '../../FormComponents/TextArea'

import { hasRole } from '../../../utils/roles'
class Profile extends Component {
  constructor() {
    super()
  }
  validateForm(values) {
    const errors = {};
    if (!values.userLastName || values.email === '') {
      errors.userLastName = this.context.t('REQUIRED_FOR_INPUT')
    }
    if (!values.email || values.email === '') {
      errors.email = this.context.t('REQUIRED_FOR_INPUT')
    }
    if (!values.department || values.department === '') {
      errors.department = this.context.t('REQUIRED_FOR_INPUT')
    }
    return errors
  }

  render() {
    const { show, handleHide, userOrGroup, disabledEdit } = this.props;
    const translate = this.context.t
    return (
      <Modal show={show} onHide={handleHide} bsSize="large">
        <Modal.Header className="modal_header create-edit-document clearfix" >
          <h4 className='fl'>{translate('VIEW_USER')}</h4>
        </Modal.Header>
        <Form
          validate={this.validateForm.bind(this)}
          initialValues={userOrGroup}
          onSubmit={submittedValues => {
            handleHide()
            this.props.closeModal(submittedValues)
          }}
          render={({ handleSubmit, reset, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit} noValidate>
              <Modal.Body className="modal_attach">
                <div className="user-profile_wrap">
                  <div className="create_doc_modal-content decision user-profile-info" style={{ marginTop: '30px' }}>
                    <div className="clearfix">
                      <div className="column_content fl">
                        <div className="user_profile-ava ">
                          <div className="msg-ava camera">
                            {!disabledEdit && <i className="fa fa-camera"></i>}
                            <img src={userOrGroup.getAvatar()} />
                          </div>
                        </div>
                      </div>
                      {!disabledEdit && hasRole('USER_PASSWORD_UPDATE') && <div className="column_content user_profile-cred fl">
                        <div className="clearfix">
                          <div className="user_profile-cred-fio fl"></div>
                          <div className="fr">
                            <button type="button"
                              className="btn_cancel btn_edit btn_auto-width"
                              style={{ marginLeft: '15px' }}>
                              {translate('CHANGE_PASSWORD_1')}
                            </button>
                          </div>
                        </div>
                      </div>}
                    </div>
                  </div>
                  <div className="create_doc_modal-content decision clearfix">
                    <div className="column fl">
                      <div className="column_content">
                        <span className="create_doc_modal-content-title">{translate('SURNAME')}*</span>
                        <Field
                          name="userLastName"
                          component={Input}
                          type='text'
                          inputProps={{
                            className: "input bord_radius3",
                            readOnly: disabledEdit
                          }}
                        />
                      </div>
                    </div>
                    <div className="column fr">
                      <div className="column_content">
                        <span className="create_doc_modal-content-title">{translate('FIRST_NAME')}</span>
                        <Field
                          name="userFirstName"
                          className="input bord_radius3"
                          component={Input}
                          type="text"
                          inputProps={{
                            className: "input bord_radius3",
                            readOnly: disabledEdit
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="create_doc_modal-content decision clearfix">
                    <div className="column fl">
                      <div className="column_content">
                        <span className="create_doc_modal-content-title">{translate('MIDDLE_NAME')}</span>
                        <Field
                          name="userMiddleName"
                          component={Input}
                          type='text'
                          inputProps={{
                            className: "input bord_radius3",
                            readOnly: disabledEdit
                          }}
                        />
                      </div>
                    </div>
                    <div className="column fr">
                      <div className="column_content">
                        <span className="create_doc_modal-content-title">{translate('EMAIL')}*</span>
                        <Field
                          name="email"
                          className="input bord_radius3"
                          component={Input}
                          type="text"
                          inputProps={{
                            className: "input bord_radius3",
                            readOnly: disabledEdit
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="create_doc_modal-content decision clearfix">
                    <div className="column fl">
                      <div className="column_content">
                        <span className="create_doc_modal-content-title">{translate('POSITION_USER')}</span>
                        <Field
                          name="position"
                          component={Input}
                          type='text'
                          inputProps={{
                            className: "input bord_radius3",
                            readOnly: disabledEdit
                          }}
                        />
                      </div>
                      <div className="column_content" style={{ marginTop: '10px' }}>
                        <span className="create_doc_modal-content-title">{translate('WORK_PHONE')}</span>
                        <Field
                          name="workPhone"
                          component={Input}
                          type='text'
                          inputProps={{
                            className: "input bord_radius3",
                            readOnly: disabledEdit
                          }}
                        />
                      </div>
                    </div>
                    <div className="column fr">
                      <div className="column_content">
                        <span className="create_doc_modal-content-title">{translate('STRUCTURAL_SUBDIVISION')}*</span>
                        <Field
                          name="department.path"
                          className="input bord_radius3"
                          component={TextArea}
                          type="text"
                          inputProps={{
                            style: {
                              height: '92px'
                            },
                            className: "textarea",
                            readOnly: disabledEdit
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="create_doc_modal-content decision clearfix">
                    <div className="column fl">
                      <div className="column_content">
                        <span className="create_doc_modal-content-title">{translate('PERSONNEL_NUMBER')}</span>
                        <Field
                          name="employeeNumber"
                          component={Input}
                          type='text'
                          inputProps={{
                            className: "input bord_radius3",
                            readOnly: true
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="create_doc_modal-content decision">
                    <div className="column_content">
                      <span className="create_doc_modal-content-title">
                        <a>{translate('LEADER_SEARCH')}</a>
                      </span>
                    </div>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer style={{ clear: 'both' }} className='modal_footer'>
                {!disabledEdit && <button type="submit" className="btn_ok">{translate('SAVE')}</button>}
                <button className="btn_cancel bord_radius3" type="button" onClick={handleHide}>{translate('CLOSE')}</button>
              </Modal.Footer>
            </form>
          )}
        />
      </Modal>
    )
  }
}

Profile.propTypes = {
  userOrGroup: PropTypes.instanceOf(UserOrGroup).isRequired,
  disabledEdit: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
}

Profile.contextTypes = {
  t: PropTypes.func.isRequired
}

export default connectModal({ name: 'profile', destroyOnHide: true })(Profile)