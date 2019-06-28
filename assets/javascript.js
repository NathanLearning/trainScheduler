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

 
 // Assumptions
 var tFrequency = 3;

 // Time is 3:30 AM
 var firstTime = "03:30";

 // First Time (pushed back 1 year to make sure it comes before current time)
 var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
 console.log(firstTimeConverted);

 // Current Time
 var currentTime = moment();
 console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

 // Difference between the times
 var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
 console.log("DIFFERENCE IN TIME: " + diffTime);

 // Time apart (remainder)
 var tRemainder = diffTime % tFrequency;
 console.log(tRemainder);

 // Minute Until Train
 var tMinutesTillTrain = tFrequency - tRemainder;
 console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

 // Next Train
 var nextTrain = moment().add(tMinutesTillTrain, "minutes");
 console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
