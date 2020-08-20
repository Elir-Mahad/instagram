import React from "react";
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

			<input type="file" onChange={handleChange} />

			<button onClick={handleUpload}>Upload</button>
		</div>
	);
}

export default ImageUpload;
