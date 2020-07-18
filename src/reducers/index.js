import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { items, itemsHasErrored, itemsIsLoading, addItemSuccess, removeItemSuccess } from './items';

export const reducers = combineReducers({
  form: formReducer,
  routing: routerReducer,
  items,
  itemsHasErrored,
  itemsIsLoading,
  addItemSuccess,
  removeItemSuccess,
});
