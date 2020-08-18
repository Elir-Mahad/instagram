import React from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";

function Post({ username, caption, imageUrl }) {
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
