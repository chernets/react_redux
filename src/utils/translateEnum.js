let userType = []
userType[UserType.CHIEF] = {
  name: 'HEAD_OF',
  value: UserType.CHIEF
}
userType[UserType.DEPUTY] = {
  name: 'DEPUTY',
  value: UserType.DEPUTY
}
userType[UserType.EMPLOYEE] = {
  name: 'EMPLOYEE',
  value: UserType.EMPLOYEE
}
userType[UserType.TECHNICAL] = {
  name: 'TECHNICAL',
  value: UserType.TECHNICAL
}


let fileStorageType = []
fileStorageType[FileStorageType.PRIMARY] = {
  name: 'PRIMARY',
  value: FileStorageType.PRIMARY
}
fileStorageType[FileStorageType.ARCHIVE] = {
  name: 'ARCHIVE',
  value: FileStorageType.ARCHIVE
}

let keyState = []
keyState[KeyState.LOADED] = {
  id: 'KeyState.LOADED',
  name: 'UPLOADED',
  value: KeyState.LOADED
};
keyState[KeyState.CONFIRM] = {
  name: 'CONFIRMED_1',
  id: 'KeyState.CONFIRM',
  value: KeyState.CONFIRM
};
keyState[KeyState.PROHIBITED] = {
  name: 'PROHIBITED',
  id: 'KeyState.PROHIBITED',
  value: KeyState.PROHIBITED
};

export {
  userType,
  fileStorageType,
  keyState
}