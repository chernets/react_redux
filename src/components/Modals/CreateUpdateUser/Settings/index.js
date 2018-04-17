import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Field } from 'react-final-form'
import Input from '../../../FormComponents/Input'
import Checkbox from '../../../FormComponents/Checkbox'
import { hasRole } from '../../../../utils/roles'
class Settings extends Component {
  constructor(props) {
    super(props)
  }

  // shouldComponentUpdate(nextProps) {
  //   return !_.isEqual(nextProps.sc, this.props.sc)
  // }

  render() {
    const translate = this.context.t
    const { userOrGroup } = this.props
    return (
      <React.Fragment>
        <div className="create_doc_modal-content decision user-profile-info" style={{ marginTop: '30px' }}>
          <div className="clearfix">
            <div className="column_content fl">
              <div className="user_profile-ava">
                <div className="msg-ava">
                  <img src={userOrGroup.getAvatar()} />
                </div>
              </div>
            </div>
            <div className="column_content user_profile-cred fl">
              {hasRole('ADMIN_USER_UPDATE') && <div className="clearfix">
                <div className="user_profile-cred-fio fl">
                  <span className="create_doc_modal-content-title">{translate('LOGIN')}*</span>
                  <Field
                    name="login"
                    component={Input}
                    type='text'
                    inputProps={{
                      className: "input"
                    }}
                  />
                </div>
                {userOrGroup.id !== null &&
                  <div className="fr">
                    <span className="create_doc_modal-content-title">&nbsp;</span>
                    <button type="button" className="btn_cancel btn_edit" >{translate('TRANSFER_CASES')}</button>
                  </div>}
                {hasRole('ADMIN_USER_PASSWORD_UPDATE') && userOrGroup.id !== null &&
                  <div className="fr">
                    <span className="create_doc_modal-content-title">&nbsp;</span>
                    <button type="button" className="btn_cancel btn_edit btn_auto-width" >{translate('RESET_THE_PASSWORD')}</button>
                  </div>
                }
              </div>}
              {hasRole('ADMIN_USER_PASSWORD_UPDATE') && [
                <div className="user_profile-access" key='haveAccess'>
                  <Field name="userOrGroup.haveAccess" component={Checkbox}
                    inputProps={{
                      type: 'checkbox'
                    }}
                    id='haveAccess'
                    label={translate('ALLOW_ACCESS_TO_THE_SYSTEM')}
                    type="checkbox" />
                </div>,
                <div className="user_profile-access" key='endlessPassword'>
                  <Field name="userOrGroup.endlessPassword" component={Checkbox}
                    inputProps={{
                      type: 'checkbox'
                    }}
                    id='endlessPassword'
                    label={translate('PASSWORD_NEVER_EXPIRES')}
                    type="checkbox" />
                </div>,
                <div className="user_profile-access" key='needChangePassword'>
                  <Field name="userOrGroup.needChangePassword" component={Checkbox}
                    inputProps={{
                      type: 'checkbox'
                    }}
                    id='needChangePassword'
                    label={translate('CHANGE_THE_PASSWORD_THE_NEXT_TIME_YOU_LOG_IN')}
                    type="checkbox" />
                </div>,
              ]}
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

Settings.contextTypes = {
  t: PropTypes.func.isRequired
}

export default Settings