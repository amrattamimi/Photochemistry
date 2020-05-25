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
  appId: "1:122580362925:web:2a35b4a353773635fb8824",
  measurementId: "G-LGV1C115XP"
};
  


  firebase.initializeApp(firebaseConfig); 
  firebase.firestore();


  export default firebase