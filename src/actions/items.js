import { database, storage } from '../database';
import ActionTypes from './types';

export function itemsHasErrored(bool) {
  return {
    type: ActionTypes.ITEMS_HAS_ERRORED,
    hasErrored: bool
  };
}

export function itemsIsLoading(bool) {
  return {
    type: ActionTypes.ITEMS_IS_LOADING,
    isLoading: bool
  };
}

export function itemsFetchDataSuccess(items) {
  return {
    type: ActionTypes.ITEMS_FETCH_DATA_SUCCESS,
    items
  };
}

export function addItemSuccess(itemToSave) {
	if (itemToSave) {
	  return {
	    type: ActionTypes.ADD_ITEM_SUCCESS,
	    itemToSave
	  };
	} else {
		return {
	  	type:	ActionTypes.CLEAR_ADD_ITEM_SUCCESS,
	  	items: null,
	  }
	}
}

export function itemToEdit(item) {
	return (dispatch) => {
		type: ActionTypes.ITEM_TO_EDIT,
		item
	}
}

export function removeItemSuccess(itemToRemove) {
	if (itemToRemove) {
	  return {
	    type: ActionTypes.REMOVE_ITEM_SUCCESS,
	    itemToRemove
	  }
  } else {
	  return {
	  	type:	ActionTypes.CLEAR_REMOVE_ITEM_SUCCESS,
	  	items: null
	  }
  }
}

export function itemsFetchData(url) {
  return (dispatch) => {
	  dispatch(itemsIsLoading(true));

		return database.ref('Meals')
		.once('value', snap => {
      const items = snap.val();
			dispatch(itemsFetchDataSuccess(items))
			dispatch(itemsIsLoading(false));
		}).catch((err) => {
			console.log('error',err)
			dispatch(itemsHasErrored(true))
		})
	}
}

export function addItem(newItem, isNew) {
	return (dispatch) => {

	  let id = null;
	  if (isNew) {
	  	id = (Math.random()*999999).toFixed(0)
	  } else {
		  id = newItem.id
	  }
	  
	  // if there's a recipe file to upload from the form:
	  if (newItem.recipeFile) {
	  	var storageRef = storage.ref()
	  
			const file = newItem.recipeFile[0];
			const metadata = {
				contentType: newItem.recipeFile[0].type,
			};
			let recipeFile = {};
			// save the file to firebase storage
			var uploadTask = storageRef.child('images/'+newItem.recipeFile[0].name).put(file, metadata)
			.then((result, error) => {
				if (result) {
					console.log('saved to storage')
					recipeFile = { url: result.a.downloadURLs[0], type: result.a.contentType }
					doDatabaseSave(recipeFile)
				}
			})	
		} else {
			 doDatabaseSave(null);
		}
			  
		function doDatabaseSave(recipeFile) {
			// parse textfield and convert newlines to html linebreakss
		  newItem.notes = newItem.notes ? newItem.notes.replace(/\r?\n/g, '<br />') : null;
		  
		  let itemToSave = {
			  id: id,
			  timeUpdated: new Date().getTime(),
			  title: newItem.title,
			  path: newItem.title.split(' ').join('-'),
			  cuisineType: newItem.cuisineType || 'American',
			  imageUrl: newItem.imageUrl || '/assets/placeholderMeal.jpg',
			  bookName: newItem.bookName || null,
			  bookPageNo: newItem.bookPageNo || null,
			  webUrl: newItem.webUrl || null,
			  recipeFile: recipeFile || null,
			  notes: newItem.notes
		  }
	
			return database.ref('Meals').child(id).set(itemToSave)
			.then((error) => {
				if (error) {
					dispatch(addItemHasErrored(true))
				} else {
					dispatch(addItemSuccess(itemToSave))
				}
			})
		}
	}
}

export function deleteItem(itemToRemove) {
	return (dispatch) => {
		return database.ref('Meals').child(itemToRemove.id).remove()
		.then((error) => {
			if (error) {
				dispatch(removeItemHasErrored(true))
			} else {
				dispatch(removeItemSuccess(itemToRemove))
			}
		})
	}
}
