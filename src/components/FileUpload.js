import axios from 'axios';
import React, { Fragment, useState } from 'react';
import Message from './Message';
import Progress from './Progress';

const FileUpload = () => {
  const [image, setImage] = useState(null);
  const [filename, setFilename] = useState('Choose File');
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);
  // const [isUpload, setIsUpload] = useState(false);

  const uploadToClient = async (event) => {
    try {
      if (event.target.files && event.target.files[0]) {
        const i = event.target.files[0];
        setImage(i);
      }
      setFilename(event.target.files[0].name);
      setUploadPercentage(100);
      setTimeout(() => {
        document.body.getElementsByClassName('upload-btn')[0].click();
      }, 1000);
      setMessage('Success!!');
    } catch (error) {
      setMessage('something went wrong');
      await axios.delete('/api/file');
    }
  };

  const download = async () => {
    await axios({
      url: `out.jsonl`,
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'out.jsonl');
      document.body.appendChild(link);
      link.click();
    });
  };

  const uploadToServer = async (event) => {
    event.preventDefault();
    const body = new FormData();
    body.append('file', image);
    await axios.post('/api/file', body);
    // setIsUpload(true);
    await download();
    await axios.delete('/api/file');
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

        <input
          id="upload-button"
          type="submit"
          value="Upload"
          style={{ opacity: 0 }}
          className="opacity-0 btn btn-primary btn-block mt-4 upload-btn"
        />
      </form>

      {/* {isUpload && (
        <a
          href="/out.jsonl"
          download
          className="btn btn-secondary btn-block mt-4">
          Download
        </a>
      )} */}
    </Fragment>
  );
};

export default FileUpload;
