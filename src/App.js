import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import { db } from "./firebase";

// WE ARE USING REAL-TIME DATABASE

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button } from "@material-ui/core";

// Beginning of material ui styles; this is copued and pasted from https://material-ui.com/components/modal/#modal

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

function App() {
	const classes = useStyles();
	// In the material ui styles,
	// the makestyles Hook (which has sthe styles) is stored in the useStyles variable.
	// Here, the useStyles variable is stored in the variable 'classses'

	const [modalStyle] = useState(getModalStyle);

	const [posts, setPosts] = useState([]);
	// When you are using the firebase data base to import all the data,
	// we don't have to insert the data in the use useState (see commits from aug 19, on info on how to use useState).
	// Instead you just need to have the single line: const [posts, setPosts] = useState([]);
	const [open, setOpen] = useState(false);
	// this is for managing the modal
	// a modal is a popup that appears on click
	// for this app, when the modal popup occurs it will be the box where the user types his username and password

	useEffect(
		// UseEffect runs a piece of code based on a specific condition
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

	return (
		<div className="app">
			<Modal open={open} onClose={() => setOpen(false)}>
				{/* OnClose is listening for any clicks outside of the modal.
					Every time that you click outside of the modal 
					the state of the modal will be set to false (i.e, the modal will close).
					The logic operating inside of the 'onClose' function is handled by material U.I.
				*/}
				<div style={modalStyle} className={classes.paper}>
					<h2>I am a modal</h2>
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
