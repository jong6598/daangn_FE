import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyDnrx9RyAZ96hFuXCR7QCOyKY3uSEkpQTc",
    authDomain: "daangn-13a80.firebaseapp.com",
    projectId: "daangn-13a80",
    storageBucket: "daangn-13a80.appspot.com",
    messagingSenderId: "37181309353",
    appId: "1:37181309353:web:b4382172d651581e8804b8"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const storage = getStorage(app);

  export default app;
