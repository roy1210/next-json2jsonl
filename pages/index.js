import Head from 'next/head';
import { useState } from 'react';
import FileUpload from '../src/components/FileUpload';

export default function PrivatePage(props) {
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  const uploadToServer = async (event) => {
    const body = new FormData();
    body.append('file', image);
    const response = await fetch('/api/file', {
      method: 'POST',
      body,
    });
  };

  return (
    // <div>
    //   <div>
    //     <img src={createObjectURL} />
    //     <h4>Select Image</h4>
    //     <input type="file" name="myImage" onChange={uploadToClient} />
    //     <button
    //       className="btn btn-primary"
    //       type="submit"
    //       onClick={uploadToServer}
    //     >
    //       Send to server
    //     </button>
    //   </div>
    // </div>
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
          integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
          crossOrigin="anonymous"
        />

        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
        <title>JSON2JSONL</title>
      </Head>
      <div className="container mt-4">
        <h4 className="display-4 text-center mb-4">
          <i className="fab fa-react" /> JSON2JSONL
        </h4>
        <FileUpload />
      </div>
    </>
  );
}
