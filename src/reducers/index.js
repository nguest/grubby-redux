import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as formReducer } from 'redux-form';
import * as itemsReducers from './items';
import { items, itemsHasErrored, itemsIsLoading, addItemSuccess, removeItemSuccess/* itemToEdit */ } from './items';

export const reducers = combineReducers({
	form: formReducer, 
  routing: routerReducer,
  items, 
  itemsHasErrored, 
  itemsIsLoading,
  addItemSuccess,
  removeItemSuccess
  //more reducers...
});