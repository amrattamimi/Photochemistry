import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyDjLComyMbXyD2MEAA_Esog2jKgPKDnkwc",
    authDomain: "photochemistry-d49d1.firebaseapp.com",
    databaseURL: "https://photochemistry-d49d1.firebaseio.com",
    projectId: "photochemistry-d49d1",
    storageBucket: "photochemistry-d49d1.appspot.com",
    messagingSenderId: "122580362925",
    appId: "1:122580362925:web:4e8c705e81932351fb8824",
    measurementId: "G-TDX2BYGYXM"
  };
  


  firebase.initializeApp(firebaseConfig);
  firebase.firestore();


  export default firebase