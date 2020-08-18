import React, { useState } from "react";
import "./App.css";
import Post from "./Post";

function App() {
	const [posts, setPosts] = useState([
		// Here below we insert the posts data as properties and values

		{
			username: "Shinichi",
			caption: "Shiki Rhougi is fine demon",
			imageUrl:
				"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/96194524-6c05-4a18-96f2-da8361fde9ca/d6pal91-c0902af1-cbdf-4f14-bcb4-76a012c86948.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvOTYxOTQ1MjQtNmMwNS00YTE4LTk2ZjItZGE4MzYxZmRlOWNhXC9kNnBhbDkxLWMwOTAyYWYxLWNiZGYtNGYxNC1iY2I0LTc2YTAxMmM4Njk0OC5qcGcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.XJBAjJ8UFggXlEQrLgikRikEtep-HtSoACHC_YprwAs"
		},
		{
			username: "Meow",
			caption: "Wanna drink together",
			imageUrl:
				"https://cdna.artstation.com/p/assets/images/images/026/835/828/large/mineo-2020-05-14-tifa.jpg?1589864340"
		},
		{
			username: "Assata",
			caption: "Sando is queen",
			imageUrl:
				"https://cdnb.artstation.com/p/assets/images/images/029/426/453/large/vicki-saidge42-leversedge-leila-signature-1598.jpg?1597507982"
		}
	]);

	// Instead of hard coding posts, we want these to come from somewhere else.
	// State will help us do this. State is a short term memory inside react.

	// Posts will resemble an array of posts inside of our app.
	// In order to mainpulate these posts, you have to use setPosts.

	// Compared to jquery, react formats things a bit differently.
	// In jquery we could use this below format:
	// const posts = []; Here the constant posts stores an array
	// posts.append (''); Here we append the actual posts

	// In react we can store the array and append it by writing:
	// const [posts, setPosts] = UseState([]);
	// Here we state that:
	// The constant posts contains an array (posts)
	// And we declare that we will mainpulate this array (setPosts)
	// By wrapping the array in a UseState()

	// Key point: The mainpulation of the posts will happen in post.js
	// Therefore UseState(), in this situation, is way of declaring that the posts will get mainpulated,
	// and getting permission to run the mainpulations.

	// This is an example of a hook.
	// A hook is a small piece of code we can run.
	// Their really powerful and functional and they allow us to use things such as state.

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

			{posts.map((post) => (
				// loop through each post in the UseState
				<Post
					// posts each post (properties and values) incrementally
					username={post.username}
					caption={post.caption}
					imageUrl={post.imageUrl}
				/>
			))}
		</div>
	);
}

export default App;
