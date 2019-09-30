import React from 'react';
import axios from 'axios';

function FileUploader(props) {
  const handleFileUpload = event => {
    const data = new FormData();
    data.append('file', event.target.files[0]);
    const fileName = event.target.files[0].name;
    axios.post('http://localhost:8080/upload', data, {}).then(res => {
      // then print response status
      props.setFileName(fileName);
    });
  };

  return (
    <form>
      <h3>Upload the file to Analyse Transactions </h3>
      <input
        className="fileInput"
        id="fileUploadInput"
        type="file"
        name="file"
        onChange={event => {
          handleFileUpload(event);
        }}
      />
    </form>
  );
}

export default FileUploader;
