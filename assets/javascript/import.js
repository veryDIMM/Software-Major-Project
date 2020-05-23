//!  ------------------------------------------------------------------------------------------
//!
//!  import.js
//!  St Gregory's College Rewards Web Application
//!
//!  Developed by Cooper Beltrami and Robert Bisset
//!  Copyright (c) 2020 Cooper Beltrami & Robert Bisset All Rights Reserved.
//!
//!  This code is licenced between Cooper Beltrami, Robert Bisset and St Gregory's College
//!
//!  ------------------------------------------------------------------------------------------

function uploadCancelled() {
  // Refresh page in case user wants to try again
  document.location.href = '../../../assets/pages/administration'
}

function readFile() {
  const uploadFile = document.getElementById('importFile').files[0]
  var reader = new FileReader()
  
  document.getElementById('fileLabel').innerText = uploadFile.name
  document.getElementById('incorrect-input-error').style = 'display: none;'

  // Check file type
  if (uploadFile.name.includes('.csv')) {
    if (uploadFile) {
      reader.readAsText(uploadFile, 'UTF-8')
  
      reader.onload = fileLoaded
      reader.onerror = errorHandler
    }
  }else{
    document.getElementById('incorrect-input-error').style = 'display: block; color: red; margin-bottom: 0px;'
    document.getElementById('incorrect-input-error').innerText = 'Please import a CSV file, CSV file type supported only'
  }
}

function errorHandler(event) {
    if (event.target.error.name == 'NotReadableError') {
      document.getElementById('incorrect-input-error').style = 'display: block; color: red; margin-bottom: 0px;'
      document.getElementById('incorrect-input-error').innerText = 'File could not be read. Please make sure the file is in a .CSV format and data is in a readable format.'
    }
}

function fileLoaded(event) {
    var fileString = event.target.result
    parsedString = Papa.parse(fileString)

    importConfirmation()
}

function importConfirmation() {
    document.getElementById('displayModalButton').click()
}

function confirmParse() {
  parseString(parsedString.data)
}

function parseString(parsedString) {
    var objectsLength = parsedString.length
    var studentData = []
    
    // Starting at 1 to exclude headings
    for (i = 1; i < objectsLength - 1; i++) { 
      studentData[i] = {YearGroup: parsedString[i][0], HomeRoom: parsedString[i][1], Name: parsedString[i][2] + ' ' + parsedString[i][3], StudentNumber: parsedString[i][4]}
    }

    studentData.forEach(element => {
      console.log(element)

      firebase.database().ref(`Users/Students/${element.StudentNumber}/`).once('value', snapshot => {
        if (snapshot.val() == null) {          
          firebase.database().ref(`Users/Students/${element.StudentNumber}/`).update({
            YearGroup: element.YearGroup,
            HomeRoom: element.HomeRoom,
            Name: element.Name,
            StudentNumber: element.StudentNumber,
            Points: 0,
          })
        } else {          
          firebase.database().ref(`Users/Students/${element.StudentNumber}/`).update({
            YearGroup: element.YearGroup,
            HomeRoom: element.HomeRoom,
            Name: element.Name,
            StudentNumber: element.StudentNumber,
          })
        }
      })
    })

    document.getElementById('incorrect-input-error').style = 'display: block; color: green; margin-bottom: 0px;'
    document.getElementById('incorrect-input-error').innerText = 'Student homerooms have been imported successfully!'
}

function readMeritFile() {
  const uploadFile = document.getElementById('importMeritFile').files[0]
  var reader = new FileReader()
  
  document.getElementById('fileMeritLabel').innerText = uploadFile.name
  document.getElementById('incorrect-input-error-merits').style = 'display: none;'

  // Check file type
  if (uploadFile.name.includes('.csv')) {
    if (uploadFile) {
      reader.readAsText(uploadFile, 'UTF-8')
  
      reader.onload = meritFileLoaded
      reader.onerror = meritErrorHandler
    }
  }else{
    document.getElementById('incorrect-input-error-merits').style = 'display: block; color: red; margin-bottom: 0px;'
    document.getElementById('incorrect-input-error-merits').innerText = 'Please import a XLS file, XLS file type supported only'
  }
}

function meritErrorHandler(event) {
  if (event.target.error.name == 'NotReadableError') {
    document.getElementById('incorrect-input-error-merits').style = 'display: block; color: red; margin-bottom: 0px;'
    document.getElementById('incorrect-input-error-merits').innerText = 'File could not be read. Please make sure the file is in a .CSV format and data is in a readable format.'
  }
}

function meritFileLoaded(event) {
  var fileString = event.target.result
  parsedString = Papa.parse(fileString)

  parseMeritContent(parsedString)
}

function parseMeritContent(meritFile) {
  var fileData = meritFile.data
  var studentMerits = []
  var currentTime = getDate()

  for (i = 1; i < fileData.length -1; i++) {
    studentMerits.push({StudentNumber: fileData[i][0], Date: fileData[i][1], Subject: fileData[i][8], TeacherMessage: fileData[i][12], Teacher: fileData[i][17]})
  }

  studentMerits.forEach(element => {
    var teacherLastName = element.Teacher.replace(`'`, '').substring(element.Teacher.indexOf(' '), element.Teacher.length).toLowerCase().replace(' ', '')
    var teacherFirstName = element.Teacher.replace(',', '').substring(0, element.Teacher.indexOf(' ')).toLowerCase().replace(' ', '')
    var teacherCode = teacherLastName.substring(0, 1) + teacherFirstName 

    //var studentEmailAddress = element.StudentNumber + '@stgregs.nsw.edu.au'

    firebase.database().ref(`Users/Students/${element.StudentNumber}`).once('value', snapshot => {
      const positiveMeritWorth = 3
      var updatedPoints = snapshot.val().Points + positiveMeritWorth

      firebase.database().ref(`Users/Students/${element.StudentNumber}`).update({
        Points: updatedPoints
      })
      
      var logStudentReference = database.ref(`Logs/Students/${element.StudentNumber}`)
      var logStaffReference = database.ref(`Logs/Staff/Positive_Merits/${teacherCode}`)

      writeDatabaseLog(element.Teacher, snapshot.val().Name, positiveMeritWorth, element.Date, 'Positive Merit', element.StudentNumber, logStudentReference, logStaffReference)

      // Log once for the staff member
      database.ref(`Logs/Staff/${getUser()}`).push({
          Reason: 'Green Stamps',
          Time: getDate(),
          Points: totalPoints,
          Student: `Homeroom - ${homeroomCode}`,
          StudentNumber: 'N/A',
      })
    })
  })

  document.getElementById('incorrect-input-error-merits').style = 'display: block; color: green; margin-bottom: 0px;'
  document.getElementById('incorrect-input-error-merits').innerText = 'Positive Merits have been imported successfully!'
}