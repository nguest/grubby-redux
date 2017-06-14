import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { browserHistory } from "react-router";
import { syncHistoryWithStore, routerMiddleware } from "react-router-redux";
import thunkMiddleware from 'redux-thunk';

import createLogger from 'redux-logger';

import { reducers } from "./reducers/index";

let middlewares = [];

middlewares.push(routerMiddleware(browserHistory));
console.log('process.env.NODE_ENV',process.env.NODE_ENV	)
if (process.env.NODE_ENV != 'production') {
  const createLogger = require(`redux-logger`);
  const logger = createLogger();
  middlewares.push(logger);
}

middlewares.push(thunkMiddleware);

let middleware = applyMiddleware(...middlewares);


if (process.env.NODE_ENV !== 'production' && window.devToolsExtension) {
  middleware = compose(middleware, window.devToolsExtension());
}

// create the store
const store = createStore(reducers, middleware);
const history = syncHistoryWithStore(browserHistory, store);

export { store, history };

