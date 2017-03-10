import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { browserHistory } from "react-router";
import { syncHistoryWithStore, routerMiddleware } from "react-router-redux";
import thunkMiddleware from 'redux-thunk';

import createLogger from 'redux-logger';

import { reducers } from "./reducers/index";

// add the middlewares
let middlewares = [];

// add the router middleware
middlewares.push(routerMiddleware(browserHistory));
const loggerMiddleware = createLogger()

middlewares.push(loggerMiddleware);

middlewares.push(thunkMiddleware);
// apply the middleware
let middleware = applyMiddleware(...middlewares);


// add the redux dev tools
if (process.env.NODE_ENV !== 'production' && window.devToolsExtension) {
  middleware = compose(middleware, window.devToolsExtension());
}

// create the store
const store = createStore(reducers, middleware);
const history = syncHistoryWithStore(browserHistory, store);

// export
export { store, history };


/*
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import {
  AppRegistry,
} from 'react-native';

import reducer from './app/reducers';
import AppContainer from './app/containers/AppContainer';

const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__})

function configureStore(initialState) {
	const enhancer = compose(
		applyMiddleware(
			thunkMiddleware,
			loggerMiddleware
		)
	)
	return createStore(reducer, initialState, enhancer);
}

const store = configureStore({});

const App = () => (
	<Provider store={store}>
		<AppContainer/>
	</Provider>
)

AppRegistry.registerComponent('AppName', () => App);
*/
