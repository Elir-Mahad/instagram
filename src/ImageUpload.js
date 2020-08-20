import React from "react";
import Button from "@material-ui/core/Button";
// import "./ImageUpload.css";

function ImageUpload() {
	//! -------------- ALL USESTATES BELOW

	const [image, setImage] = useState(null);
	// (image) The constant image contains nothing
	// (setImage) And we declare that we will mainpulate whatever ends up inside it
	// By wrapping the string in a UseState()

	const [progress, setProgress] = useState(0);
	// (progress) The constant progress contains a number
	// (setProgress) And we declare that we will mainpulate this number
	// By wrapping the string in a UseState()

	const [caption, setCaption] = useState[""];
	// (caption) The constant username contains a string
	// (setCaption) And we declare that we will mainpulate this string
	// By wrapping the string in a UseState()

	const handleChange = (e) => {
		// handleChange is a function that fires off an event
		if (e.target.files[0]) {
			// get the first file that you selected
			setImage(e.target.files[0]);
			// set the image in state to that
		}
	};

	const handleUpload = () => {};

	return (
		<div>
			<h1>ABC</h1>
			{/* caption input */}
			{/* file picker */}
			{/* post button */}

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
