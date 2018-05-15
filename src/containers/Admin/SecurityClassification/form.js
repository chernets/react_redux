import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../../actions'
import { hasRole } from '../../../utils/roles'
import { Form, Field } from 'react-final-form'
import Checkbox from '../../../components/FormComponents/Checkbox'
import Select from '../../../components/FormComponents/Select'
import { Input, TextArea, SecurityClassificationDependencies } from '../../../components/FormComponents/Table'
import { RightTitle } from '../Components'
import _ from 'lodash'
import { isEmpty } from '../../../utils/validators'
import { IS_EMPTY } from '../../../constant/validators'
import { show } from 'redux-modal'

class SecurityClassificationForm extends Component {
  constructor(props) {
    super(props)
  }

  validateForm(values) {
    const translate = this.context.t
    let errors = {}
    if (isEmpty(values.gname)) {
      errors.gname = this.context.t(IS_EMPTY)
    }
    return errors
  }

  render() {
    const translate = this.context.t;
    const { selected, createUpdate } = this.props
    return (
      <Form
        validate={this.validateForm.bind(this)}
        initialValues={selected}
        onSubmit={submittedValues => {
          this.props.createUpdate(submittedValues)
        }
        }
        render={({ handleSubmit, change, reset, submitting, pristine, values }) => {
          return (
            <form onSubmit={handleSubmit} noValidate id='SecurityClassificationForm'>
              <table className="business_proc-table">
                <tbody>
                  <tr>
                    <td>
                      <p>{translate('NAME')}*</p>
                    </td>
                    <td>
                      <Field name="gname" component={Input} placeholder={translate('NAME')} />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>{translate('DESCRIPTION')}</p>
                    </td>
                    <td>
                      <Field name="scDescription" component={TextArea} placeholder={translate('DESCRIPTION')} />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>{translate('GROUP')}</p>
                    </td>
                    <td>
                      <Field name="group" component={Input} placeholder={translate('GROUP')} />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>{translate('FUNCTION_OF_READING_THE_DOCUMENT')}</p>
                    </td>
                    <td className='tc'>
                      <Field name={`share`}
                        id={'share'}
                        component={Checkbox}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>{translate('ASSOCIATED_VULTURES')}</p>
                    </td>
                    <td className='secur-class tc' style={{ cursor: 'pointer', paddingTop: '5px' }} onClick={() => {this.props.show('changeSecurityClassifications',{
                      scIsDefault: values.dependencies.map(itm => {return itm.id}),
                      scIsFixed: [],
                      closeModal: (result)=>{
                        change('dependencies', result.map(item => {return new SecurityClassification(item)}))
                      }
                    })}}>
                      <Field name={`dependencies`}
                        id={'dependencies'}
                        component={SecurityClassificationDependencies}
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
SecurityClassificationForm.contextTypes = {
  t: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = dispatch => bindActionCreators({
  createUpdate: actions.admin.securityClassification.createUpdate,
  show
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SecurityClassificationForm);
