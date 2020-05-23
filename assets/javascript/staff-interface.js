//!  ------------------------------------------------------------------------------------------
//!
//!  staff-interface.js
//!  St Gregory's College Rewards Web Application
//!
//!  Developed by Cooper Beltrami and Robert Bisset
//!  Copyright (c) 2020 Cooper Beltrami & Robert Bisset All Rights Reserved.
//!
//!  This code is licenced between Cooper Beltrami, Robert Bisset and St Gregory's College
//!
//!  ------------------------------------------------------------------------------------------

function loadStaffInterface() {
    loadSearchInterface()
}

function loadAdministratorInterface() {
    loadSearchInterface()
}

function loadSearchInterface() {
    // Load student 
    for (i = 0; i < 5; i ++) {
        document.getElementById(`student-dropdown-${i}`).innerHTML =

        // HTML Code
        `
        <div class="card collapse collapse-properties" id="studentObject${i}" style="display: block;">
            <div class="card-header" style="height: 46px; padding: 0px; border: none;">
                <div class="studentNameSelection studentNameHover" id="studentName${i}" onclick="showDropDown(this.id.replace('studentName', ''))"></div>
                <div class="student-search-buttons">
                    <button class="merit-button btn btn-primary btn-sm" style="margin-right: 10px; display: none;" id="meritButton${i}" onclick="showStudentMerit('meritButton${i}')">Merit</button>
                    <button class="profile-button btn btn-primary btn-sm" id="profileButton${i}" onclick="loadStudentProfile('profileButton${i}')">Profile</button>
                </div>
            </div>
            <div class="card-body" id="studentInformation${i}" style="display: none;">
                <p class="card-text" style="margin-bottom: 8px; display: none;">Points:</p>
                <div class="dropdown" style="display: none;"></div>
                    <button class="btn btn-primary dropdown-toggle" type="button" id="coinDropDown${i}" style="display: none;" data-toggle="dropdown">Point Selection</button>
                    <div class="dropdown-menu" id="coinDropdownMenu${i}">
                        
                    </div>
                    <div class="input-properties input-coin" id="coinDisplayInput${i}" style="display: none;">
                        <div class="input-group mb-2">
                            <div class="input-group-prepend">
                                <div class="input-group-text">+</div>
                            </div>
                            <input type="number" class="form-control" id="coinInput${i}" max="50" placeholder="Other..." style="text-align: left; cursor: text;">
                        </div>
                    </div>
                    <div style="padding-top: 0px;">
                        <div>
                            <button class="btn btn-primary dropdown-toggle" type="button" id="reasonDropDown${i}" data-toggle="dropdown">Select Reason</button>
                            <div class="dropdown-menu" id="reasonDropdownMenu${i}">
                                
                            </div>
                        </div>
                        <input class="form-control input-reason input-properties" type="text" id="reasonField${i}" placeholder="Other..." style="display: none;">
                        <button class="btn btn-success btn-save" id="save${i}" style="margin-top: 15px;" onclick="updateStudentData(this.id.replace('save', ''))">Save</button>
                        <p class="error" id="error-text-save" style="display: none;"></p>
                    </div>
                </div>
            </div>
        `

        // Focus on the search input field
        document.getElementById('inputField').focus()
    }
}

function loadDropdownItems() {
    getDropdownSnapshot('Items/Points', true)
    getDropdownSnapshot('Items/Reasons', false)
}

// Get a snapshot of data for both points and reasons
function getDropdownSnapshot(reference, isPoints) {
    var databaseReference = database.ref(`${reference}/`)
    var pointIndex = 0
    var reasonIndex = 0

    databaseReference.once('value', function(snapshot) {
        if (isPoints == true) {
            snapshot.forEach(function(childSnapshot) {
                populatePoints(childSnapshot.val(), pointIndex)
                pointIndex ++
            })

            populatePointOther()
        }else{
            snapshot.forEach(function(childSnapshot) {
                populateReasons(childSnapshot.val(), reasonIndex)
                reasonIndex ++
            })

            populateReasonOther()
        }
    })
}

// Load dropdown with reason items
function populateReasons(item, index) {
    for (count = 0; count < 5; count ++) {
        var a = document.createElement('A')
        a.className = 'dropdown-item'
        a.style = 'cursor: pointer;'
        a.innerText = item
        a.id = 'reasonItem' + index
        document.getElementById('reasonDropdownMenu' + count).appendChild(a)

        a.addEventListener('click', function() {
            for (i = 0; i < 5; i++) {
                document.getElementById('reasonField' + i).style = 'display: none'
                document.getElementById('reasonDropDown' + i).innerText = "Reason: " + item
            }
        })
    }
}

// Load dropdown with point items
function populatePoints(item, index) {
    for (count = 0; count < 5; count ++) {
        var a = document.createElement('A')
        a.className = 'dropdown-item'
        a.style = 'cursor: pointer;'
        a.innerText = '+' + item
        a.id = 'coinItem' + index
        document.getElementById('coinDropdownMenu' + count).appendChild(a)

        a.addEventListener('click', function() {
            for (i = 0; i < 5; i++) {
                document.getElementById('coinDisplayInput' + i).style = 'display: none'
                document.getElementById('coinDropDown' + i).innerText = "Points: +" + item
            }
        });
    }
}

