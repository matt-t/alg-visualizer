import firebase

var config = {
    apiKey: "AIzaSyDYXT0HYnSS8nc5rub4fnz_PiThGlTc2x4",
    authDomain: "trollproject-5824c.firebaseapp.com",
    databaseURL: "https://trollproject-5824c.firebaseio.com",
    projectId: "trollproject-5824c",
    storageBucket: "trollproject-5824c.appspot.com",
    messagingSenderId: "1000680777843",
    appId: "1:1000680777843:web:1ea5ec4b40e866fa9ae206",
    measurementId: "G-9E10ZMDH8N"
}

var database = firebase.database();

firebase.initializeApp(config);

database.child("chemicals").push({
  colours: "red",
  killing: "orangutan"
});
