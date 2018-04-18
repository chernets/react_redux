import React, { Component } from 'react';


import Confirmation from './Confirmation'
import Profile from './Profile'
import CreateUpdateUser from './CreateUpdateUser'
import ChangeRoles from './ChangeRoles'
import ChangeSecurityClassifications from './ChangeSecurityClassifications'
import ChangeUserOrGroups from './ChangeUserOrGroups'
class Modals extends Component {


  render() {
    return [
      <Confirmation key='confirmation' />,
      <Profile key='profile' />,
      <CreateUpdateUser key='createUpdateUser' />,
      <ChangeRoles key='changeRoles' />,
      <ChangeSecurityClassifications key='changeSecurityClassifications' />,
      <ChangeUserOrGroups key='changeUserOrGroups'/>
    ]
  }
}

export default Modals