import { createContext, useState, useEffect, useContext } from "react";
import { doc, setDoc, collection, getDocs } from "firebase/firestore";
import { db } from "./config";
import { v4 as uuidv4 } from "uuid";
import { AuthenticationContext } from "./AuthenticationContext";

const FirebaseContext = createContext();

function FirebaseContextProvider({ children }) {
    const {emailReference} = useContext(AuthenticationContext)
  const [collectionArr, setCollectionArr] = useState([]);
  const [response, setResponse] = useState();
  function savedVideo(post, username) {
    setDoc(doc(db, emailReference, uuidv4()), {
      post: post,
      username: username,
    })
      .then((response) => {
        setResponse(response);
        console.log(response)
      })
      .catch((error) => {
        console.log(error.code);
      });
  }

  function clearCollection(){
    setCollectionArr([])
  }

// console.log(response)

  const getMedia = async () => {
    const documents = [];
    try {
      const querySnapshot = await getDocs(collection(db, (emailReference)));
      querySnapshot.forEach((doc) => {
        documents.push(doc.data());
      });
      setCollectionArr(documents);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  };

  return (
    <FirebaseContext.Provider value={{ savedVideo, collectionArr, getMedia, clearCollection  }}>
      {children}
    </FirebaseContext.Provider>
  );
}

export { FirebaseContext, FirebaseContextProvider };
