//!  ------------------------------------------------------------------------------------------
//!
//!  login-auth.js
//!  St Gregory's College Rewards Web Application
//!
//!  Developed by Cooper Beltrami and Robert Bisset
//!  Copyright (c) 2020 Cooper Beltrami & Robert Bisset All Rights Reserved.
//!
//!  This code is licenced between Cooper Beltrami, Robert Bisset and St Gregory's College
//!
//!  ------------------------------------------------------------------------------------------

function loginWithMicrosoft() {
    var provider = new firebase.auth.OAuthProvider('microsoft.com')

    provider.setCustomParameters({
        tenant: 'de214aaf-7042-482c-a00c-fab6d7cae45f'
    })

    firebase.auth().signInWithPopup(provider).then(function(result) {
        setLocalStorageItem('microsoftToken', result.credential.accessToken)
        setLocalStorageItem('userEmail', result.additionalUserInfo.profile.userPrincipalName)
        setLocalStorageItem('userFirst', result.additionalUserInfo.profile.givenName)
        setLocalStorageItem('userLast', result.additionalUserInfo.profile.surname)
    }).catch(function(err) {
        console.log(err)
        alert(err.code + err.message)
    })
}

function adminLogin() {
    var email = document.getElementById('email_field').value + '@stgregs.nsw.edu.au'
    var password = document.getElementById('password_field').value

    firebase.auth().signInWithEmailAndPassword(email, password).catch(error => {
        if (error) {
            console.log(error)
            alert(error.code + error.message)
        }
    }).then((user) => {
        setLocalStorageItem('userEmail', email)
        setLocalStorageItem('userFirst', email.substring(0, email.indexOf('@')))
        setLocalStorageItem('userLast', email.substring(0, email.indexOf('@')))
    })
}

function gotoAdmin() {
    if (document.title == 'St Greg\'s Rewards - Login') {
        window.location.href = '/assets/pages/login/admin/'
    } else {
        window.location.href = '/assets/pages/login/'
    }
}