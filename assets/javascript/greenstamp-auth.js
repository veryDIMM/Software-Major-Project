//!  ------------------------------------------------------------------------------------------
//!
//!  greenstamp-auth.js
//!  St Gregory's College Rewards Web Application
//!
//!  Developed by Cooper Beltrami and Robert Bisset
//!  Copyright (c) 2020 Cooper Beltrami & Robert Bisset All Rights Reserved.
//!
//!  This code is licenced between Cooper Beltrami, Robert Bisset and St Gregory's College
//!
//!  ------------------------------------------------------------------------------------------

function checkUserAccessLevel() {
    var queryReference = database.ref('Users/Staff/').child(getUser())
    
    if (isUserStudent(getUser())) {
      isStudent()
    } else {
        // Check if staff member exists in database
        queryReference.once('value', function(snapshot) {
            if (snapshot.val() == null) {
                // Staff member doesn't exist yet
                addStaff(getUser())

            } else if (snapshot.child('isAdministrator').val() == false) {
                isStaff()

            } else if (snapshot.child('isAdministrator').val() == true) {
                isAdministrator()

            } else {
                //! Guest user - No access rights
                logOut()
            }
        })
    }
    
    // Functions to be called at runtime
    loadAvatar()
    getDate()
    displayUserPoints()
}

function isStudent() {
    window.location.href = '../../../'
}

function isStaff() {
    showStaffLink()
}

function isAdministrator() {
    showAdminLink()
    showStaffLink()
}