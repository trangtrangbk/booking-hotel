import firebase from 'firebase/app'
import 'firebase/storage'

var firebaseConfig = {
  apiKey: "AIzaSyAtnySNW-BWP6OtTFu3CT1hVK8SNPRhLdQ",
  authDomain: "photo-store-1b5ae.firebaseapp.com",
  databaseURL: "https://photo-store-1b5ae.firebaseio.com",
  projectId: "photo-store-1b5ae",
  storageBucket: "photo-store-1b5ae.appspot.com",
  messagingSenderId: "909556242937",
  appId: "1:909556242937:web:4db5da3f84ce834bc9c528",
  measurementId: "G-GZCE2JKLN8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const storage = firebase.storage()

export  {
  storage, firebase as default
}
