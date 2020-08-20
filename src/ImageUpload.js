import React from "react";
import Button from "@material-ui/core/Button";
// import "./ImageUpload.css";

function ImageUpload() {
	const [image, setImage] = useState(null);
	const [progress, setProgress] = useState(0);
	const [caption, setCaption] = useState[""];

	const handleChange = (e) => {
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
