//!  ------------------------------------------------------------------------------------------
//!
//!  firebase-configuration.js
//!  St Gregory's College Rewards Web Application
//!
//!  Developed by Cooper Beltrami and Robert Bisset
//!  Copyright (c) 2020 Cooper Beltrami & Robert Bisset All Rights Reserved.
//!
//!  This code is licenced between Cooper Beltrami, Robert Bisset and St Gregory's College
//!
//!  ------------------------------------------------------------------------------------------

var firebaseConfig = {
    apiKey: "AIzaSyAWw_in9JRmkqYfIbyfuGoRZT6eAMx0r4k",
    authDomain: "st-gregs-rewards-production.firebaseapp.com",
    databaseURL: "https://st-gregs-rewards-production.firebaseio.com",
    projectId: "st-gregs-rewards-production",
    storageBucket: "st-gregs-rewards-production.appspot.com",
    messagingSenderId: "444363101866",
    appId: "1:444363101866:web:5b26cb8a371e2b4398e2d3",
    measurementId: "G-000E8GS66L"
}

firebase.initializeApp(firebaseConfig)

// Enable Firebase Analytical Services
firebase.analytics()

// Initialise Firebase SDK Services
const database = firebase.database()
const messaging = firebase.messaging()
const performance = firebase.performance()

emailjs.init("user_1JzAnECVhUiYt2jxnIEun")
