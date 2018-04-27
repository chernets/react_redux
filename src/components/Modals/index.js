import React, { Component } from 'react';


import Confirmation from './Confirmation'
import Profile from './Profile'
import CreateUpdateUser from './CreateUpdateUser'
import ChangeRoles from './ChangeRoles'
import ChangeSecurityClassifications from './ChangeSecurityClassifications'
import ChangeUserOrGroups from './ChangeUserOrGroups'
import CreateDelegate from './CreateDelegate'
import ChangeDepartment from './ChangeDepartment'
import AdminPassword from './AdminPassword'
class Modals extends Component {


  render() {
    return [
      <Confirmation key='confirmation' />,
      <Profile key='profile' />,
      <CreateUpdateUser key='createUpdateUser' />,
      <ChangeRoles key='changeRoles' />,
      <ChangeSecurityClassifications key='changeSecurityClassifications' />,
      <ChangeUserOrGroups key='changeUserOrGroups'/>,
      <CreateDelegate key='createDelegate'/>,
      <ChangeDepartment key='changeDepartment'/>,
      <AdminPassword key='adminPassword' />
    ]
  }
}

export default Modals