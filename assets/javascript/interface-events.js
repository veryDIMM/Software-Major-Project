//!  ------------------------------------------------------------------------------------------
//!
//!  interface-events.js
//!  St Gregory's College Rewards Web Application
//!
//!  Developed by Cooper Beltrami and Robert Bisset
//!  Copyright (c) 2020 Cooper Beltrami & Robert Bisset All Rights Reserved.
//!
//!  This code is licenced between Cooper Beltrami, Robert Bisset and St Gregory's College
//!
//!  ------------------------------------------------------------------------------------------

var dropdownSelected = false
function showDropDown(elementId) {
    if (dropdownSelected == false) {
      clearStudents();

      if (elementId != 5) {
        document.getElementById('studentInformation' + elementId).style = 'display: block';
        document.getElementById('studentObject' + elementId).style = 'display: block';

        dropdownSelected = true
      }
    } else {
      for (i = 0; i < studentCount.length; i++) {
        document.getElementById('studentInformation' + i).style = 'display: none';
        document.getElementById('studentObject' + i).style = 'display: block';
      }

      dropdownSelected = false
    }
  }
  
  function clearStudentInformation() {
    for (i = 0; i < 5; i++) {
      document.getElementById('studentInformation' + i).style = 'display: none';
    }
  }
  
  function clearStudents() {
    for (i = 0; i < 5; i++) {
      document.getElementById('studentObject' + i).style = 'display: none';
    }
  }
  
  function clearCoinInputs() {
    for (i = 0; i < 5; i++) {
      document.getElementById('coinDisplayInput' + i).style = 'display: none';
      document.getElementById('coinInput' + i).value = '';
    }
  }
  
  function clearReasonInputs() {
    for (i = 0; i < 5; i++) {
      document.getElementById('reasonField' + i).style = 'display: none';
    }
  }
  
  function clearCoinModifications() {
    for (i = 0; i < 5; i++) {
      document.getElementById('coinDropDown' + i).innerText = 'Point Selection';
    }
  }
  
  function clearReasonModifications() {
    for (i = 0; i < 5; i++) {
    document.getElementById('reasonDropDown' + i).innerText = 'Select Reason';
    }
  }
  
  function showAllStudents() {
    for (i = 0; i < 5; i++) {
      document.getElementById('studentObject' + i).style = 'display: block;';
    }
  }
  
  //make sure to hide the input when another student is selected.
  function showCoinInput() {
    clearCoinInputs();
  
    for (i = 0; i < 5; i++) {
        document.getElementById('coinDropDown' + i).innerText = 'Other';
        document.getElementById('coinDisplayInput' + i).style = 'display: block';
    }
  }
  
  //make sure to hide the input when another student is selected.
  function showReasonInput() {
    clearReasonInputs();
  
    for (i = 0; i < 5; i++) {
        document.getElementById('reasonDropDown' + i).innerText = 'Other';
        document.getElementById('reasonField' + i).style = 'display: block';
    }
  }
  
  function modifyCoins(index) {
    clearCoinInputs();
  
    if (index == 0) {
      for (i = 0; i < 5; i++) {
        document.getElementById('coinDropDown' + i).innerText = 'Coins: +1';
      }
    } else if (index == 1) {
      for (i = 0; i < 5; i++) {
        document.getElementById('coinDropDown' + i).innerText = 'Coins: +5';
      }
    } else if (index == 2) {
      for (i = 0; i < 5; i++) {
        document.getElementById('coinDropDown' + i).innerText = 'Coins: +10';
      }
    }
  }
  
  function clearAll() {
    clearStudentInformation();
    clearStudents();
    clearCoinInputs();
    clearReasonInputs();
    clearCoinModifications();
    clearReasonModifications()
}
  
  function clearDropDowns() {
    clearStudents();
    clearStudentInformation();
    showAllStudents();
}