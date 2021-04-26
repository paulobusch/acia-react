import firebase from 'firebase/app';

const config = {
  apiKey: "AIzaSyCWBNmypmkowXDhyAB6-3IkPqiiaTFHQ2c",
  authDomain: "acia-e6cbc.firebaseapp.com",
  projectId: "acia-e6cbc",
  storageBucket: "acia-e6cbc.appspot.com",
  messagingSenderId: "138148519463",
  appId: "1:138148519463:web:1ddb0110c28f5e2b3ef802",
  measurementId: "G-7KWDTMD64H"
};

const firebaseInstance = firebase.initializeApp(config);
export default firebaseInstance;
