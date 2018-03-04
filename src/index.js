import React from 'react';
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import Notifier from './components/Notifier'
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';

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

render((
  <BrowserRouter>
    <Notifier />
  </BrowserRouter>
), document.getElementById('root'));


registerServiceWorker();
