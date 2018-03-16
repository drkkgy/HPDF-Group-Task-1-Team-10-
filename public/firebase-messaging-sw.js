importScripts("https://www.gstatic.com/firebasejs/4.9.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/4.9.1/firebase-messaging.js");


// Initialize Firebase
const config = {
  messagingSenderId: "598821450820"
};
  firebase.initializeApp(config);
  const messaging = firebase.messaging();
  // [START background_handler]
  messaging.setBackgroundMessageHandler(function(payload) {
    console.log('Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Notify App';
    const notificationOptions = {
      body: 'You have received a notification !',
      icon: '/images/notify.png'
    };

    return self.registration.showNotification(notificationTitle,
        notificationOptions);
  });
  // [END background_handler]
