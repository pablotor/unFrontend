import * as firebase from "firebase";
import "firebase/auth";
//import dataConfig from './dataConfig'

const app = firebase.initializeApp(
    {
    apiKey: "AIzaSyCjNP34gMKkqFbLKNzRSdbJUUJNWPbppjk",
    authDomain: "unbackend.firebaseapp.com",
    databaseURL: "https://unbackend.firebaseio.com",
    projectId: "unbackend",
    storageBucket: "unbackend.appspot.com",
    messagingSenderId: "254954750622",
    appId: "1:254954750622:web:8c150af62a977a4388f18f"
  }
);

/*const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
const githubAuthProvider = new firebase.auth.GithubAuthProvider();*/

export default app;
