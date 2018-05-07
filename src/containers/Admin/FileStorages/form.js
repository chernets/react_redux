import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../../actions'
import { Form, Field } from 'react-final-form'
import Checkbox from '../../../components/FormComponents/Checkbox'
import Select from '../../../components/FormComponents/Select'
import { Input, TextArea, List, Account } from '../../../components/FormComponents/Table'
import { RightTitle } from '../Components'
import _ from 'lodash'
import { isEmpty } from '../../../utils/validators'
import validUrl from 'valid-url'
import { IS_EMPTY } from '../../../constant/validators'
import { fileStorageType } from '../../../utils/translateEnum'
import { show } from 'redux-modal'
class FileStorageForm extends Component {
  constructor(props) {
    super(props)
  }

  validateForm(values) {
    const translate = this.context.t
    let errors = {}
    if (isEmpty(values.descriptionFileStorage)) {
      errors.descriptionFileStorage = this.context.t(IS_EMPTY)
    }
    if (isEmpty(values.priority)) {
      errors.priority = this.context.t(IS_EMPTY)
    }
    if (isEmpty(values.uri)) {
      errors.uri = this.context.t(IS_EMPTY)
    } else if (validUrl.isWebUri(values.uri) === undefined) {
      errors.uri = this.context.t('No url')
    }
    if (isEmpty(values.accountId)) {
      errors.accountId = this.context.t(IS_EMPTY)
    }
    return errors
  }

  render() {
    const translate = this.context.t;
    const { selected, accounts, createUpdate } = this.props
    return (
      <Form
        validate={this.validateForm.bind(this)}
        initialValues={{ ...selected, readOnly: !selected.readOnly }}
        onSubmit={submittedValues => {
          this.props.show('adminPassword', {
            closeModal: (password) => {
              createUpdate(new FileStorage({ ...submittedValues, readOnly: !submittedValues.readOnly }), password, submittedValues.accountId)
            }
          })
        }}
        render={({ handleSubmit, change, reset, submitting, pristine, values }) => {
          return (
            <form onSubmit={handleSubmit} noValidate id='FileStorageForm'>
              <table className="business_proc-table">
                <tbody>
                  <tr>
                    <td>
                      <p>{translate('NAME')}*</p>
                    </td>
                    <td>
                      <Field name="descriptionFileStorage" component={Input} placeholder={translate('NAME')} />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>{translate('TYPE')}*</p>
                    </td>
                    <td>
                      <Field
                        name="type"
                        component={Select}
                        options={fileStorageType}
                        labelKey={'name'}
                        valueKey={'value'}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>{translate('A_PRIORITY')}*</p>
                    </td>
                    <td>
                      <Field name="priority" component={Input} placeholder={translate('A_PRIORITY')} />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>{translate('URL')}*</p>
                    </td>
                    <td>
                      <Field name="uri" component={Input} placeholder={translate('URL')} />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>{translate('RECORDING')}*</p>
                    </td>
                    <td className="tc">
                      <Field name={`readOnly`}
                        id={'readOnly'}
                        component={Checkbox}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>{translate('ACCOUNT')}*</p>
                    </td>
                    <td>
                      <Field name="accountId"
                        component={Select}
                        options={accounts}
                        disabled={values.id !== null}
                        labelKey={'accountName'}
                        valueKey={'id'}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          )
        }}
      />
    )
  }
}
FileStorageForm.contextTypes = {
  t: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    accounts: state.auth.accounts
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  createUpdate: actions.admin.filestorages.createUpdate,
  show
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(FileStorageForm);
