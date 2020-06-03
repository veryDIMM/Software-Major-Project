//!  ------------------------------------------------------------------------------------------
//!
//!  charts.js
//!  St Gregory's College Rewards Web Application
//!
//!  Developed by Cooper Beltrami and Robert Bisset
//!  Copyright (c) 2020 Cooper Beltrami & Robert Bisset All Rights Reserved.
//!
//!  This code is licenced between Cooper Beltrami, Robert Bisset and St Gregory's College
//!
//!  ------------------------------------------------------------------------------------------

var yearGroupDataGlobal = []

// Generate Stage Challenge Chart 
// Done here so that the stageChart var can be accessed later.
var stageChartctx = document.getElementById('stageChallengeChart').getContext('2d');

var stageChart = new Chart(stageChartctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: ["Year 11", "Year 12"],
        datasets: [{
            label: '',
            backgroundColor: 'rgba(123, 180, 223, 0.6)',
            borderColor: 'rgb(130,0,36)',
            pointBackgroundColor:  'rgb(238, 179, 20)',
            borderWidth: '2',
            data: [yearGroupDataGlobal[11],yearGroupDataGlobal[12]]
        }]
    },

    // Configuration options go here
    options: {
        responsive: true,
        maintainAspectRatio: false,
        
        legend: {
            display: false,
        },
        elements: {
            point: {
                backgroundColor: 'rgba(126, 0, 1, 1)'
            }
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: false,
            }
          }],
          yAxes: [{
            gridLines: {
                display:false
            },
            ticks: {
              beginAtZero: true,
              precision:0
            }   
        }]
        }
    }
});

// Get Data for Charts
var yearChartctx = document.getElementById('yearTotalsChart').getContext('2d')
    var yearChart = new Chart(yearChartctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: ['Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11', 'Year 12'],
            datasets: [{
                label: '',
                backgroundColor: 'rgba(123, 180, 223, 0.4)',
                borderColor: 'rgba(136, 0, 36, 1)',
                pointBackgroundColor:  'rgb(238, 179, 20)',
                data: yearGroupDataGlobal,
            }]
        },

        // Configuration options go here
        options: {
            responsive: true,
            maintainAspectRatio: false,
            
            legend: {
                display: false,
            },
            elements: {
                point: {
                    backgroundColor: 'rgba(126, 0, 1)'
                }
            },
            scales: {
              xAxes: [{
                gridLines: {
                  display: false,
                }
              }],
              yAxes: [{
                gridLines: {
                    display:false
                },
                ticks: {
                  beginAtZero: true,
                  precision:0
                }     
            }]
            }
        }
  })

function getYearGroupTotals() {

  database.ref('Users/Students/').on('value', function(snapshot) {
    var year0Totals = 0, year1Totals = 0, year2Totals = 0, year3Totals = 0, year4Totals = 0, year5Totals = 0
    ,year6Totals = 0, year7Totals = 0, year8Totals = 0, year9Totals = 0, year10Totals = 0, year11Totals = 0, year12Totals = 0

      snapshot.forEach(function(childSnapshot) {
          switch(childSnapshot.child("YearGroup").val()){
            case "K": 
              year0Totals += childSnapshot.child("Points").val();
              break;
            case "1": 
              year1Totals += childSnapshot.child("Points").val();
              break;
            case "2": 
              year2Totals += childSnapshot.child("Points").val();
              break;
            case "3": 
              year3Totals += childSnapshot.child("Points").val();
              break;
            case "4": 
              year4Totals += childSnapshot.child("Points").val();
              break;
            case "5": 
              year5Totals += childSnapshot.child("Points").val();
              break;
            case "6": 
              year6Totals += childSnapshot.child("Points").val();
              break;a
            case "7": 
              year7Totals += childSnapshot.child("Points").val();
              break;
            case "8": 
              year8Totals += childSnapshot.child("Points").val();
              break;
            case "9":
              year9Totals += childSnapshot.child("Points").val();
              break;
            case "10":
              year10Totals += childSnapshot.child("Points").val();
              break;
            case "11":
              year11Totals += childSnapshot.child("Points").val();
              break;
            case "12":
              year12Totals += childSnapshot.child("Points").val();
              break;
            default:
          }
      })
      
      yearGroupDataGlobal = ([year0Totals,year1Totals,year2Totals,year3Totals,year4Totals,year5Totals,year6Totals,year7Totals,year8Totals,year9Totals,year10Totals,year11Totals,year12Totals])
      
      // Iterate through and populate chart with all data from array
      for (i = 7, a = 0; i < 13; i++, a++) {
        yearChart.data.datasets[0].data[a] = yearGroupDataGlobal[i]
      }

      yearChart.update()

      document.getElementById('yearTotalsChart').style.display = 'flex'
      hideElement('yearGroupTotals-Loader')
      
      generateStageChallengeChart()
      hideElement('stageChallengeTotals-Loader')
      document.getElementById('stageChallengeChart').style.display = 'flex'

      writeToElement('year0Points', `<strong>Kindy:</strong> ${year0Totals}`)
      writeToElement('year1Points', `<strong>Year 1:</strong> ${year1Totals}`)
      writeToElement('year2Points', `<strong>Year 2:</strong> ${year2Totals}`)
      writeToElement('year3Points', `<strong>Year 3:</strong> ${year3Totals}`)
      writeToElement('year4Points', `<strong>Year 4:</strong> ${year4Totals}`)
      writeToElement('year5Points', `<strong>Year 5:</strong> ${year5Totals}`)
      writeToElement('year6Points', `<strong>Year 6:</strong> ${year6Totals}`)
      writeToElement('year7Points', `<strong>Year 7:</strong> ${year7Totals}`)
      writeToElement('year8Points', `<strong>Year 8:</strong> ${year8Totals}`)
      writeToElement('year9Points', `<strong>Year 9:</strong> ${year9Totals}`)
      writeToElement('year10Points', `<strong>Year 10:</strong> ${year10Totals}`)
      writeToElement('year11Points', `<strong>Year 11:</strong> ${year11Totals}`)
      writeToElement('year12Points', `<strong>Year 12:</strong> ${year12Totals}`)

  })
  
}


