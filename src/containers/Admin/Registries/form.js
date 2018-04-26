import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../../actions'
import { Form, Field } from 'react-final-form'
import { Input, TextArea, List, Account } from '../../../components/FormComponents/Table'
import { RightTitle } from '../Components'
import _ from 'lodash'
import { isEmpty, isEmail } from '../../../utils/validators'
import { IS_EMPTY, IS_EMAIL } from '../../../constant/validators'
class RegForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showAcc: false
    }
  }

  validateForm(values) {
    const translate = this.context.t
    let errors = {}
    if (isEmpty(values.regName)) {
      errors.regName = this.context.t(IS_EMPTY)
    }
    if (isEmpty(values.regDescription)) {
      errors.regDescription = this.context.t(IS_EMPTY)
    }
    if (isEmpty(values.viewRule)) {
      errors.viewRule = this.context.t(IS_EMPTY)
    }
    if (values.accountList.length === 0) {
      errors.accountList = this.context.t(IS_EMPTY)
    }
    return errors
  }

  render() {
    const translate = this.context.t;
    const { selected, accounts, createUpdate } = this.props
    return (
      <Form
        validate={this.validateForm.bind(this)}
        initialValues={{ ...selected, accounts: accounts }}
        onSubmit={submittedValues => {
          createUpdate(submittedValues, submittedValues.userOrGrList, submittedValues.accountList)
        }}
        render={({ handleSubmit, change, reset, submitting, pristine, values }) => {
          return (
            <form onSubmit={handleSubmit} noValidate id='RegForm'>
              <table className="business_proc-table">
                <tbody>
                  <tr>
                    <td>
                      <p>{translate('NAME')}*</p>
                    </td>
                    <td>
                      <Field name="regName" component={Input} placeholder={translate('NAME')} />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>{translate('DESCRIPTION')}*</p>
                    </td>
                    <td>
                      <Field name="regDescription" component={TextArea} placeholder={translate('DESCRIPTION')} />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>{translate('VIEW_IN_THE_DATABASE')}*</p>
                    </td>
                    <td>
                      <Field name="viewRule" component={Input} placeholder={translate('VIEW_IN_THE_DATABASE')} />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>{translate('USERS')}</p>
                    </td>
                    <td onClick={() =>
                      this.props.showModalUsersOrGroup({
                        showgroup: true,
                        accounts: values.accountList,
                        userOrGroupsSelected: values.userOrGrList.map(itm => { return new UserOrGroup(itm) }),
                        cb: (result) => {
                          change('userOrGrList', result.map((item) => {
                            if (_.find(values.userOrGrList, { id: item.id }) !== undefined) {
                              return new UserOrGroup(_.find(values.userOrGrList, { id: item.id }))
                            }
                            return new UserOrGroup(item)
                          }))
                        }
                      })}>
                      <Field name={`userOrGrList`} component={(propsField) => {
                        return (
                          <List list={values.userOrGrList.map(item => {
                            return item.getFio()
                          })} />
                        )
                      }}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <RightTitle label={'ACCOUNTS'} toogleShow={() => this.setState({
                showAcc: !this.state.showAcc
              })} show={this.state.showAcc} />
              {this.state.showAcc && <div className="business_proc-right-contant">
                <table className="business_proc-table">
                  <tbody>
                    {accounts.map((acc, index) => {
                      return (
                        <tr key={acc.id}>
                          <td>
                            <p>{acc.accountName}</p>
                          </td>
                          <Field name={`accountList`} component={(propsField) => {
                            return (
                              <td className={`tc${propsField.meta.error && propsField.meta.touched ? ' error' : ''}`}>
                                <Field name={`accounts[${index}].id`}
                                  {...acc}
                                  component={Account}
                                  checked={_.find(values.accountList, { id: acc.id }) ? true : false}
                                  onChange={(e) => {
                                    if (_.find(values.accountList, { id: e.target.value }) === undefined) {
                                      propsField.input.onChange([...values.accountList, acc])
                                    } else {
                                      propsField.input.onChange(_.filter(values.accountList, itm => { return itm.id !== acc.id }))
                                    }
                                  }}
                                />
                              </td>
                            )
                          }}
                          />
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>}
            </form>
          )
        }}
      />
    )
  }
}
RegForm.contextTypes = {
  t: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    accounts: state.auth.accounts
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  showModalUsersOrGroup: actions.modals.changeUserOrGroups.showModal,
  createUpdate: actions.admin.registries.createUpdate
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(RegForm);
