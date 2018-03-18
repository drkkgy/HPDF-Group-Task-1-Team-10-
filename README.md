# This project consists of 3 parts :
#### A) Node Express based Backend hosted at hasura.io
#### B) React Native Notify Android App
#### C) ReactJS Notify WebApp

## A) Node Express Backend APIs for Notify App

Follow the Instructions & Readme inside [Notify_Backend Server (Ankit) -T10NE] folder of this repository. 

## B) React JS Notify Android App (React Native)

Install the app on an Android device using this [APK link](https://github.com/drkkgy/HPDF-Group-Task-1-Team-10-/blob/master/NOTIFY_ANDROID/Notify_HPDF.apk)

[Follow User guide]( https://youtu.be/4zouN0oF1fY)

Note: This repository has a zipped ReactNative code & APK in NOTIFY_ANDROID directory. The git repo is present at [Link](https://github.com/manishgrd/notify_RN)

## C)React JS Notify WebApp
Note: The git repo is present at [Link](https://github.com/manishgrd/notify_webapp)

Hosted WebApp Link   https://ui.astigmatic44.hasura-app.io

This part of project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

#### To get started locally perform the following steps on a windows 7/8/10 pc
1.  Install node.js from https://nodejs.org/en/download/
2.  Install Git from https://git-scm.com/download/win and start Git bash.
3.  Create a directory ($mkdir C:\projects ) & enter it ($cd C:\projects)
4.  Clone this repository with command ($git clone https://github.com/manishgrd/notify_webapp.git)
5.  After cloning completes, enter directory.($cd C:\projects\notify_webapp )
6.  On gitbash run the command $npm install
    This will install all the required dependencies for the project.
    It should complete without error and a few warnings ( you can ignore it).
7.	Run $npm start . This will launch the project in your default web-browser
    with address localhost:3000 or 127.0.0.1:3000
8.	There it is, the Notify app is running locally.
9. The backend is hosted at hasura.io along with Google firebase integration.
      
 #### User-guide for Notify Webapp--(Runs both locally & hosted at hasura.io)	
	  
10. Login & Signup with the appropriate credentials. On first login the user is asked for permission to show notifications & the status is displayed below. 
11. On login the user is taken to the homepage from where they can see the latest notifications appearing just below the navigation bar.
12. The Navigation bar at the topmost has Buttons to switch back from anypage to homepage and logout the user. Also the user is greeted along with a display of their profile pic.
13. Four buttons are present on the action bar for the following functions:
   (a)Compose New: Opens a dialog box to select the user and enter the notification message and press Push button to notify the user.
   (b)View Online: Opens up a drawer on the right listing the online users to notify them directly. 
      Clicking on any user open the compose box with that user preselected
   (c)All Notifications: opens a separate page listing all the notifications users sent / received in a tabular format that is      scrollable.
   (d)User Profile: To edit the already created user information & upload a profile image
14. Tabular view to glance some of the recent notifications which can be selected for following actions in Bottom navigation bar.
15. To View the full Notification details in a pop up dialog, the user has to click on any particular row in the table. 
16. The pop up also provides the Close & Delete Button performing the respective options on the opened Notification message	
17. A snackbar that momentarily pops below when a new notification arrives or successfully get delivered, to grab users attention.
18. When the Notify app has active tab & browser focus, notification appears in the Notification area inside the app above the actions bar.
19. When browser is closed or app is not in focus i.e. some other tab in the browser is active Notifications appear on right side of the screen.
20. Clicking the logout button logs out the user & redirects to login page for re-authentication.
21. This Notify app is compatible with the mobile browsers also, that support notifications.
	 
