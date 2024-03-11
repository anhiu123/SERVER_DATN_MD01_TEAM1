const firebase = require("firebase");

const firebaseConfig = {
    apiKey: "AIzaSyDLfpPbdOKneNtDMzH1VszPLGJSr-lmQOQ",
    authDomain: "vidu2-96b2f.firebaseapp.com",
    databaseURL: "https://vidu2-96b2f-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "vidu2-96b2f",
    storageBucket: "vidu2-96b2f.appspot.com",
    messagingSenderId: "474743315722",
    appId: "1:474743315722:web:7435376f395eef8a27eef3",
    measurementId: "G-8LF86WD24S"
  };
  firebase.initializeApp(firebaseConfig);

  const db = firebase.database();

  module.exports = { firebase, db };