import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../../actions'
import { hasRole } from '../../../utils/roles'
import { Form, Field } from 'react-final-form'
import Checkbox from '../../../components/FormComponents/Checkbox'
import Select, { SelectObj } from '../../../components/FormComponents/Select'
import { Input, TextArea, List } from '../../../components/FormComponents/Table'
import { RightTitle } from '../Components'
import _ from 'lodash'
import { isEmpty } from '../../../utils/validators'
import validUrl from 'valid-url'
import { IS_EMPTY } from '../../../constant/validators'
import { fileStorageType } from '../../../utils/translateEnum'
import { show } from 'redux-modal'

class AccountsForm extends Component {
  constructor(props) {
    super(props)
  }

  validateForm(values) {
    const translate = this.context.t
    let errors = {}
    let mainStorage = _.findIndex(values.storages, { type: FileStorageType.PRIMARY })
    let archiveStorage = _.findIndex(values.storages, { type: FileStorageType.ARCHIVE })
    if (isEmpty(values.accountName)) {
      errors.accountName = this.context.t(IS_EMPTY)
    }
    if (isEmpty(values.accountGroupId)) {
      errors.accountGroupId = this.context.t(IS_EMPTY)
    }
    if (values.id === null && isEmpty(values.storages[mainStorage].uri)) {
      if (typeof errors.storages === 'undefined') errors.storages = [];
      errors.storages[mainStorage] = { uri : this.context.t(IS_EMPTY)}
    }
    if (values.id === null && isEmpty(values.storages[archiveStorage].uri)) {
      if (typeof errors.storages === 'undefined') errors.storages = [];
      errors.storages[archiveStorage] = { uri : this.context.t(IS_EMPTY)}
    }
    return errors
  }

