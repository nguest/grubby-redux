import createReducer from '../lib/createReducer';
// import * as types from '../actions/types';
import { store } from '../store';

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
	let newState = {}
	switch (action.type) {
		case 'ITEMS_FETCH_DATA_SUCCESS':
		  return action.items;
		case 'ADD_ITEM_SUCCESS':
			console.log('reducer', action.itemToSave)
			let newItem = action.itemToSave
			let id  = action.itemToSave.id
			newState = {}
			if (store.getState().items) {
				console.log('store.getState().items',store.getState().items)
				let items = store.getState().items;
				//items = Object.assign({}, items, {id: newItem})
				items[id] = newItem;
				newState.items = items;
				newState = Object.assign({}, state, newState.items)
				console.log('newState',newState)
				return newState;
			} else {
				return state;
			}
 		case 'REMOVE_ITEM_SUCCESS':
			let deletedItem = action.itemToRemove
			id = action.itemToRemove.id
			newState = {}
			if (store.getState().items) {
				console.log('store.getState().items',store.getState().items)
				let thestate = Object.assign({}, store.getState());
				delete thestate.items[id];
				console.log('thestate',thestate)
				newState = Object.assign({}, thestate)
				console.log('newState',newState)
				return newState.items;
			} else {
				return state;
			}

		default:
		  return state;
	}
}

/*
case 'USERS_ADD_SAVE':
      const user = action.user;
      user.id = user.id || Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
      return [...state, user];
*/


export function addItemSuccess(state = [], action) {
	console.log(state)
	switch (action.type) {
		case 'ADD_ITEM_SUCCESS':
		  return {status: true, item: action.itemToSave} ;
		case 'CLEAR_ADD_ITEM_SUCCESS':
      return {status: false, item: null };
		default:
		  return state;
	}
}

export function removeItemSuccess(state = {status:false,item: {}}, action) {
	switch (action.type) {
    case 'REMOVE_ITEM_SUCCESS':
      return {status: true, item: action.itemToRemove };
    case 'CLEAR_REMOVE_ITEM_SUCCESS':
      return {status: false, item: null };
    default:
      return state;
	}
}
