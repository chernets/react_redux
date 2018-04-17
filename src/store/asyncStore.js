
import { AuthService, UserManagementClient, kazFilter, filterItem, filterFieldType, filterCondition } from '../api'
import { ACCOUNTS_COUNT_FILTER } from '../constant/variables'

const getStore = async (refreshAuthSession, currentState, resolve, reject) => {
  let configRequest = await fetch('/assets/config.json')
  let config = await configRequest.json()
  let lang = localStorage.getItem('lang') || config.DEFAULT_LANG
  try {
    let filter = kazFilter({
      countFilter: ACCOUNTS_COUNT_FILTER,
      position: 0,
      items: []
    });
    let result = await Promise.all([
      fetch(`/assets/translate/${lang}.json`),
      AuthService.getInfo(),
      refreshAuthSession.id ? UserManagementClient.getAccounts(refreshAuthSession.id, filter) : []
    ])
    let translate = await result[0].json()
    let getInfo = result[1]
    let accounts = result[2]
    filter.items.push({
      field: 'NOT_SECURITY',
      value: 'NOT_SECURITY',
      fType: filterFieldType.STRING,
      condition: filterCondition.EQUAL
    })
    let accountsNotSecurity = refreshAuthSession.id ? await UserManagementClient.getAccounts(refreshAuthSession.id, filter) : []
    resolve({
      ...currentState,
      i18nState: {
        ...currentState.i18nState,
        lang: lang,
        translations: {
          ru: translate
        },
        list: config.LANGUAGES
      },
      auth: {
        ...currentState.auth,
        ...refreshAuthSession,
        token: refreshAuthSession.id || null,
        accounts,
        accountsNotSecurity
      },
      serverConfig: {
        ...getInfo,
        CHAT_ENABLED: getInfo.CHAT_ENABLED === 'true',
        MAX_FILE_SIZE: parseInt(getInfo.MAX_FILE_SIZE, 10),
        GIT_INFO: JSON.parse(getInfo.GIT_INFO),
        UNIQ_ID: JSON.parse(getInfo.UNIQ_ID)
      }
    })
  } catch (err) {
    localStorage.removeItem('token')
    if (err.preconditionExceptionKey === "WRONG_SESSION") {
      getStore(null, currentState, resolve, reject)
    } else {
      reject(err)
    }
  }
}

const loadStore = currentState => {
  return new Promise(async (resolve, reject) => {
    try {
      let refreshAuthSession = currentState.auth.token === null ? currentState.auth : await AuthService.refreshAuthSession(currentState.auth.token)
      getStore(refreshAuthSession, currentState, resolve, reject)
    } catch (error) {
      if (error.preconditionExceptionKey === "WRONG_SESSION") {
        localStorage.removeItem('token')
        getStore(currentState.auth, currentState, resolve, reject)
      } else {
        reject(error)
      }
    }
  })
}

export {
  loadStore
}