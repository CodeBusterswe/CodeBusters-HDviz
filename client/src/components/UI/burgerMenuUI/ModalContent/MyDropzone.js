import React, {useCallback} from "react";
import {useDropzone} from "react-dropzone";
 
function MyDropzone(props) {

	const loadSession = props.loadSession;
	const onDrop = useCallback((acceptedFiles) => {
		acceptedFiles.forEach((file) => {
			const reader = new FileReader();
 
			reader.onabort = () => console.log("file reading was aborted");
			reader.onerror = () => console.log("file reading has failed");
			reader.onload = () => {
				// Do whatever you want with the file contents
				loadSession(reader.result);
			};
			reader.readAsText(file);
		});
 
	}, [loadSession]);
 
	const {getRootProps, getInputProps} = useDropzone({onDrop});
 
	return (
		<div {...getRootProps()} id="dropzone">
			<input data-testid="drop-input" {...getInputProps()} />
			<p>Rilascia qui il tuo file o clicca per caricare la sessione</p>
		</div>
	);
}
export default MyDropzone;