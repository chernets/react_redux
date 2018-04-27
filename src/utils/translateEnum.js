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

export {
  userType,
  fileStorageType
}