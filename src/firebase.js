import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
	apiKey: "AIzaSyDd8KSUe2F6AS2WXSqwKKIXLKDxKFfjtm4",
	// authDomain: "instagram-a3c9d.firebaseapp.com",
	authDomain: "https://elir-mahad.github.io/instagram/",
	databaseURL: "https://instagram-a3c9d.firebaseio.com",
	projectId: "instagram-a3c9d",
	storageBucket: "instagram-a3c9d.appspot.com",
	messagingSenderId: "729329518783",
	appId: "1:729329518783:web:0154d95c1eb23d02429e0a",
	measurementId: "G-Z3NXSRWP0Q"
});

const db = firebaseApp.firestore();
// to access the database - for storing data
const auth = firebase.auth();
// to access the authentication - for logging in and out
const storage = firebase.storage();
// to access the storage - for uploading content

export { firebase, db, auth, storage };
