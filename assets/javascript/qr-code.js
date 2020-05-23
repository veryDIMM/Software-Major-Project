//!  ------------------------------------------------------------------------------------------
//!
//!  qr-code.js
//!  St Gregory's College Rewards Web Application
//!
//!  Developed by Cooper Beltrami and Robert Bisset
//!  Copyright (c) 2020 Cooper Beltrami & Robert Bisset All Rights Reserved.
//!
//!  This code is licenced between Cooper Beltrami, Robert Bisset and St Gregory's College
//!
//!  ------------------------------------------------------------------------------------------

function getStudentFromUrl() {
    let url = window.location.href // get url

    if (url.includes('/?=')) {
        let studentNumber = url.substring(url.length - 5, url.length) // get student number from url

        // make sure the student exists in the database
        database.ref('Users/Students/').child(studentNumber).once('value', function(snapshot) {
            if (snapshot.val() != null){
                var studentName = snapshot.child('Name').val()
                var studentYear = snapshot.child('YearGroup').val()

                writeToModal(studentNumber, 1, studentYear, studentName)
                qrWriteToDatabase(studentNumber, studentName, studentYear)
            } else {
                throw("Student not found in database. Snapshot = null")
            }
        })
    }
}

function writeToModal(studentNumber, points, studentYear, studentName) {
    var pointsWording = " point has"

    // change wording depending on number of points
    if (points > 1) {
      pointsWording = " points have"
    }

    points = points.toString()

    let modalTextContent = `<b>${points}</b> ${pointsWording} been added to <b>${studentName} (${studentNumber})</b> in <b>Year ${studentYear}</b>.`
    writeToElement('modalText', modalTextContent)
}

function qrWriteToDatabase(studentNumber, studentName, yearGroup) {
    const staff = getUser()
    const time = getDate()
    const points = 1
    var reasons = "QR"

    // Change reason depending on user type. 
    //! This will only happen on student services staff
    if (getUser() == 'dsherd' || getUser() == 'lwilloughby' || getUser() == 'junderwood') {
        if (yearGroup == '8') {
            reasons = "Office Boy"
        } else if (yearGroup == '9') {
            reasons = "Flag Boy"
        }
    }

    var databaseReference = database.ref('Users/Students/').child(studentNumber)
    var logStudentReference = database.ref('Logs/Students/').child(studentNumber)
    var logStaffReference = database.ref('Logs/Staff/').child(staff)

    writeDatabaseLog(staff, studentName, points, time, reasons, studentNumber, logStudentReference, logStaffReference)
    updatePoints(databaseReference, points, true)
}