//!  ------------------------------------------------------------------------------------------
//!
//!  global-methods.js
//!  St Gregory's College Rewards Web Application
//!
//!  Developed by Cooper Beltrami and Robert Bisset
//!  Copyright (c) 2020 Cooper Beltrami & Robert Bisset All Rights Reserved.
//!
//!  This code is licenced between Cooper Beltrami, Robert Bisset and St Gregory's College
//!
//!  ------------------------------------------------------------------------------------------

function showError(color, message, elementId) {
    document.getElementById(elementId).className = `message-${color}`
    document.getElementById(elementId).innerText = message
    document.getElementById(elementId).style = `display: block`
}

function hideError(elementId) {
    document.getElementById(elementId).style = `display: none`
}

function getLocalStorageItem(key) {
    return localStorage.getItem(key)
}

function setLocalStorageItem(key, value) {
    localStorage.setItem(key, value)
}

function getUser() {
    return getLocalStorageItem('userEmail').replace('@stgregs.nsw.edu.au', '').toLowerCase()
}

function isUserAdministrator(user) {
  if (user == 'bvetrano' || user == 'pputland' || user == 'rbisset' ||user == 'hmcwilliams' || user == 'administrator') {
    return true
  } else {
    return false
  }
}

function isUserStudent(user) {
  if (user.startsWith(5) || user.startsWith(6)) {
      return true
  }else{
      return false
  }
}

function writeToElement(elementId, elementText) {
    document.getElementById(elementId).innerHTML = elementText
}

function getDate() {
   return new Date().toString().substring(0, 24)
}

function getUserName() {
    var firstName = getLocalStorageItem('userFirst')
    var lastName = getLocalStorageItem('userLast')

    return `${firstName} ${lastName}`
}

function sortArrayByKey(key, order = 'asc') {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }
  
      // Disregard case of item
      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];
  
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
}

function getUserYearGroup() {
    var studentYearGroup

    if (isUserStudent(getUser())) {
        database.ref('Users/Students/').child(getUser()).once('value', function(snapshot) {
          studentYearGroup = snapshot.val().YearGroup
        })
    }

    return studentYearGroup
}

function setUserToken(fcmToken) {
    database.ref('Users/Students/').child(getUser()).update({
      fcmToken: fcmToken
    })
}

function writeDatabaseLog(staff, student, points, time, reason, studentnumber, studentPushRequest, staffPushRequest) {
    studentPushRequest.push({
        Reason: reason,
        Time: time,
        Points: points,
        Staff: staff
    })

    staffPushRequest.push({
        Reason: reason,
        Time: time,
        Points: points,
        Student: student,
        StudentNumber: studentnumber,
    })
}

function updatePoints(databaseReference, points, isQrRequest) {
    databaseReference.once('value', function(snapshot) {
        var updatedPoints = parseInt(snapshot.child('Points').val(), 10) + parseInt(points)

        databaseReference.update({
            Points: updatedPoints
        }, function(error) {
            if (error == null) {
              document.getElementById('displayModalButton').click()
              if (isQrRequest == true) {
                document.getElementById('modalOkayButton').setAttribute('onclick','refreshPage()')
              } else {
                document.getElementById('modalOkayButton').setAttribute('onclick','refreshAfterAddingPoints()')
              }
            }
        })
    })
}

function refreshPage() {
  window.location.href = "/"
}

function refreshAfterAddingPoints() {
  clearAll()
  document.getElementById('inputField').value = ""
}

function addStaff(user) {
    var queryReference = database.ref('Users/Staff/' + getUser().toLowerCase())
    var userId = getLocalStorageItem('userId')

    // Check user type
    if (user == 'bvetrano' || user == 'pputland' || user == 'rbisset' || user == 'administrator') {
        // Create database node
        queryReference.update({
          isAdministrator: true,
          userId: userId
      })
    }else{
      // Create database node
      queryReference.update({
        isAdministrator: false,
        userId: userId
      })
    }

     // Rerun as the user was not previously authenticated properly
     checkUserAccessLevel()
}

function showElement(elementId) {
    document.getElementById(elementId).style = 'display: block'
}

function hideElement(elementId) {
    document.getElementById(elementId).style = 'display: none'
}

function logOut() { 
    document.getElementById(`logoutModalButton`).click()
  }
  
function deauthenticate() {
    firebase.auth().signOut()
}
