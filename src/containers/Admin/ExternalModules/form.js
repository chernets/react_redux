import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../../actions'
import { Form, Field } from 'react-final-form'
import { Input, TextArea } from '../../../components/FormComponents/Table'
import { RightTitle } from '../Components'
import _ from 'lodash'
import { isEmpty } from '../../../utils/validators'
import validUrl from 'valid-url'
import { IS_EMPTY } from '../../../constant/validators'
import { show } from 'redux-modal'
class ExternalModuleForm extends Component {
  constructor(props) {
    super(props)
  }

  validateForm(values) {
    const translate = this.context.t
    let errors = {}
    if (isEmpty(values.url)) {
      errors.url = this.context.t(IS_EMPTY)
    } else if (validUrl.isWebUri(values.url) === undefined) {
      errors.url = this.context.t('No url')
    }
    if (isEmpty(values.user.userFirstName)) {
      errors = {...errors, user: {...values.user, userFirstName: this.context.t(IS_EMPTY)}}
    }
    return errors
  }

  render() {
    const translate = this.context.t;
    const { selected } = this.props
    return (
      <Form
        validate={this.validateForm.bind(this)}
        initialValues={{ ...selected }}
        onSubmit={submittedValues => {
          if (submittedValues.id === null) {
            this.props.show('adminPassword', {
              closeModal: (password) => {
                this.props.create(submittedValues.url, submittedValues.user, submittedValues.user.userFirstName, password)
              }
            })
          } else {
            this.props.update(submittedValues.id)
          }
        }}
        render={({ handleSubmit, change, reset, submitting, pristine, values }) => {
          return (
            <form onSubmit={handleSubmit} noValidate id='ExternalModuleForm'>
              <table className="business_proc-table">
                <tbody>
                  {values.id !== null && [
                    <tr key={'name'}>
                      <td>
                        <p>{translate('NAME')}*</p>
                      </td>
                      <td>
                        <Field name="nameExternalModule" readOnly={values.id !== null} component={Input} placeholder={translate('NAME')} />
                      </td>
                    </tr>,
                    <tr key={'description'}>
                      <td>
                        <p>{translate('DESCRIPTION')}*</p>
                      </td>
                      <td>
                        <Field name="descriptionExternalModule" readOnly={values.id !== null} component={TextArea} placeholder={translate('DESCRIPTION')} />
                      </td>
                    </tr>
                  ]}
                  <tr>
                    <td>
                      <p>{translate('URL')}*</p>
                    </td>
                    <td>
                      <Field name="url" component={Input} readOnly={values.id !== null} placeholder={translate('URL')} />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>{translate('USER')}*</p>
                    </td>
                    <td>
                      <Field name="user.userFirstName" readOnly={values.id !== null} component={Input} placeholder={translate('USER')} />
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
ExternalModuleForm.contextTypes = {
  t: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    accounts: state.auth.accounts
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  create: actions.admin.externalmodules.create,
  update: actions.admin.externalmodules.update,
  show
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ExternalModuleForm);
