import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form'
import Input from '../../../FormComponents/Input'
import Checkbox from '../../../FormComponents/Checkbox'
import TextArea from '../../../FormComponents/TextArea'
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
                name="userOrGroup.department.path"
                className="input bord_radius3"
                component={TextArea}
                type="text"
                inputProps={{
                  style: {
                    height: '92px'
                  },
                  onKeyDown: (e) => {
                    e.preventDefault()
                  },
                  onClick: (e) => {
                    console.log(e)
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

export default Information