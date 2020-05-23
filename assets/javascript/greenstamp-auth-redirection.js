//!  ------------------------------------------------------------------------------------------
//!
//!  greenstamp-auth-redirection.js
//!  St Gregory's College Rewards Web Application
//!
//!  Developed by Cooper Beltrami and Robert Bisset
//!  Copyright (c) 2020 Cooper Beltrami & Robert Bisset All Rights Reserved.
//!
//!  This code is licenced between Cooper Beltrami, Robert Bisset and St Gregory's College
//!
//!  ------------------------------------------------------------------------------------------

firebase.auth().onAuthStateChanged(function(user) {
    if (user == null) {
        window.location.href = "../../../assets/pages/login/"
    }
})