import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import { db } from "./firebase";
import { auth } from "firebase";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button, Input } from "@material-ui/core";

// Beginning of material ui styles;
// this is copied and pasted from https://material-ui.com/components/modal/#modal

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`
	};
}

const useStyles = makeStyles((theme) => ({
	paper: {
		position: "absolute",
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3)
	}
}));

// end of material ui styles

// -----------------------------------------------END OF IMPORTS

function App() {
	//

	const classes = useStyles();
	// In the material ui styles,
	// the makestyles Hook (which has the styles) is stored in the useStyles variable.
	// Here, the useStyles variable is stored in the variable 'classses'

	// -------------- ALL USESTATES BELOW

	const [modalStyle] = useState(getModalStyle);
	// This is for the modal from material ui

	const [open, setOpen] = useState(false);
	// this is for managing the modal
	// a modal is a popup that appears on click
	// for this app, when the modal popup occurs
	// it will be the box where the user types his username and password

	const [posts, setPosts] = useState([]);
	// When you are using the firebase data base to import all the data,
	// we don't have to insert the data in the use useState (see commits from aug 19, on info on how to use useState).
	// Instead you just need to have the single line: const [posts, setPosts] = useState([]);
	// (posts)  The constant posts contains an array
	// (setPosts) And we declare that we will mainpulate this array
	// By wrapping the array in a UseState()

	const [username, setUsername] = useState([]);
	// (username) The constant username contains an array
	// (setUsername) And we declare that we will mainpulate this array
	// By wrapping the array in a UseState()
	// this is an input-field in the form (which is in the modal)
	// the input field is imported vial material ui

	const [email, setEmail] = useState([]);
	// (email)  The constant email contains an array
	// (setEmail) And we declare that we will mainpulate this array
	// By wrapping the array in a UseState()
	// this is an input-field in the form (which is in the modal)
	// the input field is imported vial material ui

	const [password, setPassword] = useState([]);
	// (password) The constant password contains an array
	// (setPassword) And we declare that we will mainpulate this array
	// By wrapping the array in a UseState()
	// this is an input-field in the form (which is in the modal)
	// the input field is imported vial material ui

	const [user, setUser] = useState(null);
	// this will keep track of the user

	// ----------FIRST USE EFFECT BELOW - UseEffect runs a piece of code based on a specific condition

	useEffect(() => {
		const unsubscribe = auth().onAuthStateChanged((authUser) => {
			// this is going to listen, and it gives us something called an 'authuser'
			// this will fire off every single time any authentication change happens
			// (ex: logging in, loggin out, creating user, deleting user, etc)
			if (authUser) {
				// if the user has logged in
				console.log(authUser);
				// console.log that that user is logged in
				setUser(authUser);
				// capture that user inside of our state.
				// This also ensures that user data survives refresh.
				// Ex: if max is logged in and then he refreshed,
				// react will be able to see that hes still logged in, because it uses cookie tracking
				// and then it would set the state(as being logged in).
			} else {
				// if the user has logged out
				setUser(null);
				// set the user to null
			}
		});

		return () => {
			// perform some cleanup actions

			unsubscribe();
		};

		// Unlike the next useEffect below
		// we don't want to run this code only once when the app component loads, and don't run it again.
		// In this situation, since we are repeteadly updating the user and username,
		// we want this useEffect to be fired of everytime the user/username changes.
		// Hence, we have to the include them as dependencies.
	}, [user, username]);

	// -----------SECOND USE EFFECT BELOW

	useEffect(
		() => {
			// this is where the code runs
			db.collection("posts").onSnapshot((snapshot) => {
				// Get the posts inside firebase
				// Use onsnapshot
				// Onsnapshot is a really powerful listener
				// every single time the data base changes in that collection,
				// every single time a document gets added, modified, changed inside a post,
				// a camera is going to take a snapshot of exactly what that data collection looks like
				setPosts(
					snapshot.docs.map((doc) => ({
						// from that snapshot, get all documents, map through every single document((snapshot.docs.map((doc))
						id: doc.id,
						// get the documents id  (in firebase database, the id is the number under the add document tab)
						post: doc.data()
						// get the document data (doc.data) --> data includes each docs properties and values (caption, username, image, etc )
					}))
				);
			});
		},
		// the below line means: whenever the page refreshs, and the conditional is satisfied,
		// run this code once when the app component loads, and don't run it again.
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	// -----------

	const signUp = (event) => {
		// this is the firebase authentication

		event.preventDefault();
		// this stops the form for refreshing/reloading

		auth()
			.createUserWithEmailAndPassword(email, password)
			// this line gives you the ability to create a new user and password

			.then((authUser) => {
				// then if we just created a new user
				// and in our state we have the username that we just typed in
				// go to the user that you just logged in with
				// update their profile and set the displayname
				authUser.user.updateProfile({
					displayName: username
				});
			})

			.catch((error) => alert(error.message));
		// if there are any errors, then make an alert
	};

	// --------------

	return (
		<div className="app">
			<Modal open={open} onClose={() => setOpen(false)}>
				{/* OnClose is listening for any clicks outside of the modal.
					Every time that you click outside of the modal 
					the state of the modal will be set to false (i.e, the modal will close).
					The logic operating inside of the 'onClose' function is handled by material U.I.
				*/}
				<div style={modalStyle} className={classes.paper}>
					<form>
						<center className="app_signup">
							{/* the center tag will ensure that everything is centered */}
							{/* this is the content that appears inside the modal */}
							<img
								className="app_headerImage"
								src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
								alt=""
							/>
							<Input
								type="text"
								placeholder="username"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
							<Input
								type="text"
								placeholder="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<Input
								type="text"
								placeholder="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<Button type="submit" onClick={signUp}>
								Sign up
							</Button>
						</center>
					</form>
				</div>
			</Modal>

			<div className="app_header">
				<img
					className="app_headerImage"
					src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
					alt=""
				/>
			</div>

			<Button onClick={() => setOpen(true)}> Sign up </Button>
			{/* This is the modal button  */}

			<h1>On the gram</h1>

			{posts.map(({ id, post }) => (
				// map through posts, grab each document id, and document post
				<Post
					// posts each documents id and post-data (properties and values) incrementally
					key={id}
					// we are not displaying the id
					// adding the id ensures that react only refreshes new posts
					// For example: if you have 99 posts, and you add a new post,
					// then all 100 will not get refreshed when the page reloads.
					// Instead, react (via the virtual dom) is going to:
					// [a] keep the old posts on the page (without refreshing them)
					// [b] add the new post to the page
					username={post.username}
					caption={post.caption}
					imageUrl={post.imageUrl}
				/>
			))}
		</div>
	);
}

export default App;
