import "babel-polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import Main from './Main'

const AppDom = document.getElementById('app');

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  AppDom
);