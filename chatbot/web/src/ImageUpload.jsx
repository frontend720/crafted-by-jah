import React from "react";
import { storage } from "./config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

export default function ImageUpload() {
  const [image, setImage] = React.useState("");
  const [url, setUrl] = React.useState("");
  const imageRef = ref(storage, `images/${uuidv4()}`);

  function uploadImage() {
    uploadBytes(imageRef, image)
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      })
      .then((url) => {
        setUrl(url);
      });
  }

  function interpretImage() {
    axios({
      method: "POST",
      url: `${import.meta.env.VITE_NGROK_URL}/image_analysis`,
      data: {
        imageUrl: url,
      },
    })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  React.useEffect(() => {
    interpretImage();
  }, [url]);
  console.log(url);
  React.useEffect(() => {
    uploadImage();
  }, [image]);
  return (
    <div>
      ImageUpload
      <input
        type="file"
        // value={image}
        onChange={(e) => setImage(e.target.files[0])}
      />
      <img src={url} width={100} alt="" />
    </div>
  );
}
