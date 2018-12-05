import "@babel/polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { renderRoutes } from 'react-router-config';

import AppRoutes from './app_routes';
import appModeReducer from './reducers/app_mode_reducer';
import sideBarReducer from './reducers/side_bar_reducer';
import groupReducer from './reducers/group_reducer';

const store = createStore(
  combineReducers({
    appMode: appModeReducer,
    sideBar: sideBarReducer,
    groups: groupReducer
  }),
  window.INITIAL_STATE,
  applyMiddleware(thunk)
);

window.showStateDev = () => {
  console.log('getState', store.getState());
}

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <div>{renderRoutes(AppRoutes)}</div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('#root'));