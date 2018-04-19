import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { show } from 'redux-modal'
import Input from '../../../FormComponents/Input'
import Checkbox from '../../../FormComponents/Checkbox'
import DepartmentPath from '../../../FormComponents/DepartmentPath'
import Select from '../../../FormComponents/Select'
import { userType } from '../../../../utils/translateEnum'
class Information extends Component {
  constructor(props) {
    super(props)
  }

  // shouldComponentUpdate(nextProps) {
  //   return !_.isEqual(nextProps.sc, this.props.sc)
  // }

  render() {
    const translate = this.context.t
    const { userOrGroup, formChange } = this.props
    return (
      <React.Fragment>
        <div className="create_doc_modal-content decision clearfix">
          <div className="column fl">
            <div className="column_content">
              <span className="create_doc_modal-content-title">{translate('SURNAME')}*</span>
              <Field
                name="userOrGroup.userLastName"
                component={Input}
                type='text'
                inputProps={{
                  className: "input bord_radius3"
                }}
              />
            </div>
          </div>
          <div className="column fr">
            <div className="column_content">
              <span className="create_doc_modal-content-title">{translate('FIRST_NAME')}</span>
              <Field
                name="userOrGroup.userFirstName"
                className="input bord_radius3"
                component={Input}
                type="text"
                inputProps={{
                  className: "input bord_radius3"
                }}
              />
            </div>
          </div>
        </div>
        <div className="create_doc_modal-content decision clearfix">
          <div className="column fl">
            <div className="column_content">
              <span className="create_doc_modal-content-title">{translate('MIDDLE_NAME')}</span>
              <Field
                name="userOrGroup.userMiddleName"
                component={Input}
                type='text'
                inputProps={{
                  className: "input bord_radius3"
                }}
              />
            </div>
          </div>
          <div className="column fr">
            <div className="column_content">
              <span className="create_doc_modal-content-title">{translate('EMAIL')}*</span>
              <Field
                name="userOrGroup.email"
                className="input bord_radius3"
                component={Input}
                type="text"
                inputProps={{
                  className: "input bord_radius3"
                }}
              />
            </div>
          </div>
        </div>
        <div className="create_doc_modal-content decision clearfix">
          <div className="column fl">
            <div className="column_content">
              <span className="create_doc_modal-content-title">{translate('POSITION_USER')}</span>
              <Field
                name="userOrGroup.position"
                component={Input}
                type='text'
                inputProps={{
                  className: "input bord_radius3"
                }}
              />
            </div>
            <div className="column_content" style={{ marginTop: '10px' }}>
              <span className="create_doc_modal-content-title">{translate('WORK_PHONE')}</span>
              <Field
                name="userOrGroup.workPhone"
                component={Input}
                type='text'
                inputProps={{
                  className: "input bord_radius3"
                }}
              />
            </div>
          </div>
          <div className="column fr">
            <div className="column_content">
              <span className="create_doc_modal-content-title">{translate('STRUCTURAL_SUBDIVISION')}*</span>
              <Field
                name="userOrGroup.department"
                className="input bord_radius3"
                component={DepartmentPath}
                type="text"
                inputProps={{
                  style: {
                    height: '92px'
                  },
                  onKeyDown: (e) => {
                    e.preventDefault()
                  },
                  onClick: (e) => {
                    this.props.showModal('changeDepartment', {
                      departmentsIsDefault: userOrGroup.department !== null ? [userOrGroup.department] : [],
                      closeModal: (value) => {
                        formChange('userOrGroup.department', value.length > 0 ? value[0] : null)
                      }
                    })
                  },
                  className: "textarea"
                }}
              />
            </div>
          </div>
        </div>
        <div className="create_doc_modal-content decision clearfix">
          <div className="column fl">
            <div className="column_content">
              <span className="create_doc_modal-content-title">{translate('PERSONNEL_NUMBER')}</span>
              <Field
                name="userOrGroup.employeeNumber"
                component={Input}
                type='text'
                inputProps={{
                  className: "input bord_radius3"
                }}
              />
            </div>
          </div>
          <div className="column fr">
            <div className="column_content">
              <span className="create_doc_modal-content-title">{translate('USER_TYPE')}</span>
              <Field
                name="userOrGroup.userType"
                component={Select}
                labelKey={'name'}
                valueKey={'value'}
                translate={true}
                type='select'
                options={userType}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

Information.contextTypes = {
  t: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = dispatch => bindActionCreators({
  showModal: show
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Information);
