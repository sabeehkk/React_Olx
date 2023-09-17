import firebase from 'firebase';
import 'firebase/auth'
import 'firebase/firebase'
import 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIvoFsoqXgDp9fAugyynKyQKWYixtdiqM",
  authDomain: "fir-a5bc4.firebaseapp.com",
  projectId: "fir-a5bc4",
  storageBucket: "fir-a5bc4.appspot.com",
  messagingSenderId: "1011027627136",
  appId: "1:1011027627136:web:70cb5b57715cfae27dea65",
  measurementId: "G-BCHD7XBXWY"
};


firebase.initializeApp(firebaseConfig);
export default firebase;