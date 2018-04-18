import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class UserOrGroupView extends Component {

  render() {
    const { userOrGroup } = this.props
    return (
      <div className="access_person-block">
        <div className="access_person">
          <div className="lefbar_profile_user_img">
            <img className="lefbar_profile_user_ava" src={userOrGroup.getAvatar()} alt='avatar' />
          </div>
          <div className="access_person_contact">
            <a className="access_person-name underline">
              {userOrGroup.getFioFull()}
            </a>
            <p className="access_person-desc">{userOrGroup.position}</p>
          </div>
        </div>
      </div>
    )
  }
}

UserOrGroupView.propTypes = {
  userOrGroup: PropTypes.instanceOf(UserOrGroup).isRequired
}