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
class FieldsForm extends Component {
  constructor(props) {
    super(props)
  }

  validateForm(values) {
    const translate = this.context.t
    let errors = {}
    if (isEmpty(values.field)) {
      errors.field = this.context.t(IS_EMPTY)
    }
    if (isEmpty(values.displayName)) {
      errors.displayName = this.context.t(IS_EMPTY)
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
            <form onSubmit={handleSubmit} noValidate id='FieldsForm'>
              <table className="business_proc-table">
                <tbody>
                  <tr>
                    <td>
                      <p>{translate('field')}*</p>
                    </td>
                    <td>
                      <Field name="field" component={Input} placeholder={translate('field')} />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>{translate('displayName')}*</p>
                    </td>
                    <td>
                      <Field name="displayName" component={Input} placeholder={translate('displayName')} />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>{translate('minWidth')}</p>
                    </td>
                    <td>
                      <Field name="minWidth" component={Input} placeholder={translate('minWidth')} />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>{translate('width')}</p>
                    </td>
                    <td>
                      <Field name="width" component={Input} placeholder={translate('width')} />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>{translate('maxWidth')}</p>
                    </td>
                    <td>
                      <Field name="maxWidth" component={Input} placeholder={translate('maxWidth')} />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>{translate('readonly')}</p>
                    </td>
                    <td className="tc">
                      <Field name={`readonly`}
                        id={'readonly'}
                        component={Checkbox}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>{translate('enableSorting')}</p>
                    </td>
                    <td className="tc">
                      <Field name={`enableSorting`}
                        id={'enableSorting'}
                        component={Checkbox}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>{translate('enableColumnResizing')}</p>
                    </td>
                    <td className="tc">
                      <Field name={`enableColumnResizing`}
                        id={'enableColumnResizing'}
                        component={Checkbox}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>{translate('visible')}</p>
                    </td>
                    <td className="tc">
                      <Field name={`visible`}
                        id={'visible'}
                        component={Checkbox}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>{translate('cellTemplate')}</p>
                    </td>
                    <td>
                      <Field name="cellTemplate" component={TextArea} placeholder={translate('cellTemplate')} />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>{translate('headerCellTemplate')}</p>
                    </td>
                    <td>
                      <Field name="headerCellTemplate" component={TextArea} placeholder={translate('headerCellTemplate')} />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>{translate('js')}</p>
                    </td>
                    <td>
                      <Field name="js" component={TextArea} placeholder={translate('js')} />
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
FieldsForm.contextTypes = {
  t: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return { }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  createUpdate: actions.admin.fields.createUpdate,
  show
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(FieldsForm);
