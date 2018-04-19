import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'react-bootstrap'
import { connectModal } from 'redux-modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form } from 'react-final-form'
import * as actions from '../../../actions'
import { hasRole } from '../../../utils/roles'
import { isEmpty, isEmail } from '../../../utils/validators'
import { IS_EMPTY, IS_EMAIL } from '../../../constant/validators'
import Tabs from './Tabs'
import Settings from './Settings'
import Information from './Information'
import Groups from './Groups'
import Notification from './Notification'
import Roles from './Roles'
import Security from './Security'
import Certificate from './Certificate'
import Delegates from './Delegates'
import History from './History'
import _ from 'lodash'
class CreateUpdateUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tabs: [
        {
          name: 'INFORMATION',
          visible: true
        },
        {
          name: 'EDS',
          visible: hasRole('ADMIN_PUBLIC_KEY_UPDATE')
        },
        {
          name: 'VULTURES',
          visible: hasRole('ADMIN_USER_SC_UPDATE')
        },
        {
          name: 'ROLES',
          visible: hasRole('ADMIN_USER_ROLES_UPDATE')
        },
        {
          name: 'GROUPS',
          visible: hasRole('ADMIN_USER_GROUPS_UPDATE')
        },
        {
          name: 'NOTICE',
          visible: hasRole('ADMIN_USER_NOTIF_UPDATE')
        },
        {
          name: 'DELEGATION',
          visible: hasRole('ADMIN_USER_DELEGATE_UPDATE') && props.userOrGroup.id !== null
        },
        {
          name: 'HISTORY',
          visible: props.userOrGroup.id !== null
        }
      ],
      activeTab: 'INFORMATION'
    }
  }

  componentDidMount() {
    this.props.loadValues(this.props.userOrGroup.id)
  }

  componentWillUnmount() {
    this.props.defaultValues()
  }

  componentDidUpdate(prevProps) {
    if (this.props.close) {
      this.props.closeModal()
      this.props.handleHide()
    }
  }

  validateForm(values) {
    const userOrGroup = this.props.userOrGroup
    const translate = this.context.t
    let errors = {}
    if (isEmpty(values.login)) {
      errors.login = this.context.t(IS_EMPTY)
    } else if (isEmail(values.login)) {
      errors.login = this.context.t(IS_EMAIL)
    }
    if (isEmpty(values.userOrGroup.userLastName)) {
      errors.userOrGroup = { ...errors.userOrGroup, userLastName: this.context.t(IS_EMPTY) }
    }
    if (isEmpty(values.userOrGroup.email)) {
      errors.userOrGroup = { ...errors.userOrGroup, email: this.context.t(IS_EMPTY) }
    } else if (isEmail(values.userOrGroup.email)) {
      errors.userOrGroup = { ...errors.userOrGroup, email: this.context.t(IS_EMAIL) }
    }
    if (isEmpty(values.userOrGroup.department)) {
      errors.userOrGroup = { ...errors.userOrGroup, department: { ...values.userOrGroup.department, path: this.context.t(IS_EMPTY) } }
    }
    return errors
  }

  render() {
    const { show, handleHide, delegates,
      userOrGroup, login, transportTypes,
      roles, groups, sc, notification,
      isFetching, isSaving, error
    } = this.props;
    const { tabs, activeTab } = this.state
    const translate = this.context.t
    if (isFetching) {
      return (<div>loading</div>)
    }
    return (
      <Modal show={show} onHide={handleHide} bsSize="large" animation={true}>
        <Modal.Header className="modal_header create-edit-document clearfix" >
          <h4 className='fl'>{translate(userOrGroup.id === null ? 'CREATE_USER_1' : 'EDITING_A_PROFILE')}</h4>
          <Tabs tabs={tabs} activeTab={activeTab} handleUpdate={(tab) => {
            this.setState({ activeTab: tab.name })
          }} />
        </Modal.Header>
        <Form
          validate={this.validateForm.bind(this)}
          initialValues={{
            userOrGroup,
            login,
            roles,
            groups,
            sc,
            notification,
            delegates
          }}
          onSubmit={submittedValues => {
            this.props.createOrUpdate(submittedValues, userOrGroup, login)
          }}
          render={({ handleSubmit, change, reset, submitting, pristine, values }) => {
            return(
            <form onSubmit={handleSubmit} noValidate>
              <Modal.Body className="modal_attach">
                <div className="user-profile_wrap" style={{ height: 'calc(100vh - 285px', overflow: 'scroll' }}>
                  <div className="create_doc_modal-content-area">
                    <Settings userOrGroup={userOrGroup} />
                    <Information userOrGroup={values.userOrGroup} formChange={change}/>
                    {hasRole('ADMIN_PUBLIC_KEY_UPDATE') && <Certificate />}
                    {hasRole('ADMIN_USER_SC_UPDATE') && <Security sc={values.sc} />}
                    {hasRole('ADMIN_USER_ROLES_UPDATE') && <Roles roles={values.roles} />}
                    {hasRole('ADMIN_USER_GROUPS_UPDATE') && <Groups groups={values.groups} userOrGroup={userOrGroup} />}
                    {hasRole('ADMIN_USER_NOTIF_UPDATE') && <Notification notification={values.notification} transportTypes={transportTypes} />}
                    {hasRole('ADMIN_USER_DELEGATE_UPDATE') && userOrGroup.id !== null && <Delegates delegates={values.delegates} userOrGroup={userOrGroup} />}
                    {userOrGroup.id !== null && <History />}
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer style={{ clear: 'both' }} className='modal_footer'>
                <button type="submit" className="btn_ok">{translate('SAVE')}</button>
                <button className="btn_cancel bord_radius3" type="button" onClick={handleHide}>{translate('CLOSE')}</button>
              </Modal.Footer>
            </form>
          )}}
        />
      </Modal>
    )
  }
}

CreateUpdateUser.propTypes = {
  userOrGroup: PropTypes.instanceOf(UserOrGroup).isRequired,
  login: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired
}

CreateUpdateUser.contextTypes = {
  t: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.modalCreateUpdateUser.isFetching,
    roles: state.modalCreateUpdateUser.roles,
    groups: state.modalCreateUpdateUser.groups,
    sc: state.modalCreateUpdateUser.sc,
    transportTypes: state.modalCreateUpdateUser.transportTypes,
    notification: state.modalCreateUpdateUser.notification,
    delegates: state.modalCreateUpdateUser.delegates,
    isSaving: state.modalCreateUpdateUser.isSaving,
    close: state.modalCreateUpdateUser.close,
    error: state.modalCreateUpdateUser.error,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  loadValues: actions.modals.createUpdateUser.loadValues,
  defaultValues: actions.modals.createUpdateUser.defaultValues,
  createOrUpdate: actions.modals.createUpdateUser.createOrUpdate
}, dispatch)

export default connectModal({ name: 'createUpdateUser', destroyOnHide: true })((connect(mapStateToProps, mapDispatchToProps)(CreateUpdateUser)))