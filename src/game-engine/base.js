import firebase from "firebase/app";
// import "firebase/firestore";
import "firebase/database";
import {firebaseConfig} from "./firebase-config";

// const {
//   VUE_APP_apiKey,
//   VUE_APP_authDomain,
//   VUE_APP_databaseURL,
//   VUE_APP_projectId,
//   VUE_APP_storageBucket,
//   VUE_APP_messagingSenderId,
//   VUE_APP_appId,
//   VUE_APP_measurementId} = process.env


// const firebaseConfig = {
//   apiKey: VUE_APP_apiKey,
//   authDomain: VUE_APP_authDomain,
//   databaseURL: VUE_APP_databaseURL,
//   projectId: VUE_APP_projectId,
//   storageBucket: VUE_APP_storageBucket,
//   messagingSenderId: VUE_APP_messagingSenderId,
//   appId: VUE_APP_appId,
//   measurementId: VUE_APP_measurementId,
// };

const app = firebase.initializeApp(firebaseConfig);
const db = app.database()
// const db = app.firestore()

export const updateLatest = s => {
  const speed = Math.floor( s * 10) / 10;
  return db.ref('/stats').set({speed})
}

export const getLatest = () => {
  return db.ref('/stats').once('value').then(
    (snapshot) => {
      return (snapshot.val() && snapshot.val().speed) || 0;
    }
  )
}
