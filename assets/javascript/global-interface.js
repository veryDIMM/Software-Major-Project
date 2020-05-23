//!  ------------------------------------------------------------------------------------------
//!
//!  global-interface.js
//!  St Gregory's College Rewards Web Application
//!
//!  Developed by Cooper Beltrami and Robert Bisset
//!  Copyright (c) 2020 Cooper Beltrami & Robert Bisset All Rights Reserved.
//!
//!  This code is licenced between Cooper Beltrami, Robert Bisset and St Gregory's College
//!
//!  ------------------------------------------------------------------------------------------

function displayUserPoints() {
  if (isUserStudent(getUser())) {
    // Student points
    database.ref('Users/Students/').child(getUser()).on('value', function(snapshot) {
      var points = snapshot.val().Points
      
      writeToElement('userPoints', `Points: ${points}`)

      hideElement(`navbar-loader`)
      showElement(`navbar-underline`)
    })
  } else {
    // Check administrators and staff
    database.ref('Users/Staff').child(getUser()).on('value', function(snapshot) {
      if (snapshot.child('isAdministrator').val() == true) {
        writeToElement('userPoints', 'Administrator')
      } else if (snapshot.child('isAdministrator').val() == false) {
        writeToElement('userPoints', 'Staff')
      }

      hideElement(`navbar-loader`)
      showElement(`navbar-underline`)
    })
  }
}

function loadAvatar() {
  // Check if the user is a student
  if (isUserStudent(getUser())) {
    // Check if the student has a profile picture or not
    firebase.database().ref(`Users/Students/${getUser()}/profileUrl`).once('value', snapshot => {
      if (snapshot.val() != null) {
        document.getElementById('user-profile-image').style = `background-image: url(${snapshot.val()}); background-position: center; background-size: cover;`
      } else {
        document.getElementById('user-profile-image').style = ''
        document.getElementById('user-profile-text').innerText = getLocalStorageItem('userFirst').substring(0,1).toUpperCase()
      }
    })
  } else {
    firebase.database().ref(`Users/Staff/${getUser()}/profileUrl`).once('value', snapshot => {
      if (snapshot.val() != null) {
        document.getElementById('user-profile-image').style = `background-image: url(${snapshot.val()}); background-position: center; background-size: cover;`
      } else {
        document.getElementById('user-profile-image').style = ''
        document.getElementById('user-profile-text').innerText = getLocalStorageItem('userFirst').substring(0,1).toUpperCase()
      }
    }) 
  }
}

function showAdminLink() {
    showElement(`admin-link`)
}

function showStaffLink() {
  showElement('staff-link')
}

function getSchoolTopTen() {
    database.ref('Users/Students/').orderByChild('Points').limitToLast(10).on('value', function(snapshot) {
      // Wipe out existing values
      for (i = 1; i < 11; i ++) {
        document.getElementById(`top10InCohort-${i}-Name`).innerText = ""
        document.getElementById(`top10InCohort-${i}-Points`).innerText = ""
        document.getElementById(`top10InCohort-${i}-Year`).innerText = ""
      }

      hideElement('schoolTopTen-subHeading')

      var index = 10
      var zeroIndex = 0
      
      for (i = 1; i < 11; i++) {
        showElement(`top10InCohortUI-${i}`)
      }
      
      showElement(`top-ten-year`)
  
      snapshot.forEach(function(childSnapshot) {
        if (childSnapshot.val().Points != 0) {
          document.getElementById(`top10InCohort-${index}-Name`).innerHTML = `<strong style="padding-right: 5px;">${index}.</strong> ${childSnapshot.child('Name').val()}`
          document.getElementById(`top10InCohort-${index}-Name`).setAttribute('studentNumber', childSnapshot.val().StudentNumber)
          document.getElementById(`top10InCohort-${index}-Year`).innerText = `${childSnapshot.child('YearGroup').val()}`
          document.getElementById(`top10InCohort-${index}-Points`).innerText = `${childSnapshot.child('Points').val()}`
        } else {
          zeroIndex++
        }
        index --
      })

      if (zeroIndex >= 10) {
        showElement('schoolTopTen-subHeading')
        hideElement('last10PointsHeadings')

      }else{
        hideElement('schoolTopTen-subHeading')
        showElement('last10PointsHeadings')
      }
      
      showElement('cohortSelectionDropdown')
      hideElement('schoolTopTen-Loader')
    })
}

function dipslayRecentTransactions(recentArray, isStudent) {
  // Change text depending on if points exist or not
  if (recentArray.length < 1) {
    if (isStudent) {
      writeToElement(`last10Points-subHeading`, `You currently have no points awarded to you...`)
    } else {
      writeToElement(`last10Points-subHeading`, `You have not given any points out yet...`)
    }

    showElement('last10Points-subHeading')
    hideElement('recentPoints-Loader')
  }else{
    // Load recent logs to interface
    for (i = 0; i < recentArray.length -1; i++) {
      if (isStudent) {
        writeToElement(`last10Points-${i + 1}-RecordedBy`, recentArray[i].Staff)
      }else{
        writeToElement(`last10Points-${i + 1}-RecordedBy`, recentArray[i].Student)
        document.getElementById(`last10Points-${i + 1}-RecordedBy`).setAttribute('studentNumber', recentArray[i].StudentNumber)
      }
  
      writeToElement(`last10Points-${i + 1}-PointsModification`, recentArray[i].Points)
      writeToElement(`last10Points-${i + 1}-Reason`, recentArray[i].Reason)
      writeToElement(`last10Points-${i + 1}-Time`, recentArray[i].Time)
    }

    showElement('recentPoints-Headings')
    hideElement('recentPoints-Loader')
  }

  // Show 10 elements
  for (i = 1; i < 10; i++) {
    document.getElementById(`last10PointsUI-${i}`).style = 'display: block'
  }
}

// Clear dropdowns
function refreshAfterAddingPoints() {
  clearAll()
  document.getElementById('inputField').value = ""
}