// Create reason interface for other dropdown item and input field
function populateReasonOther() {
    for (i = 0; i < 5; i ++) {
        var div0 = document.createElement('DIV')
        div0.className = 'dropdown-divider'
        document.getElementById('reasonDropdownMenu' + i).appendChild(div0)

        var a1 = document.createElement('A')
        a1.className = 'dropdown-item'
        a1.style = 'cursor: pointer'
        a1.innerText = 'Other'
        document.getElementById('reasonDropdownMenu' + i).appendChild(a1)
        a1.addEventListener('click', function() {
            showReasonInput()
        })
    }
}

// Create point interface for other dropdown item and input field
function populatePointOther() {
    for (i = 0; i < 5; i ++) {
        var div = document.createElement('DIV')
        div.className = 'dropdown-divider'
        document.getElementById('coinDropdownMenu' + i).appendChild(div)

        var a1 = document.createElement('A')
        a1.className = 'dropdown-item'
        a1.style = 'cursor: pointer;'
        a1.innerText = 'Other'
        document.getElementById('coinDropdownMenu' + i).appendChild(a1)
        a1.addEventListener('click', function() {
            showCoinInput()
        })
    }
}

// Load data into student profile modal
function loadStudentProfile(id) {
    var studentNumber = document.getElementById(id).getAttribute('studentnumber')

    firebase.database().ref(`Users/Students/${studentNumber}/`).once('value', function(snapshot) {
        var modalHeader = `${snapshot.val().Name.substring(0, snapshot.val().Name.indexOf(' '))}'s Profile`
        var NameLine = `${snapshot.val().Name} (${snapshot.val().StudentNumber})`
        var Points = `<strong>Points </strong> ${snapshot.val().Points}`
        var Notifications = `<strong>Notifications </strong>${(snapshot.val().fcmToken) ? 'Enabled' : 'Disabled'}`
        var YearGroup = `<strong>Year</strong> ${snapshot.val().YearGroup}`
        var ProfilePicture = (snapshot.val().profileUrl) ? snapshot.val().profileUrl : '../assets/images/user.png'

        writeToElement('profileModalLongTitle', modalHeader)
        writeToElement('profile-yeargroup', YearGroup)
        writeToElement('profile-name', NameLine)
        writeToElement('profile-points', Points)
        writeToElement('profile-notifications', Notifications)
        document.getElementById('profile-picture').setAttribute('src', ProfilePicture)
        document.getElementById('profileModalButton').click()
    })
}
 
// Show modal for creating positive merit
function showStudentMerit(id) {
    var studentNumber = document.getElementById(id).getAttribute('studentnumber')

    firebase.database().ref(`Users/Students/${studentNumber}/`).once('value', function(snapshot) {
        writeToElement('meritModalText', `Award a positive merit to <strong>${snapshot.val().Name}</strong> in <strong>Year ${snapshot.val().YearGroup}</strong>`)

    })
    
    document.getElementById('awardMerit').setAttribute('studentnumber', studentNumber)
    document.getElementById('meritModalButton').click()
}

function awardStudentMerit(id) {
    var studentNumber = document.getElementById(id).getAttribute('studentnumber')
    var comment = document.getElementById('reasonInputField')
    var subject = document.getElementById('subjectInputField')
    var studentName = ''

    firebase.database().ref(`Users/Students/${studentNumber}/`).once('value', snapshot => {
        var firstName = snapshot.val().Name.substring(0, snapshot.val().Name.indexOf(' '))
        studentName = snapshot.val().Name
        
        // Send email
        try {
            Email.send({
                SecureToken : "1de1347d-5eef-4a20-a462-d02f14d25f51",
                To : `${studentNumber}@stgregs.nsw.edu.au`,
                From : "St Greg\'s Rewards <rewards@stgregs.nsw.edu.au>",
                Subject : 'Positive Merit Notification',
                Body : `Dear ${firstName},
                </br></br>
                <strong>${getUser().toUpperCase()}</strong> has recognised your positive efforts in <strong>${subject.value.toUpperCase()}</strong>.
                </br></br>
                Teacher's comment:
                </br>
                ${comment.value}
                </br>
                </br>
                Regards,</br>
                <a href="rewards.stgregs.nsw.edu.au">St Greg's Rewards</a>`
            }).then(() => {
                console.log('Email sent!')

                // Create new log
                var databaseReference = database.ref(`Users/Students/${studentNumber}/`)
                var logStudentReference = database.ref(`Logs/Students/${studentNumber}/`)
                var logStaffReference = database.ref(`Logs/Staff/${getUser()}/`)

                writeDatabaseLog(getUser(), studentName, 3, getDate(), "Positive Merit",studentNumber , logStudentReference, logStaffReference)
                writeToModal(studentNumber, 3, snapshot.val().YearGroup, studentName)
                updatePoints(databaseReference, 3, false)
            })
        } catch (error) {
            alert(error)
            console.log(error)
        }
    })
}