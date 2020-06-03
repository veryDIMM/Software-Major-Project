//!  ------------------------------------------------------------------------------------------
//!
//!  login-auth-redirection.js
//!  St Gregory's College Rewards Web Application
//!
//!  Developed by Cooper Beltrami and Robert Bisset
//!  Copyright (c) 2020 Cooper Beltrami & Robert Bisset All Rights Reserved.
//!
//!  This code is licenced between Cooper Beltrami, Robert Bisset and St Gregory's College
//!
//!  ------------------------------------------------------------------------------------------

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        showError('green', 'Signing into account...', 'login-error')

        if (isUserStudent(getUser()) == false) {
            var token = getLocalStorageItem('microsoftToken')
            var request = new XMLHttpRequest

            request.open("GET", "https://graph.microsoft.com/v1.0/me/photo/$value")
            request.setRequestHeader("Authorization", "Bearer " + token)
            request.responseType = "blob"

            request.onload = function () {
                if (request.status === 404) {
                    setLocalStorageItem('microsoftToken', null)
                    setLocalStorageItem('profilePicture', null)
                    document.location.href = '../../../'
                } else {
                    if (request.readyState === 4 && request.status === 200) {
                        var reader = new FileReader()
                        var profilePictureUrl = ''
        
                        reader.onload = function () {
                            // Display the user's profile picture
                            var storageRef = firebase.storage().ref()
                            var profilePictureRef = storageRef.child(`staff-profile-pictures/${getUser()}.jpg`)

                            profilePictureRef.put(request.response).then(snapshot => {
                                snapshot.ref.getDownloadURL().then(downloadUrl => {
                                    profilePictureUrl = downloadUrl
        
                                    firebase.database().ref(`Users/Staff/${getUser()}/`).update({
                                        profileUrl: profilePictureUrl
                                    }).then(error => {
                                        if (error) {
                                            console.log(error)
                                        } else {
                                            setLocalStorageItem('microsoftToken', 'null')
                                            setLocalStorageItem('profilePicture', profilePictureUrl)
                                            document.location.href = '../../../'
                                        }
                                    })
                                })
                            }) 
                        }
                        reader.readAsDataURL(request.response)
                    }
                }
            }
            request.send(null)
        } else {
            setLocalStorageItem('microsoftToken', 'null')
            setLocalStorageItem('profilePicture', 'null')
            document.location.href = '../../../'
        }
    }
})