import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import List from './components/List/ListComponent.js';
import reducer from './../../reducers';
// render navbar here

const store = createStore(reducer,
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

console.log('store definition ', store.getState());
// ReactDOM.render(<Nav />, document.getElementById('root'));
ReactDOM.render(
<Provider store={store}>
  <List />
</Provider>, document.getElementById('root'));

export default store;