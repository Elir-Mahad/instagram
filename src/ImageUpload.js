import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { storage, db } from "./firebase.js";
import { firebase } from "./firebase.js";
import "./ImageUpload.css";

function ImageUpload({ username }) {
	//! -------------- ALL USESTATES BELOW

	const [image, setImage] = useState(null);
	// (image) The constant image contains nothing
	// (setImage) And we declare that we will mainpulate whatever ends up inside it
	// By wrapping the string in a UseState()

	const [progress, setProgress] = useState(0);
	// (progress) The constant progress contains a number
	// (setProgress) And we declare that we will mainpulate this number
	// By wrapping the string in a UseState()

	const [caption, setCaption] = useState("");
	// (caption) The constant username contains a string
	// (setCaption) And we declare that we will mainpulate this string
	// By wrapping the string in a UseState()

	//! THIS IS THE FUNCTION FOR GETTING IMAGE AND CAPTION FROM THE USER PC

	const handleChange = (e) => {
		// handleChange is a function that fires off an event
		if (e.target.files[0]) {
			// get the first file that you selected
			setImage(e.target.files[0]);
			// set (insert) that file in the image constant
		}
	};

	//! THIS IS THE FUNCTION FOR UPLOADING USER IMAGE AND CAPTION TO THE FIREBASE AND THEN DISPLAYING THEM ON THE WEB PAGE

	const handleUpload = () => {
		const uploadTask = storage.ref(`images/${image.name}`).put(image);
		// The constant uploadTask stores code that uploads images into firebase
		// [a] Access the storage in firebase.
		// [b] Get a reference (a unique identifier) for this new photo.
		// [c] Identify the Image name as the file name that we selected.
		// [d] Put the 'image' that you grabbed into 'images' (insert it into the firebase document)

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				// on "state_changed" (ie, when state changes --> any change occurs) give me a snapshot
				// And as it changes, and gets updated, give me continous snapshots
				const progress = Math.round(
					// The constant progress stores a math equation
					// that could transform these continuous snapshots into a progress indicator
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
					// This equation is going to use the range of numbers from 0 and 100,
					// and it will output a specific number (between 0 and 100)
					// and this number will indicate progress
				);
				setProgress(progress);
				// display the progress number from 0 to 100
			},
			(error) => {
				// if there is an error then console.log the error
				console.log(error);
				// alert(error.message);
			},

			() => {
				// if the uploadTask function is executed successfuly and there are no errors
				// the next task is to get a 'download url' for the image that was just uploaded by the user.
				// We an achieve this task by :
				storage
					// [a] Summon the storage in firebase and then enter the storage
					.ref("images")
					// [b] find the reference for the images
					.child(image.name)
					// [c] find to the image named child (i.e, the image that was just uploaded)
					.getDownloadURL()
					// [d] create a download url for that image and then get that url

					.then((url) => {
						// then take this url
						db
							// enter the firebase database
							.collection("posts")
							// post the image inside of the database collection posts
							.add({
								// add to the post
								timestamp: firebase.firestore.FieldValue.serverTimestamp(),
								// this is useful for storing all code based on the correct timing
								caption: caption,
								imageUrl: url,
								// This is the downloaded url .then(url)
								// Its important to pay attention to how we are getting this image
								// [1] In the function handleUpload, we uploaded the image to the firebase storage
								// [2] We used --> .getDownloadURL() ---> to get a download link
								// [3] We are now using the download link, to post the image
								username: username
								// The username is inside the app.js
								// We want to get it from the app.js and deposit it here
								// To do that, we are going insert 'username' as a prop into the ImageUpload component (top of this file)
								// like this ----> function ImageUpload({ username }) {}
								// As a result, we will be able to receive it here.
							});

						setProgress(0);
						setCaption("");
						setImage(null);
						// after your done uploading,
						// set everything back to how it started,
						// with no progress, no caption, and no image path
					});
			}
		);
	};

	return (
		<div className="imageupload">
			<progress className="imageupload_progress" value={progress} max="100" />
			{/* this is the progress bar */}

			<input
				type="text"
				placeholder="Enter a caption ..."
				onChange={(event) => setCaption(event.target.value)}
				// onChange is a function that fires of an event
				// Every single time a key is pressed onChange will fire off
				// Then it will grab every single key that you typed (letter,number) on the input field
				// then we are going to set the caption
				// by combining all the different keys that were pressed into a string
				value={caption}
			/>
			{/*  */}

			<input type="file" onChange={handleChange} />
			{/* Type="file" for the input, gives you the ability to select files on click, from your computer, via the browser. 
                The function 'handleChange' will declare what happens when you click a file*/}

			<Button className="imageupload_button" onClick={handleUpload}>
				Upload
			</Button>
			{/* This is a material ui button. */}
		</div>
	);
}

export default ImageUpload;
