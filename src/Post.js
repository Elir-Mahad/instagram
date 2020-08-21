import React, { useState, useEffect } from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
import { db } from "./firebase";
import firebase from "firebase";

function Post({ postId, user, username, caption, imageUrl }) {
	//! -------------- ALL USESTATES BELOW

	const [comments, setComments] = useState([]);
	// (comments)  The constant comments contains an array
	// (setComments) And we declare that we will mainpulate this array
	// By wrapping the array in a UseState()
	const [comment, setComment] = useState("");

	//! --------------- USE EFFECT BELOW - for fetching comments

	// anytime a new comment is added to a specific post

	useEffect(() => {
		//
		let unsubscribe;
		if (postId) {
			// if there is a postId for the post on which the comment has occured then:
			unsubscribe = db
				// [a] enter the database
				.collection("posts")
				// [b] access the collection called posts
				.doc(postId)
				// [c] access the post id of the post
				.collection("comments")
				// [d] access the collection called comments inside the post
				.orderBy("timestamp", "desc")
				// [e] order the posts based on timestamp in descending order (top post = most recent post)
				.onSnapshot((snapshot) => {
					setComments(snapshot.docs.map((doc) => doc.data()));
					// [f] get a snapshot
				});
		}
		return () => {
			unsubscribe();
		};
		// we are using the postId variable inside the useEffect, and therefore we have to include it as a dependency below
	}, [postId]);

	const postComment = (event) => {
		// this function will be able to submit user comment in the database to that specific post
		event.preventDefault();

		db
			// [a] enter the database
			.collection("posts")
			// [b] access the collection called posts
			.doc(postId)
			// [c] access the post id of the post
			.collection("comments")
			// [d] access the collection called comments inside the post
			.add({
				// add to the post
				text: comment,
				// the comment
				username: user.displayName,
				// the username
				timestamp: firebase.firestore.FieldValue.serverTimestamp()
				// the timestamp - this is useful for storing all code based on the correct timing
			});
		setComment("");
	};

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
			{/* below is the comment */}
			<div className="post_comments">
				{comments.map((comment) => (
					// map/loop through each comment
					<p>
						<strong>{comment.username}</strong>
						{/* display the username */}
						{comment.text}
						{/* display the comment */}
					</p>
				))}
			</div>

			{user && (
				// if the user is logged in display the below comment box form
				<form className="post_commentBox">
					<input
						className="post_input"
						type="text"
						placeholder="Add a comment"
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						// onChange is a function that fires of an event
						// (e.target.value) the event will target the value (i.e, grab the typed comment)
						// (setComment) and store this value as the comment (i.e, line before onChange function)
					/>
					<button
						className="post_button"
						disabled={!comment}
						type="submit"
						onClick={postComment}
					>
						post
					</button>
				</form>
			)}
		</div>
	);
}

export default Post;
