//!  ------------------------------------------------------------------------------------------
//!
//!  points-transactions.js
//!  St Gregory's College Rewards Web Application
//!
//!  Developed by Cooper Beltrami and Robert Bisset
//!  Copyright (c) 2020 Cooper Beltrami & Robert Bisset All Rights Reserved.
//!
//!  This code is licenced between Cooper Beltrami, Robert Bisset and St Gregory's College
//!
//!  ------------------------------------------------------------------------------------------

function updateStudentData(elementId) {
  var studentNumber = studentData[elementId][1]
  var studentName = studentData[elementId][0]
  var studentYear = studentData[elementId][2]
  var staff = getUser()
  var time = getDate()
  var points = 1
  var reason = ''
  var error = false

  var databaseReference = database.ref('Users/Students/').child(studentNumber)
  var logStudentReference = database.ref('Logs/Students').child(studentNumber)
  var logStaffReference = database.ref('Logs/Staff/').child(staff)

  // Determine where to get the reason input from
  if (document.getElementById(`reasonDropDown${elementId}`).innerText == 'Other') {
    reason = document.getElementById(`reasonField${elementId}`).value
  } else {
    reason = document.getElementById(`reasonDropDown${elementId}`).innerText.replace('Reason: ', '')
  }

  // Data Validation
  if (points == 'Points Selection' || points == 'Other') {
    error = true
    writeToElement('modalErrorText', `Please enter a valid number.`)
    document.getElementById(`coinInput${elementId}`).style.borderColor = "red"
  } else if (points < 1 || points > 50 || points.toString().includes("e") || points.toString().length > 2) {
    error = true
    writeToElement('modalErrorText', `Please enter a number between 1 and 50.`)
    document.getElementById(`coinInput${elementId}`).style.borderColor = "red"
  } else if (reason.length < 5) {
    error = true
    writeToElement('modalErrorText', `Please enter a reason longer than 5 characters.`)
    document.getElementById(`reasonField${elementId}`).style.borderColor = "red"
  } else if (reason == "Select Reason") { 
    error = true
    writeToElement('modalErrorText', `Please enter a valid reason.`)
    document.getElementById(`reasonDropDown${elementId}`).style.borderColor = "red"
  } else if (reason == "") {
    error = true
    document.getElementById(`reasonDropDown${elementId}`).style.borderColor = "#007bff"
    document.getElementById(`reasonField${elementId}`).style.borderColor = "red"
  }

  if (!error) {
    writeDatabaseLog(staff, studentName, points, time, reason, studentNumber, logStudentReference, logStaffReference)
    writeToModal(studentNumber, points, studentYear, studentName)
    updatePoints(databaseReference, points, false)
  } else {
    document.getElementById(`displayErrorModalButton`).click()
  }

}