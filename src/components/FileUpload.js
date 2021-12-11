import React, { Fragment, useState } from 'react';
import Message from './Message';
import Progress from './Progress';

const FileUpload = () => {
  const [image, setImage] = useState(null);
  const [filename, setFilename] = useState('Choose File');
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [isUpload, setIsUpload] = useState(false);

  const uploadToClient = (event) => {
    try {
      if (event.target.files && event.target.files[0]) {
        const i = event.target.files[0];
        setImage(i);
      }
      setFilename(event.target.files[0].name);
      setUploadPercentage(100);
      setMessage('File Uploaded');
    } catch (error) {
      setMessage('something went wrong');
    }
  };

  const uploadToServer = async (event) => {
    event.preventDefault();
    const body = new FormData();
    body.append('file', image);
    await fetch('/api/file', {
      method: 'POST',
      body,
    });
    setIsUpload(true);
  };

  return (
    <Fragment>
      {message ? <Message msg={message} /> : null}
      <form onSubmit={uploadToServer}>
        <div className="custom-file mb-4">
          <input
            type="file"
            name="myImage"
            className="custom-file-input"
            style={{ cursor: 'pointer' }}
            onChange={uploadToClient}
          />
          <label className="custom-file-label" htmlFor="customFile">
            {filename}
          </label>
        </div>

        <Progress percentage={uploadPercentage} />
        {uploadPercentage === 100 && (
          <input
            type="submit"
            value="Upload"
            className="btn btn-primary btn-block mt-4"
          />
        )}
      </form>

      {isUpload && (
        <a
          href="/out.jsonl"
          download
          className="btn btn-secondary btn-block mt-4">
          Download
        </a>
      )}
    </Fragment>
  );
};

export default FileUpload;
