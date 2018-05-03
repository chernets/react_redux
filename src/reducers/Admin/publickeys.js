import * as actions from '../../actions/Admin/publickeys'
import { keyState } from '../../utils/translateEnum'
import _ from 'lodash'
const initValues = {
  list: [],
  isFetching: false,
  keyStateFilter: _.find(keyState, { value: KeyState.LOADED }),
  error: null
}
export default (state = initValues, action) => {

  switch (action.type) {
    case actions.GET_ALL_PUBLIC_KEYS_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case actions.GET_ALL_PUBLIC_KEYS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        list: action.payload,
        error: null
      }
    case actions.SELECTED_FILTER_PUBLIC_KEYS:
      return {
        ...state,
        keyStateFilter: action.payload
      }
    case actions.CONFIRM_USER_PUBLIC_KEYS_FAILURE:
      return {
        ...state,
        error: action.payload
      }
    case actions.CONFIRM_USER_PUBLIC_KEYS_SUCCESS:
      return {
        ...state,
        error: null
      }
    case actions.CLEAN_STORE_REGISTRIES:
      return {
        ...initValues
      }
    default:
      return state;
  }
}
