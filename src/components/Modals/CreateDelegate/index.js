import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'react-bootstrap'
import { connectModal } from 'redux-modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../../actions'
import { Form, Field } from 'react-final-form'
import Select from '../../FormComponents/Select'
import Plus from '../../Plus'
import DateTime from '../../FormComponents/DateTime'
import _ from 'lodash'
import moment from 'moment'
import { dateTimeRound } from '../../../utils/dateTimeRound'
import UserOrGroupView from '../../UserOrGroupView'
class CreateDelegate extends Component {
  constructor() {
    super()
  }

  validateForm(values) {
    let errors = {}
    if (!values.users || values.users.length === 0) {
      errors.users = this.context.t('IS_EMPTY')
    }
    if (moment(values.dateStart).isAfter(moment(values.dateEnd))) {
      errors.dateStart = this.context.t('isAfter dateEnd')
    }
    if (moment(values.dateEnd).isBefore(moment(values.dateStart))) {
      errors.dateEnd = this.context.t('isBefore dateStart')
    }
    return errors
  }

  shouldComponentUpdate(nextProps) {
    return !_.isEqual(nextProps, this.props)
  }

  render() {
    const { show, handleHide, accounts, userOrGroup } = this.props;
    const translate = this.context.t
    return (
      <Modal show={true} onHide={handleHide}>
        <Modal.Header className="modal_header">
          <h4>
            {translate('ADD_DELEGATE')}
          </h4>
        </Modal.Header>
        <Form
          validate={this.validateForm.bind(this)}
          initialValues={{
            users: [],
            dateStart: dateTimeRound(moment()),
            dateEnd: dateTimeRound(moment().add(7, 'day')),
            account: _.head(accounts).id
          }}
          onSubmit={submittedValues => {
            this.props.closeModal([
              new ClientDelegate({
                fromUserId: _.head(submittedValues.users),
                toUserId: new UserOrGroup(userOrGroup),
                dateStart: submittedValues.dateStart,
                dateEnd: submittedValues.dateEnd,
                account: _.find(accounts, {id: submittedValues.account})
              })
            ])
            handleHide()
          }}
          render={({ handleSubmit, change, reset, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit} noValidate>
              <Modal.Body className="modal_attach all_doc-info clearfix">
                <div className="connect_relation">
                  <div className="column clearfix" style={{ marginTop: 0 }}>
                    <span className="create_doc_modal-content-title">{translate('USER')}*</span>
                    {values.users.map(itm => {
                      return(
                        <div className="data_doc-content half-width fl" key={itm.id}>
                          <UserOrGroupView userOrGroup={new UserOrGroup(itm)}/>
                        </div>
                      )
                    })}
                    <div className="data_doc-content half-width fl">
                      <Field name="users" render={(data) => {
                        return (
                          <Plus {...data} title={'ADD_USER'} handlerClick={() =>
                            this.props.showModalUsersOrGroup({
                              showgroup: false,
                              multiSelect: false,
                              userOrGroupsSelected: values.users.map(itm => { return new UserOrGroup(itm) }),
                              cb: (result) => {
                                data.input.onChange(result.map((item) => {
                                  if (_.find(values.users, { id: item.id }) !== undefined) {
                                    return _.find(values.users, { id: item.id })
                                  }
                                  return {
                                    ...new UserOrGroup(item)
                                  }
                                }))
                              }
                            })} />
                        )
                      }} />
                    </div>
                  </div>
                  <div className="column clearfix">
                    <div className="data_doc-content half-width fl">
                      <span className="create_doc_modal-content-title">{translate('THE_DATE_OF_THE_BEGINNING')}*</span>
                      <Field name="dateStart" render={(data) => {
                        return (
                          <DateTime {...data} isClearable={false} minDate={moment()} maxTime={values.dateEnd} maxDate={values.dateEnd} placeholder={'THE_DATE_OF_THE_BEGINNING'} />
                        )
                      }} />
                    </div>
                    <div className="data_doc-content half-width fr">
                      <span className="create_doc_modal-content-title">{translate('EXPIRATION_DATE')}*</span>
                      <Field name="dateEnd" render={(data) => {
                        return (
                          <DateTime {...data} isClearable={false} minDate={values.dateStart} maxTime={moment().endOf('day')} placeholder={'EXPIRATION_DATE'} />
                        )
                      }} />
                    </div>
                  </div>
                  <div className="column clearfix">
                    <div className="data_doc-content">
                      <span className="create_doc_modal-content-title">{translate('ACCOUNT')}*</span>
                      <Field
                        name="account"
                        component={Select}
                        labelKey={'accountName'}
                        valueKey={'id'}
                        translate={false}
                        type='select'
                        options={accounts}
                      />
                    </div>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer style={{ clear: 'both' }} className='modal_footer'>
                <button className="btn_cancel bord_radius3" type="button" onClick={handleHide}>{translate('CANCEL')}</button>
                <button type="submit" className="btn_ok">{translate('READY')}</button>
              </Modal.Footer>
            </form>
          )}
        />
      </Modal>
    )
  }
}

CreateDelegate.contextTypes = {
  t: PropTypes.func.isRequired
}
const mapStateToProps = (state) => {
  return {
    accounts: state.auth.accounts
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  showModalUsersOrGroup: actions.modals.changeUserOrGroups.showModal
}, dispatch)

export default connectModal({ name: 'createDelegate', destroyOnHide: true })(connect(mapStateToProps, mapDispatchToProps)(CreateDelegate))