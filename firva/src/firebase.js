import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_AUTH_DOMAIN",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_STORAGE_BUCKET",
//   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//   appId: "YOUR_APP_ID",
//   measurementId: "YOUR_MEASUREMENT_ID" 


apiKey: "AIzaSyBDCeIg63-MQ8PT6QQOQff1pvfe72Uyhqk",

authDomain: "formstore-99a0f.firebaseapp.com",

projectId: "formstore-99a0f",

storageBucket: "formstore-99a0f.appspot.com",

messagingSenderId: "808560656431",

appId: "1:808560656431:web:710754b550d55718db86da",

measurementId: "G-VZQFPDVX9K"

};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }; 
