import firebase from 'firebase';
import config from './firebaseConfig';

firebase.initializeApp(config);
const database = firebase.database();
const storage = firebase.storage();

export { database, storage };
