//!  ------------------------------------------------------------------------------------------
//!
//!  student-interface.js
//!  St Gregory's College Rewards Web Application
//!
//!  Developed by Cooper Beltrami and Robert Bisset
//!  Copyright (c) 2020 Cooper Beltrami & Robert Bisset All Rights Reserved.
//!
//!  This code is licenced between Cooper Beltrami, Robert Bisset and St Gregory's College
//!
//!  ------------------------------------------------------------------------------------------

function loadStudentInterface() {
    hideElement('searchInterface')
}

function populateTopTen() {
    var e = document.getElementById('cohortSelection')
    var selectedYearGroup = e.options[e.selectedIndex].value
    
    // Wipe out existing values
    for (i = 1; i < 11; i ++) {
      document.getElementById(`top10InCohort-${i}-Name`).innerText = ""
      document.getElementById(`top10InCohort-${i}-Points`).innerText = ""
      document.getElementById(`top10InCohort-${i}-Year`).innerText = ""
    }

    hideElement('schoolTopTen-subHeading')
  
    if (selectedYearGroup == "All") {
      getSchoolTopTen()
    } else {
      getCohortTop10()
    }
}

function getCohortTop10() {
  database.ref('Users/Students/').on('value', function(snapshot) {
    var yearXStudents = []
    var index = 0
    var e = document.getElementById('cohortSelection')
    var selectedYearGroup = e.options[e.selectedIndex].value
    
    hideElement(`top-ten-year`)
    showElement('last10PointsHeadings')

    snapshot.forEach(function(childSnapshot) {
      
      if (childSnapshot.val().YearGroup == selectedYearGroup) {
        yearXStudents[index] = {Name: childSnapshot.val().Name, Points: childSnapshot.val().Points, Year: childSnapshot.val().YearGroup} // Add year X students to object
        
        index ++
      }
      yearXStudents.sort(sortArrayByKey("Points", "desc")) // Sort array based on student points
    })

    for (i = 1; i < 11; i ++) {
      document.getElementById(`top10InCohort-${i}-Name`).innerText = `${i}.  ${yearXStudents[i-1].Name}`
      document.getElementById(`top10InCohort-${i}-Points`).innerText = `Points: ${yearXStudents[i-1].Points}`
      document.getElementById(`top10InCohort-${i}-Year`).innerText = "" //`Year ${yearXStudents[i-1].Year}`
    }
  })
}

var filtered = false

function filterRecentPoints() {
  if (filtered === false) {
    document.getElementById('recent-points-header').innerText = 'Filtered Points'
    document.getElementById('recent-points-button').innerText = 'View Recent'
    hideElement('')
    filtered = true
  } else {
    document.getElementById('recent-points-header').innerText = 'Recent'
    document.getElementById('recent-points-button').innerText = 'View Filtered'
    filtered = false
  }
}