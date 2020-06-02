//!  ------------------------------------------------------------------------------------------
//!
//!  admin.js
//!  St Gregory's College Rewards Web Application
//!
//!  Developed by Cooper Beltrami and Robert Bisset
//!  Copyright (c) 2020 Cooper Beltrami & Robert Bisset All Rights Reserved.
//!
//!  This code is licenced between Cooper Beltrami, Robert Bisset and St Gregory's College
//!
//!  ------------------------------------------------------------------------------------------

function runLoad() {
    getRewards()
}

// Reset point and reason list
function clearLists() {
    for (i = 1; i < 15; i++) {
        document.getElementById(`reasonsList-${i}`).style = 'display: none'
    }
}

// Get reward dropdown values
function getRewards() {
    clearLists()

    database.ref('/Items/Reasons').on('value', function(snapshot) {
        var index = 1

        snapshot.forEach(function(childSnapshot) {
            document.getElementById(`reasonsList-${index}`).innerHTML = `<div class="alert alert-primary">${index}. <strong>${childSnapshot.val()}</strong></div>`
            document.getElementById(`reasonsList-${index}`).style = 'display: block'

            index++
        })

        document.getElementById('reasons-loader').style = 'display: none'
    })
}

// Add new reason dropdown item
function addReasons() {
    var reason = document.getElementById('reasonsField').value

    if (reason != '') {
        database.ref('/Items/Reasons/').push(reason)
        database.getElementById('reasonsField').value = ""
        showElement('reasons-error')
    }
}

// Export database nodes to CSV file
function exportData(type) {
    console.log(`Exporting ${type} data.`)
    var path = `/Users/${type}`

    if (type == "Logs") {  
        path = '/Logs/'
    }

    database.ref(path).once('value', function(snapshot) {
        var csvContent = "data:text/csv;charset=utf-8,"
        var index = 0

        if (type == "Students") {
            csvContent += ["Homeroom","Name","Current Points","Student Number","Total Points", "Year Group", "FCM Token", "Profile Picture", "\r\n"]               
        } else if (type == "Staff") {
            csvContent += ["Staff Name","Administrator", "User ID", "\r\n"]
        }

        // Convert objects to an array
        snapshot.forEach(function(childSnapshot) {
            if (type == "Students") {
                csvContent += (Object.values(childSnapshot.val()) + ",\r\n")
            } else if (type == "Staff") {
                csvContent += (Object.keys(snapshot.val())[index] + "," + Object.values(childSnapshot.val()) + ",\r\n")
            } else if (type == "Logs") {
                var ii = 0
                childSnapshot.forEach(function(users) {
                    // Format:
                    // Space
                    // 63895
                    // Space
                    // Headings
                    // logs

                    // Add space for log data
                    csvContent += (" ,\r\n")

                    // User name
                    csvContent += (Object.keys(childSnapshot.val())[ii] + ",\r\n")

                    // Add space for log data
                    csvContent += (" ,\r\n")

                    // Headings
                    csvContent += ["Points","Reason","Name","Time","\r\n"]    

                    // Enumerate logs
                    users.forEach(function(log) {
                        csvContent += (Object.values(log.val()) + ",\r\n")
                    })
                    ii++
                })
            } 

            index++
        })

        // Download CSV
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `${type}_export.csv`);
        document.body.appendChild(link); // Required for FF
        link.click();
    })
    
}