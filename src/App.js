import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import { db } from "./firebase";
import { auth } from "firebase";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button, Input } from "@material-ui/core";
import ImageUpload from "./ImageUpload";
// import InstagramEmbed from "react-instagram-embed";

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

//! -----------------------------------------------END OF IMPORTS

function App() {
	//

	const classes = useStyles();
	// In the material ui styles,
	// the makestyles Hook (which has the styles) is stored in the useStyles variable.
	// Here, the useStyles variable is stored in the variable 'classses'

	//! -------------- ALL USESTATES BELOW

	const [posts, setPosts] = useState([]);
	// When you are using the firebase data base to import all the data,
	// we don't have to insert the data in the use useState (see commits from aug 19, on info on how to use useState).
	// Instead you just need to have the single line: const [posts, setPosts] = useState([]);
	// (posts)  The constant posts contains an array
	// (setPosts) And we declare that we will mainpulate this array
	// By wrapping the array in a UseState()

	const [modalStyle] = useState(getModalStyle);
	// This is to get the modal styles from material ui

	const [openSignUp, setOpenSignUp] = useState(false);
	// (openSignUp)  The constant openSignUp is not being rendered/used
	// (setOpenSignUp) And we declare that we will mainpulate the values stored in this constant after its rendered
	// By wrapping it in a UseState()
	// This is for signing up a new user via the modal.
	// The modal is a popup that appears when the Sign up button is clicked.
	// When the modal popup occurs, it will contain a form,
	// where the user can sign up with his username, email, and password.

	const [openSignIn, setOpenSignIn] = useState(false);
	// (openSignIn)  The constant openSignIn is not being rendered/used
	// (setOpenSignIn) And we declare that we will mainpulate the values stored in this constant after its rendered
	// By wrapping it in a UseState()
	// This is for signing in an old user via the modal.
	// The modal is a popup that appears when the Sign in button is clicked.
	// When the modal popup occurs, it will contain a form,
	// where the user can sign in with his username and password

	const [username, setUsername] = useState("");
	// (username) The constant username contains a string
	// (setUsername) And we declare that we will mainpulate this string
	// By wrapping the string in a UseState()
	// this is an input-field in the form (which is in the modal)
	// the input field is imported vial material ui

	const [email, setEmail] = useState("");
	// (email)  The constant email contains a string
	// (setEmail) And we declare that we will mainpulate this string
	// By wrapping the string in a UseState()
	// this is an input-field in the form (which is in the modal)
	// the input field is imported vial material ui

	const [password, setPassword] = useState("");
	// (password) The constant password contains a string
	// (setPassword) And we declare that we will mainpulate this string
	// By wrapping the string in a UseState()
	// this is an input-field in the form (which is in the modal)
	// the input field is imported vial material ui

	const [user, setUser] = useState(null);
	// this will keep track of the user
	// CHANGE THIS TO SIGNEDINUSER

	//! ----------FIRST USE EFFECT BELOW - UseEffect runs a piece of code based on a specific condition

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

	//! -----------SECOND USE EFFECT BELOW - UseEffect runs a piece of code based on a specific condition

	useEffect(
		() => {
			// this is where the code runs
			db.collection("posts")
				// Get the posts inside firebase
				.orderBy("timestamp", "desc")
				// order the posts based on timestamp in descending order (top post = most recent post)
				.onSnapshot((snapshot) => {
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
		// run this code only once when the app component loads, and don't run it again.
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	//! -----------BELOW IS THE SIGN UP FUNCTION - THIS IS USED TO SIGN NEW USERS UP

	const signUp = (event) => {
		// The variable sign up stores the code that will signup new users, via the firebase authentication

		event.preventDefault();
		// this stops the form for acting weird

		auth()
			.createUserWithEmailAndPassword(email, password)
			// this line gives you the ability to create a new user and password

			.then((authUser) => {
				// then if we just created a new user
				// and in our state we have the username that the user just typed in
				// go to the user that you just logged in with
				// update their profile and set the displayname as the username
				authUser.user.updateProfile({
					displayName: username
				});
			})

			.catch((error) => alert(error.message));
		// if there are any errors, then make an alert
	};

	//! -----------BELOW IS THE SIGN IN FUNCTION - THIS IS USED TO SIGN REGISTERED USERS IN

	const signIn = (event) => {
		// The variable signIn stores the code that will sign in registered users, via the firebase authentication

		event.preventDefault();
		// this stops the form for acting weird

		auth()
			.signInWithEmailAndPassword(email, password)
			// this line gives you the ability to sign in a user, via their email and password

			.catch((error) => alert(error.message));
		// if there are any errors, then make an alert

		setOpenSignIn(false);
		// after we sign in, we don't want the sign in modal to be open
		// so setOpenSignIn(false); will close the modal once you sign in
	};

	// --------------

	return (
		<div className="app">
			<Modal open={openSignUp} onClose={() => setOpenSignUp(false)}>
				{/* This is the Sign Up modal. It will popup when the signup button is clicked.
						OnClose is listening for any clicks outside of the modal.
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
								// onChange is a function that fires of an event
								// (e.target.value) the event will target the value (i.e, grab the typed username)
								// (setUsername) and store this value as the username
							/>
							<Input
								type="text"
								placeholder="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								// onChange is a function that fires of an event
								// (e.target.value) the event will target the value (i.e, grab the typed email)
								// (setEmail) and store this value as the users email
							/>
							<Input
								type="text"
								placeholder="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								// onChange is a function that fires of an event
								// (e.target.value) the event will target the value (i.e, grab the typed password)
								// (setPassword) and store this value as the users password
							/>
							<Button type="submit" onClick={signUp}>
								Sign up
							</Button>
						</center>
					</form>
				</div>
			</Modal>

			<Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
				{/* This is the Sign in modal. It will popup up when the sign in buttton is clicked.
						OnClose is listening for any clicks outside of the modal.
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
								placeholder="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								// onChange is a function that fires of an event
								// (e.target.value) the event will target the value (i.e, grab the typed email)
								// (setEmail) and store this value as the users email
							/>
							<Input
								type="text"
								placeholder="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								// onChange is a function that fires of an event
								// (e.target.value) the event will target the value (i.e, grab the typed password)
								// (setPassword) and store this value as the users password
							/>
							<Button type="submit" onClick={signIn}>
								Sign In
							</Button>
						</center>
					</form>
				</div>
			</Modal>

			{/* THE ABOVE MODALS ARE NOT VISIBLE - THEY ONLY APPEAR WHEN THE BUTTONS ASSOCIATED WITH THEM ARE CLICKED */}
			{/* The ACTUAL CONTENT ON THE PAGE BEGINS HERE */}

			<div className="app_header">
				<img
					className="app_headerImage"
					src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
					alt=""
				/>

				{user ? (
					// if the user is logged in then

					<Button onClick={() => auth().signOut()}> Sign out </Button> // display a Sign out button - this button will use the firebase 'auth().signOut' to sign out the user.
				) : (
					// OR if the user is not logged in  then
					<div className="app_loginContainer">
						<Button onClick={() => setOpenSignIn(true)}> Sign in </Button>
						{/* Display a sign in button */}
						{/* When its clicked the OpenSignIn modal will popup. */}
						{/* This modal will use the signIn function to sign a user in */}

						<Button onClick={() => setOpenSignUp(true)}> Sign up </Button>
						{/* Display a sign up button  */}
						{/* When its clicked the OpenSignUp modal will popup. */}
						{/* This will use the signUp function to sign a user up  */}
					</div>
				)}
			</div>

			<div className="app_posts">
				<div className="app_postsLeft">
					{posts.map(({ id, post }) => (
						// map through posts, grab each document id, and document post
						<Post
							// posts each documents id and post-data (properties and values) incrementally
							key={id}
							// Adding the id ensures that react only refreshes new posts
							// For example: if you have 99 posts, and you add a new post,
							// then all 100 will not get refreshed when the page reloads.
							// Instead, react (via the virtual dom) is going to:
							// [a] keep the old posts on the page (without refreshing them)
							// [b] add the new post to the page
							postId={id}
							// (in firebase database, the postId is the number under the add document tab)
							// each post has a specific number associated with
							user={user}
							// this is the user who signed in
							// it is not limited to the user who posted an image
							// ex: if a user who signed in to only comment, then this would be able to grab that user
							username={post.username}
							caption={post.caption}
							imageUrl={post.imageUrl}
						/>
					))}
				</div>
				{/* <div className="app_postsRight">
					<InstagramEmbed
						url="https://instagr.am/p/Zw9o4/"
						maxWidth={320}
						hideCaption={false}
						containerTagName="div"
						protocol=""
						injectScript
						onLoading={() => {}}
						onSuccess={() => {}}
						onAfterRender={() => {}}
						onFailure={() => {}}
					/>
				</div> */}
			</div>

			{/* In the App, there is a image upload component.
			This allows the user to upload a new image and caption to the page.
			We only want to display the image upload component,
			if they user is logged in. If they user is not logged in,
			we want to tell the user to either sign up or login.*/}

			{user?.displayName ? (
				// If the username is being displayed (i.e, user is logged in)
				// Even if the User might be undefined (we have inserted the optional (?) to deal with a potentialy undefined user)
				// The optional says: if this is not there, then don't freak out and break

				<ImageUpload username={user.displayName} /> // then display the image upload component
			) : (
				// OR --> if the this is not the case

				<h3> Login to upload</h3>
				// display this h3 tag
			)}
		</div>
	);
}

export default App;
