//!  ------------------------------------------------------------------------------------------
//!
//!  student-search.js
//!  St Gregory's College Rewards Web Application
//!
//!  Developed by Cooper Beltrami and Robert Bisset
//!  Copyright (c) 2020 Cooper Beltrami & Robert Bisset All Rights Reserved.
//!
//!  This code is licenced between Cooper Beltrami, Robert Bisset and St Gregory's College
//!
//!  ------------------------------------------------------------------------------------------

var studentData = [];
var studentCount = [];

function searchStudentData() {
  var index = 0;
  
  studentData = [];
  studentCount = [];

  // show dropdowns
  showElement('student-dropdowns')

  clearAll();
  document.getElementById('error-text-search').style = "display: none";
  document.getElementById('error-text-search').innerText = "";

  document.getElementById('error-text-save').style = 'display: none';
  document.getElementById('error-text-save').innerText = '';
  
  if (document.getElementById('inputField').value.length == 0) {
    document.getElementById('error-text-search').style = "display:block; margin-bottom: 0px;";
    document.getElementById('error-text-search').innerText = "Please enter a correct search query.";
  }else{
    var studentNumberQuery = firebase.database().ref('Users/Students/')
    var studentNameQuery = firebase.database().ref('Users/Students/')

    if (document.getElementById('inputField').value.startsWith('5') || document.getElementById('inputField').value.startsWith('6')) {
      studentNumberQuery.once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          if (childSnapshot.child('StudentNumber').val().toString().startsWith(inputField.value.toString())) {
            if (index < 5) {
              studentData.push([childSnapshot.child('Name').val(), childSnapshot.child('StudentNumber').val(), childSnapshot.child('YearGroup').val()]);
              studentCount[index] = 'Student';
              document.getElementById('studentName' + index).innerHTML = `${childSnapshot.val().Name} (${childSnapshot.val().StudentNumber}/${childSnapshot.val().YearGroup})`
              document.getElementById('profileButton' + index).setAttribute('studentnumber', childSnapshot.val().StudentNumber)
              document.getElementById('meritButton' + index).setAttribute('studentnumber', childSnapshot.val().StudentNumber)
              document.getElementById('studentObject' + index).style = 'display: block';

              index++;
            }
          }
        })
      })
    }else{
      studentNameQuery.once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          if (childSnapshot.val().Name.toLowerCase().includes(inputField.value.toLowerCase())) {
            if (index < 5) {
              studentData.push([childSnapshot.child('Name').val(), childSnapshot.child('StudentNumber').val(), childSnapshot.child('YearGroup').val()])
              studentCount[index] = 'Student';
              document.getElementById('studentName' + index).innerHTML = `${childSnapshot.val().Name} (${childSnapshot.val().StudentNumber}/${childSnapshot.val().YearGroup})`
              document.getElementById('profileButton' + index).setAttribute('studentnumber', childSnapshot.val().StudentNumber)
              document.getElementById('meritButton' + index).setAttribute('studentnumber', childSnapshot.val().StudentNumber)
              document.getElementById('studentObject' + index).style = 'display: block';

              index++;
            } 
          }
        })
      })
    }
  }
}