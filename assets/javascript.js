$(document).ready(function(){

var firebaseConfig = {
    apiKey: "AIzaSyBJY3Jwq0EhAbRtoESRx6Fs0CuJkvLQYAQ",
    authDomain: "trainscheduler-6075a.firebaseapp.com",
    databaseURL: "https://trainscheduler-6075a.firebaseio.com",
    projectId: "trainscheduler-6075a",
    storageBucket: "trainscheduler-6075a.appspot.com",
    messagingSenderId: "475604701440",
    appId: "1:475604701440:web:9fcc7805781767c2"
  }

firebase.initializeApp(firebaseConfig)

var database = firebase.database()

$("#add-train-btn").on("click", function(event) {
    event.preventDefault()

    var newTrain = $("#train-name-input").val().trim()
    var newDestination = $("#destination-input").val().trim()
    var newTime = $("#start-time-input").val().trim()
    var newFrequency = $("#rate-input").val().trim()

    database.ref().push({
        trainName: newTrain,
        trainDestination: newDestination,
        trainTime: newTime,
        trainFrequency: newFrequency,
    })

    $("#train-name-input").val("")
    $("#destination-input").val("")
    $("#start-time-input").val("")
    $("#rate-input").val("")

    return false
})


// Having major issues with moment errors
database.ref().on("child_added", function(snapshot){
    newRow = $("<tr>");
    newRow.append("<td>" + snapshot.val().trainName + "</th>")
    newRow.append("<td>" + snapshot.val().trainDestination + "</th>")
    newRow.append("<td>" + snapshot.val().trainFrequency + "</th>")

    var start = snapshot.val().trainTime
    var frequency = snapshot.val().trainFrequency
    var now = moment().format("HH:mm")
    var next = ""

    var timeDifference = moment().diff(moment(start, "HH:mm"), "minutes")

    if (timeDifference > 0) {
        next = moment(start, "HH:mm").format("hh:mm a")
        minutesUntil = moment(start, "HH:mm").diff(moment(), "minutes")
    }

    else {
        minutesSince = timeDifference % frequency
        minutesUntil = frequency - minutesSince
        next = moment().add(minutesUntil, "m").format("h:mm a")
    }

    if (minutesUntil >= 60) {
        a = minutesUntil
        var hours = Math.trunc(a/60)
        var minutes = a % 60
        minutesUntil = hours + " hr " + minutes + " min"
    }

    else {
        minutesUntil = minutesUntil + " min"
    }

    newRow.append("<td>" + next + "</td>")
    newRow.append("<td>" + minutesUntil + "</td>")

    $("#trainTable").append(newRow)

})

})
