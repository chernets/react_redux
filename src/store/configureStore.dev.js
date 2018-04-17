import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import rootReducer from '../reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as asyncInitialState from 'redux-async-initial-state';
import { loadStore } from './asyncStore'

const router = routerMiddleware(createHistory())

const initialState = {
  asyncInitialState: {
    loading: true
  }
}

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(
    compose(applyMiddleware(thunk, router, asyncInitialState.middleware(loadStore)))
  )
)



if (module.hot) {
  module.hot.accept('../reducers', () => {
    const nextRootReducer = require('../reducers/index').default
    store.replaceReducer(nextRootReducer)
  })
}

export default store;

