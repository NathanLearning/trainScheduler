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