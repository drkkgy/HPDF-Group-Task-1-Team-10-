	 
	 
# HPDF-Group-Task-1-Team-10
About The APP
This is a Custom push notification app which allows you to login into your account and then send custom notification to other users who are 
the members of the system.

The app at present provides basic push notification but in later versions you will be able to send media content also in your notification 

Later on we will extend the platform to cloud messaging as well 


To get started perform the following steps on a windows 7/8/10 pc
1.  Install node.js from https://nodejs.org/en/download/
2.  Install Git from https://git-scm.com/download/win and start Git bash.
3.  Create a directory ($mkdir C:\projects ) & enter it ($cd C:\projects)
4.  Clone this repository with command ($git clone https://github.com/manishgrd/notify_webapp.git)
5.  After cloning completes, enter directory.($cd C:\projects\notify_frontend_webapp )
6.  On gitbash run the command $npm install
    This will install all the required dependencies for the project.
    It should complete without error and a few warnings ( you can ignore it).
7.	Run $npm start . This will launch the project in your default web-browser
    with address localhost:3000 or 127.0.0.1:3000
8.	There it is, the Notify app is running locally.
9. The backend is hosted at hasura.io along with Google firebase integration.

      About the main ui--(Runs both locally & hosted at hasura.io)
	  
10. Login & Signup with the appropriate credentials.

11. On login the user is taken to the homepage from where they can see the 
   latest notifications appearing just below the top navigation bar.

12. The Navigation bar at the topmost has Buttons to switch back from anypage to homepage and logout the user. 
    Also the user is greeted along with a display of their profile pic.

13. Three buttons are present on the action bar for the following functions:
   (a)Compose New: Opens a dialog box to select the user and enter the notification message and press Push button to notify the user.
   (b)View Online: Opens up a drawer on the right listing the online users to notify them directly.
   (c)All Notifications: opens a separate page listing all the notifications users sent / received in a tabular format that is scrollable.

14. Below them is a tabbed navigation that separately displays Received & Sent notifications, categorising them as they arrive.

15. Tabular view to see at a glance some of the recent notifications which can be selected for following actions in Bottom navigation bar.

16. View : See the Notification in a pop up dialog
   
12. The Navigation bar at the topmost has Buttons to switch back from anypage to homepage and logout the user. 
    Also the user is greeted along with a display of their profile pic.
    
13.Three buttons are present on the action bar for the following functions:
   (a)Compose New: Opens a dialog box to select the user and enter the notification message and press Push button to notify the user.
   (b)View Online: Opens up a drawer on the right listing the online users to notify them directly.
   (c)All Notifications: opens a separate page listing all the notifications users sent / received in a tabular format that is      scrollable.
   
  14. Below them is a tabbed navigation that separately displays Received & Sent notifications, categorising them as they arrive.
  
 15. Tabular view to see at a glance some of the recent notifications which can be selected for following actions in Bottom navigation bar.
 
 16. View : See the Notification in a pop up dialog
     Clear: Delete the selected notifications
     Notify others: Forward a pre-composed/ received notification to other users
	
17. A snackbar that momentarily pops below when a new notification arrives to grab users attention.

18. Clicking the logout button redirects to login page for authentication.

Backend Information
===========================================
for starting the local server just clone the git repository and in the backend folder execute the server.js file

using CLI $ node server.js 

then replace the cluster name below 

api.dankness95.hasura-app.io/ ----> 127.0.0.1/  [ But in off line mode you will not be able to use the https://auth.dankness95.hasura-app.io/ui/?=XXXXXXXX url

For simplicity to use the server the node server is already deployed in the cluster so that it can be accessed easily.

---------------------------------------------------Backend Api Url Signatures----------------------------------------------------------

These Url will work for this cluster only (You can tweak them for different cluster if the projects is migrated)
Refer Hasura Docs v0.15 (Link:-https://docs.hasura.io/0.15/manual/getting-started/index.html)
Authentication (use by Web app only)
----------------------------------------------------
https://auth.dankness95.hasura-app.io/ui/?=XXXXXXXX -> Use this link to redirect the web-app to the login screen
XXXXXXX = Url to your profile page which on success full login will redirect you to your home page 
--------------------------------------------------------------------------------------------
For signup (Use by both mobile and web
---------------------------------------------------------------------------------------
https://api.dankness95.hasura-app.io/register/A/B/C/D/E/F
A - First name
B - Second Name
C - User Name Name
D - Password (min 8 letter)  
E - Email
F - Phone no
Use the api call to extract values from the fields from front end and send to the api for processing 
You will recieve a call back in the form of a string (for success or failure)
-------------------------------------------------------------------------------------
for authentication to Mobile app
https://api.dankness95.hasura-app.io/mobile_login/A/B
A - User Name here
B - Password (min 8 char)
*here on successful login you get response in the form of string )if you want Json let me know)
Logged in"6dda38fe0d245d2c0ddb2e4599c1a9425ce43b2280c9d8a4" 7 => Logged in , Auth Token , Hasura Id
on unsuccessful login
"Invalid credentials" 
for errors 
error
-----------------------------------------------------------------------------------------------------
For Custom push notification (Feature still in development stage)
https://api.dankness95.hasura-app.io/auth/Send_Notification/A/B/C
A- Token of the device to which we will send the notification to
B- Title of the noti-ficaiton
C- Notification body
Responses are
on success
Successfully sent with response: (Response here)
on failure
Something has gone wrong!
--------------------------------------------------------------------------------------------------------
For File Upload (Featur in development stage)
https://api.dankness95.hasura-app.io/Upload/A/
A - File location on the local computer will be pushed here //Some doubt here will clarify


A- User Name

Enter the username to receive the user data 

response comes in json format
------------------------------------------------------------------------------------------------------------------
For Data retrieval in json format
https://api.dankness95.hasura-app.io/return_user_info/A/

A = user id
