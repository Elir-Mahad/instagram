import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import { db } from "./firebase";
// WE ARE USING REAL-TIME DATABASE

function App() {
	const [posts, setPosts] = useState([]);
	// When you are using the firebase data base to import all the data,
	// we don't have to insert the data in the use useState (see commits from aug 19, on info on how to use useState).
	// Instead you just need to have the single line: const [posts, setPosts] = useState([]);

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
			<div className="app_header">
				<img
					className="app_headerImage"
					src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
					alt=""
				/>
			</div>
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
