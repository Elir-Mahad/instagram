import React, { useState, useEffect } from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
import { db } from "./firebase";

function Post({ postId, username, caption, imageUrl }) {
	//! -------------- ALL USESTATES BELOW

	const [comments, setComments] = useState([]);
	// (comments)  The constant comments contains an array
	// (setComments) And we declare that we will mainpulate this array
	// By wrapping the array in a UseState()

	//! --------------- USE EFFECT BELOW - for fetching comments

	// anytime a new comment is added to a specific post

	useEffect(() => {
		//
		let unsubscribe;
		if (postId) {
			// if there is a postId for the post on which the comment has occured then:
			unsubscribe = db
				// [a] access the database
				.collection("posts")
				// [b] access the collection called posts
				.doc(postId)
				// [c] access the post id of the post
				.collection("comments")
				// [d] access the comments inside the post
				.onSnapshot((snapshot) => {
					setComments(snapshot.docs.map((doc) => doc.data()));
					// [d] get a snapshot
				});
		}
		return () => {
			unsubscribe();
		};
		// we are using the postId variable inside the useEffect, and therefore we have to include it as a dependency below
	}, [postId]);

	return (
		<div className="post">
			<div className="post_header">
				{/* Below is the avatar and username*/}
				<Avatar
					className="post_avatar"
					// alt={username}
					alt="max"
					src="/static/images/avatar/1/.jpg"
				/>
				<h3>{username}</h3>
			</div>
			{/*  Below is the image */}
			<img className="post_image" src={imageUrl} alt="" />
			{/*  Below is the caption */}
			<h4 className="post_text">
				<strong>{username}</strong> {caption}
			</h4>
		</div>
	);
}

export default Post;
