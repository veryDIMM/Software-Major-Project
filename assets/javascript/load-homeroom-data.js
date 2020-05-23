//!  ------------------------------------------------------------------------------------------
//!
//!  load-homeroom-data.js
//!  St Gregory's College Rewards Web Application
//!
//!  Developed by Cooper Beltrami and Robert Bisset
//!  Copyright (c) 2020 Cooper Beltrami & Robert Bisset All Rights Reserved.
//!
//!  This code is licenced between Cooper Beltrami, Robert Bisset and St Gregory's College
//!
//!  ------------------------------------------------------------------------------------------

var homeroomCode = ''

function homeroomButtonClick(homeroomId) {
    console.log(homeroomId)

    firebase.database().ref(`/Users/Students/`).orderByChild('HomeRoom').equalTo(homeroomId).once('value', snapshot => {
        var numberOfStudents = Object.keys(snapshot.val()).length
        var studentsHtml = ''

        // Get the homeroom code
        homeroomCode = snapshot.child(Object.keys(snapshot.val())[0]).val().HomeRoom
        var yearGroup = snapshot.child(Object.keys(snapshot.val())[0]).val().YearGroup
        var index = 0

        // Clear all homeroom dropdowns
        for (i = 7; i < 12 + 1; i++) {
            hideElement(`year${i}-card`)
        }
        
        writeToElement(`year${yearGroup}-heading`, homeroomCode)
        showElement(`year${yearGroup}-card`)

        // Clear all homerooms other than the one selected
        for (i = 7; i < 12 + 1; i++) {
            if (yearGroup != i) {
                hideElement(`year${i}-homerooms`)
            }
        }

        // Load all students into html
        snapshot.forEach(student => {
            studentsHtml += `
            <div class="input-group-prepend student-item studentNameHover" id="student${index}" studentnumber="${student.val().StudentNumber}">
                <div class="studentName">${student.val().Name} (${student.val().StudentNumber})</div>
                <div class="input-group-prepend input-group-sm points-input-group">
                    <button class="btn btn-secondary btn-sm modifier-buttons" style="border-top-right-radius: 0; border-bottom-right-radius: 0; box-shadow: none;" id="decreaseButton${index}" onclick="decreasePoints(this.id)">-</button>
                    <input type="number" class="points-input-field" style="border-radius: 0; height: 30px; outline: none;" value="0" id="pointsInput${index}">
                    <button class="btn btn-primary btn-sm modifier-buttons" style="border-top-left-radius: 0; border-bottom-left-radius: 0; box-shadow: none;" id="increaseButton${index}" onclick="increasePoints(this.id)">+</button>
                </div>
            </div>
            `

            index++
        })

        // Load students into page
        document.getElementById(`year${yearGroup}-homeroom-students`).innerHTML = studentsHtml
    })
}

function cancelHomeroomSearch() {
    var currentUrl = window.location.href
    window.location.href = currentUrl
}

function decreasePoints(elementID) {
    var points = document.getElementById('pointsInput' + elementID.replace('decreaseButton', '')).value

    if (points == 1) {
        document.getElementById(elementID).classList.remove('btn-primary')
        document.getElementById(elementID).classList.add('btn-secondary')
    }

    if (points > 0) {
        document.getElementById('pointsInput' + elementID.replace('decreaseButton', '')).value--
    }
}

function increasePoints(elementID) {
    var points = document.getElementById('pointsInput' + elementID.replace('increaseButton', '')).value

    if (points == 0){
        document.getElementById(elementID.replace('in', 'de')).classList.remove('btn-secondary')
        document.getElementById(elementID.replace('in', 'de')).classList.add('btn-primary')
    }

    if (points < 20) {
        document.getElementById('pointsInput' + elementID.replace('increaseButton', '')).value++
    }
}

function saveChanges(homeroomStudents) {
    var homeroomHtml = [homeroomStudents]
    var numberOfStudents = homeroomHtml[0].childElementCount * 2
    var studentList = []
    var totalPoints = 0

    for (var i = 0; i < numberOfStudents; i++) {
        var studentElement = homeroomHtml[0].childNodes[i]
        var elementID = studentElement.id

        if (elementID != undefined) {
            var studentNumber =  studentElement.getAttribute('studentnumber')
            var elementIndex = elementID.replace('student', '')
            var pointsValue = document.getElementById('pointsInput' + elementIndex).value

            studentList[i] = {StudentNumber: studentNumber, Points: pointsValue}
        }
    }

    studentList.forEach(element => {
        firebase.database().ref(`Users/Students/${element.StudentNumber}`).once('value', snapshot => {
            var updatedPoints = parseInt(snapshot.val().Points) + parseInt(element.Points)
            totalPoints + element.Points

            console.log(element.StudentNumber, updatedPoints)

            firebase.database().ref(`Users/Students/${element.StudentNumber}`).update({
                Points: updatedPoints
            })

            // Make sure the user if receiving points
            if (element.Points != 0) {
                var logStudentReference = database.ref(`Logs/Students/${element.StudentNumber}`)
                var logStaffReference = database.ref(`Logs/Staff/Green_Stamps/${getUser()}`)

                writeDatabaseLog(getUser(), snapshot.val().Name, element.Points, getDate(), 'Green Stamp', element.StudentNumber, logStudentReference, logStaffReference)
            }
        })
    })

    // Log once for the staff member
    database.ref(`Logs/Staff/${getUser()}`).push({
        Reason: 'Green Stamps',
        Time: getDate(),
        Points: totalPoints,
        Student: `Homeroom - ${homeroomCode}`,
        StudentNumber: 'N/A',
    })

    document.getElementById('saveChangesModalButton').click()
}

function giveAllPoints(homeroomStudents) {
    var homeroomHtml = [homeroomStudents]
    var numberOfStudents = homeroomHtml[0].childElementCount * 2

    for (var i = 0; i < numberOfStudents; i++) {
        var studentElement = homeroomHtml[0].childNodes[i]
        var elementID = studentElement.id

        if (elementID != undefined) {
            var elementIndex = elementID.replace('student', '')
            var pointsValue = document.getElementById('pointsInput' + elementIndex)

            pointsValue.value = parseInt(pointsValue.value) + 1
        }
    }
}