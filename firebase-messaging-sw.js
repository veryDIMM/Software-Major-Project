importScripts('https://www.gstatic.com/firebasejs/7.9.3/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/7.9.3/firebase-messaging.js')

// Initialise Firebase
var config = {
  apiKey: "AIzaSyAWw_in9JRmkqYfIbyfuGoRZT6eAMx0r4k",
    authDomain: "st-gregs-rewards-production.firebaseapp.com",
    databaseURL: "https://st-gregs-rewards-production.firebaseio.com",
    projectId: "st-gregs-rewards-production",
    storageBucket: "st-gregs-rewards-production.appspot.com",
    messagingSenderId: "444363101866",
    appId: "1:444363101866:web:5b26cb8a371e2b4398e2d3",
    measurementId: "G-000E8GS66L"
}

firebase.initializeApp(config)

const messaging = firebase.messaging()