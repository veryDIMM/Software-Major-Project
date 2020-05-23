//!  ------------------------------------------------------------------------------------------
//!
//!  rewards.js
//!  St Gregory's College Rewards Web Application
//!
//!  Developed by Cooper Beltrami and Robert Bisset
//!  Copyright (c) 2020 Cooper Beltrami & Robert Bisset All Rights Reserved.
//!
//!  This code is licenced between Cooper Beltrami, Robert Bisset and St Gregory's College
//!
//!  ------------------------------------------------------------------------------------------

var selectedReward
var selectedRewardPoints

// Show redeem buttons for student 
if (isUserStudent(getUser())){
    var x = document.getElementsByClassName("btn-redeem");
    var i;
    for (i = 0; i < x.length; i++) {
        x[i].style.display = 'block';
    }
}

function redeemReward(rewardsPoints, reward) {
    selectedReward = reward
    selectedRewardPoints = rewardsPoints
    var currentPoints = 0

    // Get current amount of points
    database.ref('Users/Students/').child(getUser(false)).once('value', function(snapshot) {
          currentPoints = snapshot.val().Points
    })

    // Check if the user has enough points
    if (currentPoints >= rewardsPoints) {
        var balance = currentPoints - rewardsPoints
        console.log(`Current Points: ${currentPoints}. Reward Cost: ${rewardsPoints} Balance: ${balance}.`)
        
        document.getElementById(`redeemPointsModalText`).innerHTML = 
        
        `
        You will be claiming <strong>${reward}</strong> for <strong>${rewardsPoints}</strong> points. </br></br>

        <strong>Current Points:</strong> ${currentPoints}</br>
        <strong>Reward Points:</strong> ${rewardsPoints}</br>
        <strong>Points Balance:</strong> ${balance}</br></br>
        `

        document.getElementById(`displayRedeemPointsModalButton`).click()
    } else {
        document.getElementById(`displayInsufficientPointsModalButton`).click()
    }
}

function redeemRewardConfirmed() {
    try {
        Email.send({
            SecureToken : "1de1347d-5eef-4a20-a462-d02f14d25f51",
            To : 'bvetrano@stgregs.nsw.edu.au',
            From : "rewards@stgregs.nsw.edu.au",
            Subject : `${getUserName()} has redeemed a reward!`,
            Body : `Hi Mr Vetrano,</br>
            </br>
            <strong>${getUserName()} (${getUser()})</strong> has redeemed the reward <strong>${selectedReward}</strong>.</br></br>
            Let them know when you have actioned their request. </br>
            <a href="mailto:${getUser()}@stgregs.nsw.edu.au">${getUser()}@stgregs.nsw.edu.au</a></br>
            </br>
            St Greg's Rewards</br>
            <a href="rewards.stgregs.nsw.edu.au">St Greg's Rewards</a>`
        }).then(
          console.log('Email sent!')
        );
    
        // Take away the points from the user
        var databaseRef = database.ref('Users/Students/').child(getUser(false))
        
        databaseRef.once('value', function(snapshot) {
            newPointsValue = snapshot.val().Points - selectedRewardPoints
            databaseRef.update({
                Points: newPointsValue
            })
        })

        document.getElementById('successAlert').style.display = "block"

    } catch (error) {
        document.getElementById('failureAlert').style.display = "block"
        console.log(error)
    }
}

