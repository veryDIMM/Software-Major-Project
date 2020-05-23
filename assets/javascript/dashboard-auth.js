//!  ------------------------------------------------------------------------------------------
//!
//!  dashboard-auth.js
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
    getRecentPoints()
    displayUserPoints()
    populateTopTen()
    getYearGroupTotals()
}

function isStudent() {
    loadStudentInterface()
    notificationPermission()
    changeStageChallengeDropdown()
    enableTotalsButton()
}

function isStaff() {
    loadStaffInterface()
    getStudentFromUrl()
    loadDropdownItems()
    showStaffLink()
}

function isAdministrator() {
    loadAdministratorInterface()
    getStudentFromUrl()
    loadDropdownItems()
    showAdminLink()
    showStaffLink()
}

function enableTotalsButton() {
    firebase.database().ref(`Users/Students/${getUser()}/Points`).on('value', snapshot => {
        if (snapshot.val() == 0) {
            console.log('No Points')
            document.getElementById('recent-points-button').style = "display: none; outline: none;"
        } else {
            document.getElementById('recent-points-button').style = "display: block; outline: none;"
        }
    })
}

function changeStageChallengeDropdown() {
    database.ref('Users/Students/').child(getUser()).once('value', function(snapshot) {
        var yearGroup = snapshot.val().YearGroup
        var dropdown = document.getElementById('stageSelection')

        if (yearGroup == 12 || yearGroup == 11) {
            dropdown.value = "6"
        } else if (yearGroup == 10 || yearGroup == 9) {
            dropdown.value = "5"
        } else if (yearGroup == 8 || yearGroup == 7) {
            dropdown.value = "4"
        }
    })
}