import * as actions from '../../actions/Modals'


const initValues = {
  isFetching: true,
  sc: [],
  groups: [],
  roles: [],
  transportTypes: [],
  notification: [],
  delegates: [],
  isSaving: false,
  close: false,
  error: null
}
export default (state = initValues, action) => {
  switch (action.type) {
    case actions.createUpdateUser.CUU_ROLES_SUCCESS:
      return {
        ...state,
        roles: action.payload
      }
    case actions.createUpdateUser.CUU_GROUPS_SUCCESS:
      return {
        ...state,
        groups: action.payload
      }
    case actions.createUpdateUser.CUU_SC_SUCCESS:
      return {
        ...state,
        sc: action.payload
      }
    case actions.createUpdateUser.CUU_NTT_SUCCESS:
      return {
        ...state,
        transportTypes: action.payload
      }
    case actions.createUpdateUser.CUU_NC_SUCCESS:
      return {
        ...state,
        notification: action.payload
      }

    case actions.createUpdateUser.CUU_LOAD_VALUES_REQUEST:
      return {
        ...state,
        isFetching: true
      }

    case actions.createUpdateUser.CUU_LOAD_VALUES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ...action.payload
      }

    case actions.createUpdateUser.CUU_DEFAULT_VALUES_SUCCESS:
      return {
        ...initValues
      }
    case actions.createUpdateUser.CREATE_OR_UPDATE_REQUEST: {
      return {
        ...state,
        isSaving: true
      }
    }
    case actions.createUpdateUser.CREATE_OR_UPDATE_SUCCESS: {
      return {
        ...state,
        close: true,
        isSaving: false,
        error: null
      }
    }
    case actions.createUpdateUser.CREATE_OR_UPDATE_FAILURE: {
      return {
        ...state,
        isSaving: false,
        error: payload.err
      }
    }
    default:
      return state;
  }
}
