import createReducer from '../lib/createReducer';
import { store } from '../store';
import ActionTypes from '../actions/types';

export function itemsHasErrored(state = false, action) {
  switch (action.type) {
  case ActionTypes.ITEMS_HAS_ERRORED:
    return action.hasErrored;
  default:
    return state;
  }
}

export function itemsIsLoading(state = false, action) {
  switch (action.type) {
  case ActionTypes.ITEMS_IS_LOADING:
    return action.isLoading;
  default:
    return state;
  }
}

export function items(state = [], action) {
  let newState = {};
  switch (action.type) {
  case ActionTypes.ITEMS_FETCH_DATA_SUCCESS:
    return action.items;

  case ActionTypes.ADD_ITEM_SUCCESS:
    //const newItem = action.itemToSave;
    let { id } = action.itemToSave;
    newState = {};
    if (store.getState().items) {
      const { items } = store.getState();
      items[id] = newItem;
      newState.items = items;
      newState = { ...state, ...newState.items };
      return newState;
    }
    return state;

  case ActionTypes.REMOVE_ITEM_SUCCESS:
    const deletedItem = action.itemToRemove;
    id = action.itemToRemove.id;
    newState = {};
    if (store.getState().items) {
      const thestate = { ...store.getState() };
      delete thestate.items[id];
      newState = { ...thestate };
      return newState.items;
    }
    return state;

  default:
    return state;
  }
}

export function addItemSuccess(state = [], action) {
  switch (action.type) {
  case ActionTypes.ADD_ITEM_SUCCESS:
    return { status: true, item: action.itemToSave };
  case ActionTypes.CLEAR_ADD_ITEM_SUCCESS:
    return { status: false, item: null };
  default:
    return state;
  }
}

export function removeItemSuccess(state = { status: false, item: {} }, action) {
  switch (action.type) {
  case ActionTypes.REMOVE_ITEM_SUCCESS:
    return { status: true, item: action.itemToRemove };
  case ActionTypes.CLEAR_REMOVE_ITEM_SUCCESS:
    return { status: false, item: null };
  default:
    return state;
  }
}
