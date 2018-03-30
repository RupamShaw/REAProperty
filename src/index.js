import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import { createStore } from 'redux'
import  rootReducer  from './reducers'
import { Provider } from 'react-redux'

import { setData } from './actions'
import './styles/index.css';
import App from './components/App';
import data from './datasource/data.json'

const store = createStore(rootReducer)
store.subscribe(() =>console.log('store state',store.getState()))
store.dispatch(setData(data))
ReactDOM.render(<Provider store={store}>< App /></Provider>, document.getElementById('root'))
registerServiceWorker();
