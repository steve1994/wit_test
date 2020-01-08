import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Menu from './components/Menu';
import * as serviceWorker from './serviceWorker';
import rootReducer from './reducers';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

const store = createStore(rootReducer,applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <Menu />
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
