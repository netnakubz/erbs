// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/auth";
import { Constants } from "expo-constants";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: Constants.manifest.extra.apiKey,
  authDomain: Constants.manifest.extra.authDomain,
  projectId: Constants.manifest.extra.projectId,
  storageBucket: Constants.manifest.extra.storageBucket,
  messagingSenderId: Constants.manifest.extra.messagingSenderId,
  appId: Constants.manifest.extra.appId
}
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// export const firebaseConfig = {
//   apiKey: "AIzaSyAs9RhaSjfqkJdMdLUvvP5eVLltDUP1jzs",
//   authDomain: "erbs-e90fb.firebaseapp.com",
//   projectId: "erbs-e90fb",
//   storageBucket: "erbs-e90fb.appspot.com",
//   messagingSenderId: "505657958078",
//   appId: "1:505657958078:web:788248e23713ad3aac88ef",
//   measurementId: "G-TMTEEJDBNG"
// };

let Firebase;

if (firebase.apps.length === 0) {
  Firebase = firebase.initializeApp(firebaseConfig);
}

export default Firebase;