function generateStageChallengeChart(){
  var e = document.getElementById('stageSelection')
  var selectedStage = e.options[e.selectedIndex].value

  var yearGroup1
  var yearGroup2

  if (selectedStage == '4') {
    yearGroup1 = "7"
    yearGroup2 = "8"
  } else if (selectedStage == '5') {
    yearGroup1 = "9"
    yearGroup2 = "10"
  } else if (selectedStage == '6') {
    yearGroup1 = "11"
    yearGroup2 = "12"
  }

  stageChart.data.datasets[0].data[0] = yearGroupDataGlobal[yearGroup1]
  stageChart.data.datasets[0].data[1] = yearGroupDataGlobal[yearGroup2]
  stageChart.data.labels = ["Year " + yearGroup1,"Year " + yearGroup2]
  if (yearGroupDataGlobal[yearGroup1] < yearGroupDataGlobal[yearGroup2]) {
    stageChart.data.datasets[0].backgroundColor = ['rgba(123, 180, 223, 0.4)','rgba(136, 0, 36, 0.4)']
    stageChart.data.datasets[0].borderColor = ['rgba(123, 180, 223)','rgba(136, 0, 36)']
  } else if (yearGroupDataGlobal[yearGroup1] > yearGroupDataGlobal[yearGroup2]) {
    stageChart.data.datasets[0].backgroundColor = ['rgba(136, 0, 36, 0.4)','rgba(123, 180, 223, 0.4)']
    stageChart.data.datasets[0].borderColor = ['rgba(136, 0, 36)','rgba(123, 180, 223)']
  } else {
    stageChart.data.datasets[0].backgroundColor = ['rgba(136, 0, 36, 0.4)','rgba(136, 0, 36, 0.4)']
    stageChart.data.datasets[0].borderColor = 'rgba(136, 0, 36)'
  }

  stageChart.update();
}


function switchTableAndChart(heading) {
    if (heading == "yearTotals"){
        if (document.getElementById('yearTotalsChart').style.display === 'none') {
            //getYearGroupTotals()
            document.getElementById('yearTotalsChart').style.display = 'flex'
            document.getElementById('yearTotalsChart').style.width = '100%'
            document.getElementById('yearTotalsToggle').innerText = 'View Table'
            hideElement('YearGroupTotals')
        } else  {
            hideElement('yearTotalsChart')
            document.getElementById('YearGroupTotals').style.display = 'flex'
            document.getElementById('yearTotalsToggle').innerText = 'View Graph'
        }
    }

    if (heading == "stageChallenge"){
      if (document.getElementById('stageChallengeChart').style.display === 'none') {
        generateStageChallengeChart("11","12");
        document.getElementById('stageChallengeChart').style.display = 'flex'
        document.getElementById('stageChallengeToggle').innerText = 'View Table'
        hideElement('stageChallengeTotals')
    } else  {
        hideElement('stageChallengeChart')
        document.getElementById('stageChallengeTotals').style.display = 'flex'
        document.getElementById('stageChallengeToggle').innerText = 'View Graph'
      }
    }

    if (heading == "totalPoints"){
      if (document.getElementById('totalsChart').style.display === 'none') {
        document.getElementById('totalsChart').style.display = 'flex'
        document.getElementById('recent-points-button').innerText = 'View Recents'
        document.getElementById('recentPoints-Headings').style.display = 'none'
        hideElement('recent-points-list')
        totalsChart.update()
    } else  {
        hideElement('totalsChart')
        document.getElementById('recent-points-list').style.display = 'block'
        document.getElementById('recent-points-button').innerText = 'View Totals'
        document.getElementById('recentPoints-Headings').style.display = 'block'
      }
    }

}

