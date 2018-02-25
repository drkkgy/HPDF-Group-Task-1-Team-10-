importScripts("https://www.gstatic.com/firebasejs/4.9.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/4.9.0/firebase-messaging.js");

//importScripts("https://www.gstatic.com/firebasejs/4.9.0/firebase-auth.js");
//importScripts("https://www.gstatic.com/firebasejs/4.9.0/firebase-database.js");
//importScripts("https://www.gstatic.com/firebasejs/4.9.0/firebase-firestore.js");
//importScripts("https://www.gstatic.com/firebasejs/4.9.0/firebase-storage.js");


// Initialize Firebase
var config = {
  apiKey: "AIzaSyDcFCf97JEsGNmkrcRwWpH6QEh_2Vx7YpA",
  authDomain: "hasura-custom-notification.firebaseapp.com",
  databaseURL: "https://hasura-custom-notification.firebaseio.com/",
  projectId: "hasura-custom-notification",
  storageBucket: "hasura-custom-notification.appspot.com",
  messagingSenderId: "598821450820"
};
  firebase.initializeApp(config);

var swmsg = firebase.messaging();
  // [START background_handler]
  swmsg.setBackgroundMessageHandler(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
      body: 'Background Message body.',
      icon: '/images/notify.png'
    };

    return self.registration.showNotification(notificationTitle,
        notificationOptions);
  });
  // [END background_handler]
