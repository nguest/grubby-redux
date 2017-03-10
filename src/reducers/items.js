import createReducer from '../lib/createReducer';
import * as types from '../actions/types';
import ApiMeals from '../api/meals';

export function itemsHasErrored(state = false, action) {
  switch (action.type) {
    case 'ITEMS_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function itemsIsLoading(state = false, action) {
  switch (action.type) {
		case 'ITEMS_IS_LOADING':
		console.log('loading')
		  return action.isLoading;
		default:
	  return state;
	}
}
export function items(state = [], action) {
	switch (action.type) {
		case 'ITEMS_FETCH_DATA_SUCCESS':
		  return action.items;
		case 'ITEM_TO_EDIT':
		  return action.item;
		default:
		  return state;
	}
}
export function addItemSuccess(state = {status:false,item: {}}, action) {
	switch (action.type) {
		case 'ADD_ITEM_SUCCESS':
		  return {status: true, item: action.itemToSave };
		default:
		  return state;
	}
}

export function removeItemSuccess(state = {status:false,item: {}}, action) {
	switch (action.type) {
    case 'REMOVE_ITEM_SUCCESS':
      return {status: true, item: action.itemToRemove };
    default:
      return state;
	}
}