var totalsChartctx = document.getElementById('totalsChart').getContext('2d');

  var totalsChart = new Chart(totalsChartctx, {
      // The type of chart we want to create
      type: 'bar',

      // The data for our datase t
      data: {
          labels: ["Green Stamps", "Positive Merits", "Others"],
          datasets: [{
              label: '',
              backgroundColor: ['rgba(123, 180, 223, 0.4)','rgba(136, 0, 36, 0.4)','rgb(238, 179, 20, 0.4)'],
              borderColor: ['rgb(123, 180, 223)','rgba(136, 0, 36)','rgb(238, 179, 20)'],
              pointBackgroundColor:  'rgb(238, 179, 20)',
              borderWidth: '2',
              data: [],
          }]
      },

      // Configuration options go here
      options: {
          responsive: true,
          maintainAspectRatio: false,
          
          legend: {
              display: false,
          },
          elements: {
              point: {
                  backgroundColor: 'rgba(126, 0, 1, 1)'
              }
          },
          scales: {
            xAxes: [{
              gridLines: {
                display: false,
              }
            }],
            yAxes: [{
              gridLines: {
                  display:false
              },
              ticks: {
                beginAtZero: true,
                precision:0
              }   
          }]
          }
      }
  })

function getRecentPoints() {
  var databaseReference = database.ref(`Logs/Students/${getUser()}`)
  var recentStaffArray = []
  var recentStudentArray = []

  databaseReference.on('value', function(snapshot) {
    var totalGreenStamp = 0
    var totalPositiveMerit = 0
    var totalOther = 0

    var rewardsArray = []

    snapshot.forEach(function(points) {
      if (points.val().Reason.substring(0,11) == "Green Stamp") {
        totalGreenStamp += parseInt(points.val().Points)
      } else if (points.val().Reason == "Positive Merit") {
        totalPositiveMerit += parseInt(points.val().Points)
      } else {
        totalOther += parseInt(points.val().Points)
      }
    })
    
    rewardsArray = {greenStamp: totalGreenStamp, positiveMerit: totalPositiveMerit, otherPoints: totalOther}

    loadRewardsGraphData(rewardsArray)
  })

  // Change the database reference to the staff one
  if (isUserStudent(getUser()) == false) {
    databaseReference = database.ref(`Logs/Staff/${getUser()}`)
  }

  // Get the data from firebase using the reference above
  databaseReference.limitToLast(10).on('value', function(snapshot) {
    recentStaffArray = []
    recentStudentArray = []
    var index = 1

    hideElement('last10Points-subHeading')

    snapshot.forEach(function(childSnapshot) {
      if (isUserStudent(getUser()) == false) {
        recentStaffArray[index] = {Student: childSnapshot.val().Student, Points: childSnapshot.val().Points, Reason: childSnapshot.val().Reason, Time: `${childSnapshot.val().Time.substring(4, 15)} - ${childSnapshot.val().Time.substring(16,21)}`, StudentNumber: childSnapshot.val().StudentNumber}
      }else{
        recentStudentArray[index] = {Staff: childSnapshot.val().Staff, Points: childSnapshot.val().Points, Reason: childSnapshot.val().Reason, Time: `${childSnapshot.val().Time.substring(4, 15)} - ${childSnapshot.val().Time.substring(16, 21)}`, StudentNumber: childSnapshot.val().StudentNumber}
      }
      
      showElement(`last10PointsUI-${index}`)
      index ++
    })

    // Reverse order of array to make sure that the latest record is on top
    recentStudentArray.reverse()
    recentStaffArray.reverse()

    if (isUserStudent(getUser()) == false) {
      // Display elements
      dipslayRecentTransactions(recentStaffArray, false)

    }else{
      // Student
      console.log('Loading Recent Transactions for Student')
      
      // Display elements
      dipslayRecentTransactions(recentStudentArray, true)
    }
  })
}

function loadRewardsGraphData(rewardsArray) {
  totalsChart.data.datasets[0].data[0] = rewardsArray.greenStamp
  totalsChart.data.datasets[0].data[1] = rewardsArray.positiveMerit
  totalsChart.data.datasets[0].data[2] = rewardsArray.otherPoints
  
  totalsChart.update()
}