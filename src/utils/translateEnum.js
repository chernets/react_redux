const mapToArray = (data, prefix = null) => {
  let array = []
  for (let menu in data) {
    array[data[menu]] = {
      id: `${prefix === null ? '' : prefix + '.'}${menu}`,
      name: menu,
      value: data[menu]
    }
  }
  return array
}

let userType = mapToArray(UserType)
userType[UserType.CHIEF].name = 'HEAD_OF'

let fileStorageType = mapToArray(FileStorageType)

let keyState = mapToArray(KeyState, 'KeyState')
keyState[KeyState.LOADED].name = 'UPLOADED'
keyState[KeyState.CONFIRM].name = 'CONFIRMED_1'

let filterFieldType = mapToArray(FilterFieldType)
let filterCondition = mapToArray(FilterCondition)

export {
  userType,
  fileStorageType,
  keyState,
  filterFieldType,
  filterCondition
}