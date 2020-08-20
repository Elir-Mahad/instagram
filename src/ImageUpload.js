import React from "react";
// import "./ImageUpload.css";

function ImageUpload() {
	const [caption, setCaption] = useState[""];

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
