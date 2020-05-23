//!  ------------------------------------------------------------------------------------------
//!
//!  firebase-notifications.js
//!  St Gregory's College Rewards Web Application
//!
//!  Developed by Cooper Beltrami and Robert Bisset
//!  Copyright (c) 2020 Cooper Beltrami & Robert Bisset All Rights Reserved.
//!
//!  This code is licenced between Cooper Beltrami, Robert Bisset and St Gregory's College
//!
//!  ------------------------------------------------------------------------------------------

function notificationPermission() {
    messaging.requestPermission().then(function() {
      console.log('User notification persmission granted')
        return messaging.getToken()
    }).then(function(token) {
      console.log(token)
        setUserToken(token)
    }).catch(function(err) {
        console.log('Error Occured: ', err)
    })
  
    messaging.onMessage(function(payload) {
      showNotificationAlert(payload)
    })
  }
  
  function showNotificationAlert(payload) {
    writeToElement(`exampleModalLongTitle`, `You Received Points!`)
    writeToElement(`modalText`, `${payload.notification.body}`)
    showElement(`modalOkayButton`)
  
    document.getElementById(`displayModalButton`).click()
  }