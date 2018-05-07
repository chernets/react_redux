import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../../actions'
import { Form, Field } from 'react-final-form'
import Checkbox from '../../../components/FormComponents/Checkbox'
import { Input, TextArea } from '../../../components/FormComponents/Table'
import { RightTitle } from '../Components'
import _ from 'lodash'
import { isEmpty } from '../../../utils/validators'
import { IS_EMPTY } from '../../../constant/validators'
import { show } from 'redux-modal'
class RepresenrationsForm extends Component {
  constructor(props) {
    super(props)
  }

  validateForm(values) {
    const translate = this.context.t
    let errors = {}
    if (isEmpty(values.name)) {
      errors.name = this.context.t(IS_EMPTY)
    }
    if (isEmpty(values.position)) {
      errors.position = this.context.t(IS_EMPTY)
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
          this.props.createUpdate(submittedValues)
        }}
        render={({ handleSubmit, change, reset, submitting, pristine, values }) => {
          return (
            <form onSubmit={handleSubmit} noValidate id='RepresenrationsForm'>
              <table className="business_proc-table">
                <tbody>
                  <tr>
                    <td>
                      <p>{translate('NAME')}*</p>
                    </td>
                    <td>
                      <Field name="name" component={Input} placeholder={translate('NAME')} />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>{translate('POSITION')}*</p>
                    </td>
                    <td>
                      <Field name="position" component={Input} placeholder={translate('POSITION')} />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>{translate('FORMOBILE')}</p>
                    </td>
                    <td className="tc">
                      <Field name={`forMobile`}
                        id={'forMobile'}
                        component={Checkbox}
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
RepresenrationsForm.contextTypes = {
  t: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = dispatch => bindActionCreators({
  createUpdate: actions.admin.fields.createUpdate,
  show
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(RepresenrationsForm);
