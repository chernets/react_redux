import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import * as asyncInitialState from 'redux-async-initial-state';
import { loadStore } from './asyncStore'
const router = routerMiddleware(createHistory());

const initialState = {
};

export default createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(thunk, router, asyncInitialState.middleware(loadStore)))
);

