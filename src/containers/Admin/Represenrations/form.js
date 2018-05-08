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
import { IS_EMPTY } from '../../../constant/validators'
import { show } from 'redux-modal'
import { filterCondition, filterFieldType } from '../../../utils/translateEnum'

let FormApi
class RepresenrationsForm extends Component {
  constructor(props) {
    super(props)
    this.addParametr = this.addParametr.bind(this)
  }

  componentDidMount() {
    this.props.addParametr(this.addParametr)
  }

  addParametr() {
    FormApi.change('filters', [...FormApi.values.filters, new CustomFilterItem({
      fType: FilterFieldType.STRING,
      condition: FilterCondition.EQUAL,
    })])
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
        render={(props) => {
          FormApi = props;
          const { handleSubmit, change, reset, submitting, pristine, values } = props
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
                  <tr>
                    <td>
                      <p>{translate('FORREGISTRY')}</p>
                    </td>
                    <td className="tc">
                      <Field name={`forRegistry`}
                        id={'forRegistry'}
                        component={Checkbox}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>{translate('FIELDS')}</p>
                    </td>
                    <td onClick={() => this.props.show('changeDocumentFields', {
                      isDefault: _.values(values.fields),
                      closeModal: (val) => change('fields', val)
                    })}>
                      <Field name={`fields`} component={(propsField) => {
                        return (
                          <List list={_.values(_.mapValues(values.fields, item => { return item.displayName }))} hideMore={false} />
                        )
                      }} />
                    </td>
                  </tr>
                </tbody>
              </table>
              <Field name={`filters`} component={(propsField) => {
                return (
                  values.filters.map((item, index) => {
                    return [
                      <div className="business_proc-right-top" key={`label_${index}`}>
                        <div className="r-main_cont-tab">
                          <ul className="r_tab-name">
                            <li>
                              <a>{translate('PARAMETER')}{index + 1}</a>
                              <span className="r_tab-name-underline"></span>
                            </li>
                          </ul>
                          <span className="kaz_icons close_small" onClick={() => {
                            propsField.input.onChange(_.filter(propsField.input.value, itm => {
                              return itm !== item
                            }))
                          }}></span>
                        </div>
                      </div>,
                      <div className="business_proc-right-contant" key={`table_${index}`}>
                        <table className="business_proc-table">
                          <tbody>
                            <tr>
                              <td>
                                <p>{translate('TYPE')}*</p>
                              </td>
                              <td>
                                <Field
                                  name={`filters[${index}].fType`}
                                  component={Select}
                                  options={filterFieldType}
                                  labelKey={'name'}
                                  valueKey={'value'}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p>{translate('FILTERCONDITION')}*</p>
                              </td>
                              <td>
                                <Field
                                  name={`filters[${index}].condition`}
                                  component={Select}
                                  options={filterCondition}
                                  labelKey={'name'}
                                  valueKey={'value'}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p>{translate('FIELD')}</p>
                              </td>
                              <td>
                                <Field name={`filters[${index}].field`} component={Input} placeholder={translate('FIELD')} />
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p>{translate('VALUE')}</p>
                              </td>
                              <td>
                                <Field name={`filters[${index}].value`} component={Input} placeholder={translate('VALUE')} />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    ]
                  })
                )
              }}
              />
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
  createUpdate: actions.admin.represenrations.createUpdate,
  show
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(RepresenrationsForm);
