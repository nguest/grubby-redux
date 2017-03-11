import { database, storage } from '../database';

export function itemsHasErrored(bool) {
  console.log('errored')
  return {
      type: 'ITEMS_HAS_ERRORED',
      hasErrored: bool
  };
}
export function itemsIsLoading(bool) {
  console.log('loading',bool)

  return {
    type: 'ITEMS_IS_LOADING',
    isLoading: bool
  };
}
export function itemsFetchDataSuccess(items) {
  return {
    type: 'ITEMS_FETCH_DATA_SUCCESS',
    items
  };
}

export function addItemSuccess(itemToSave) {
  return {
    type: 'ADD_ITEM_SUCCESS',
    itemToSave
  };
}

export function itemToEdit(item) {
	console.log('action',item)
	return (dispatch) => {
		type: 'ITEM_TO_EDIT',
		item
	}
}

export function removeItemSuccess(itemToRemove) {
  return {
    type: 'REMOVE_ITEM_SUCCESS',
    itemToRemove
  };
}


export function itemsFetchData(url) {

  return (dispatch) => {
	  dispatch(itemsIsLoading(true));

		return database.ref('Meals')
		.once('value', snap => {
      const items = snap.val();
      console.log('gotitems',items)
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
	  
	  
	  if (newItem.recipeFile) {
	  	var storageRef = storage.ref()
	  
			const file = newItem.recipeFile[0]; // use the Blob or File API
			const metadata = {
				contentType: newItem.recipeFile[0].type,
			};
			let recipeFile = {};
			var uploadTask = storageRef.child('images/'+newItem.recipeFile[0].name).put(file, metadata)
			.then((result, error) => {
				if (result) {
					console.log('result',result)			
					console.log('saved to storage')
					recipeFile = { url: result.a.downloadURLs[0], type: result.a.contentType }
					doDatabaseSave(recipeFile)
				}
			})
			
		} else {
			 doDatabaseSave(null);
		}
			  
		function doDatabaseSave(recipeFile) {
			console.log('recipeFile',recipeFile)
		  newItem.notes = newItem.notes ? newItem.notes.replace(/\r?\n/g, '<br />') : null
		  
		  
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
					console.log('error',error)
					dispatch(addItemHasErrored(true))
				} else {
					console.log('saved')
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
				console.log('error',error)
				dispatch(removeItemHasErrored(true))
			} else {
				console.log('removed')
				dispatch(removeItemSuccess(itemToRemove))
			}
		})

	}
}