  render() {
    const translate = this.context.t;
    const { selected, groupsList, fileStoragesList, createUpdate } = this.props
    return (
      <Form
        validate={this.validateForm.bind(this)}
        initialValues={{ keyPassword: '', ...selected }}
        onSubmit={submittedValues => {
          this.props.createUpdate(new Account(submittedValues), hasRole('superAdmin'))
        }
        }
        render={({ handleSubmit, change, reset, submitting, pristine, values }) => {
          let mainStorage = _.findIndex(values.storages, { type: FileStorageType.PRIMARY }) === -1 ? values.storages.length : _.findIndex(values.storages, { type: FileStorageType.PRIMARY })
          let archiveStorage = _.findIndex(values.storages, { type: FileStorageType.ARCHIVE }) === -1 ? values.storages.length + 1 : _.findIndex(values.storages, { type: FileStorageType.ARCHIVE })
          return (
            <form onSubmit={handleSubmit} noValidate id='AccountsForm'>
              <table className="business_proc-table">
                <tbody>
                  <tr>
                    <td>
                      <p>{translate('NAME')}*</p>
                    </td>
                    <td>
                      <Field name="accountName" component={Input} placeholder={translate('NAME')} />
                    </td>
                  </tr>
                  {values.id === null && <tr>
                    <td>
                      <p>{translate('CLOSED')}</p>
                    </td>
                    <td className="tc">
                      <Field name={`confidential`}
                        id={'confidential'}
                        component={Checkbox}
                      />
                    </td>
                  </tr>}
                  <tr>
                    <td>
                      <p>{translate('ENCRYPTION')}</p>
                    </td>
                    <td>
                      <Field name="keyPassword" component={Input} placeholder={values.encrypted ? '******' : translate('ENTER_THE_KEY')} />
                    </td>
                  </tr>
                  {values.id === null && <tr>
                    <td>
                      <p>{translate('MAIN_FILE_STORAGE')}*</p>
                    </td>
                    <td>
                      <Field name={`storages[${mainStorage}]`}
                        component={SelectObj}
                        hideError={true}
                        options={[new FileStorage({
                          type: FileStorageType.PRIMARY,
                          descriptionFileStorage: translate('NEW_REPOSITORY'),
                          readOnly: true
                        }), ..._.filter(fileStoragesList, { type: FileStorageType.PRIMARY })]}
                        labelKey={'descriptionFileStorage'}
                      />
                    </td>
                  </tr>}
                  {values.id === null && <tr>
                    <td>
                      <p>{translate('ARCHIVE_FILE_STORAGE')}*</p>
                    </td>
                    <td>
                      <Field name={`storages[${archiveStorage}]`}
                        component={SelectObj}
                        hideError={true}
                        options={[new FileStorage({
                          type: FileStorageType.ARCHIVE,
                          descriptionFileStorage: translate('NEW_REPOSITORY'),
                          readOnly: true
                        }), ..._.filter(fileStoragesList, { type: FileStorageType.ARCHIVE })]}
                        labelKey={'descriptionFileStorage'}
                      />
                    </td>
                  </tr>}
                  {hasRole('superAdmin') && <tr>
                    <td>
                      <p>{translate('ACCOUNT_GROUP')}*</p>
                    </td>
                    <td>
                      <Field name="accountGroupId"
                        component={Select}
                        options={groupsList}
                        labelKey={'name'}
                        valueKey={'id'}
                      />
                    </td>
                  </tr>}
                  {values.id === null && values.storages[mainStorage].id === null && <tr className='bpm-group-title'>
                    <td colSpan="2">
                      <p>{translate('NEW_MAIN_FILE_STORAGE')}</p>
                    </td>
                  </tr>}
                  {values.id === null && values.storages[mainStorage].id === null && <tr className="bpm-group-drop no-border">
                    <td colSpan="2">
                      <table className="width100">
                        <tbody>
                          <tr>
                            <td className="width50">
                              <p>{translate('A_PRIORITY')}*</p>
                            </td>
                            <td className="width50">
                              <Field name={`storages[${mainStorage}].priority`} component={Input} placeholder={translate('A_PRIORITY')} />
                            </td>
                          </tr>
                          <tr>
                            <td className="width50">
                              <p>{translate('URL')}*</p>
                            </td>
                            <td className="width50">
                              <Field name={`storages[${mainStorage}].uri`} component={Input} placeholder={translate('URL')} />
                            </td>
                          </tr>
                          <tr>
                            <td className="width50">
                              <p>{translate('RECORDING')}*</p>
                            </td>
                            <td className="width50 tc">
                              <Field name={`storages[${mainStorage}].readOnly`}
                                id={`storages[${mainStorage}].readOnly`}
                                component={Checkbox}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>}
                  {values.id === null && values.storages[archiveStorage].id === null && <tr className='bpm-group-title'>
                    <td colSpan="2">
                      <p>{translate('NEW_ARCHIVE_FILE_STORAGE')}</p>
                    </td>
                  </tr>}
                  {values.id === null && values.storages[archiveStorage].id === null && <tr className="bpm-group-drop no-border">
                    <td colSpan="2">
                      <table className="width100">
                        <tbody>
                          <tr>
                            <td className="width50">
                              <p>{translate('A_PRIORITY')}</p>
                            </td>
                            <td className="width50">
                              <Field name={`storages[${archiveStorage}].priority`} component={Input} placeholder={translate('A_PRIORITY')} />
                            </td>
                          </tr>
                          <tr>
                            <td className="width50">
                              <p>{translate('URL')}*</p>
                            </td>
                            <td className="width50">
                              <Field name={`storages[${archiveStorage}].uri`} component={Input} placeholder={translate('URL')} />
                            </td>
                          </tr>
                          <tr>
                            <td className="width50">
                              <p>{translate('RECORDING')}</p>
                            </td>
                            <td className="width50 tc">
                              <Field name={`storages[${archiveStorage}].readOnly`}
                                id={`storages[${archiveStorage}].readOnly`}
                                component={Checkbox}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>}
                </tbody>
              </table>
            </form>
          )
        }}
      />
    )
  }
}
AccountsForm.contextTypes = {
  t: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = dispatch => bindActionCreators({
  createUpdate: actions.admin.accounts.createUpdate,
  show
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AccountsForm);
