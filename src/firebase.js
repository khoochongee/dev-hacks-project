import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyD4SKXtzWMPZ9fRuXBbsibY9MWWClfh0TM",
    authDomain: "dev-hacks-project.firebaseapp.com",
    databaseURL: "https://dev-hacks-project.firebaseio.com",
    projectId: "dev-hacks-project",
    storageBucket: "dev-hacks-project.appspot.com",
    messagingSenderId: "109154954863",
    appId: "1:109154954863:web:8c1855faaf585cad69679a",
    measurementId: "G-2VQKX5P7PJ"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

export {db,auth};