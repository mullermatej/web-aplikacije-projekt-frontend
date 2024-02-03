import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyAgnNt4A5c2GpvH04M9flyuq86zHYCT3OA',
	authDomain: 'walk-it-4c57e.firebaseapp.com',
	projectId: 'walk-it-4c57e',
	storageBucket: 'walk-it-4c57e.appspot.com',
	messagingSenderId: '736053495666',
	appId: '1:736053495666:web:667db2f9c5fb2c430e7feb',
	measurementId: 'G-4CH6H2E6KK',
};

firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();
let storage = firebase.storage();

export { firebase, db, storage };
