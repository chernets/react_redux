import React from 'react';
import { render } from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import store from './store/configureStore';
import Root from './containers/Root';

import { URL, AVATAR} from './constant/server'

window.avatarUrl = URL+AVATAR;
const history = createHistory();

render(
  <Root store={store} history={history} />,
  document.getElementById('root')
);
