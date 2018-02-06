## HPDF-Group-Task-1-Team-10-
(React Native)
<b>Note: The react native code is in ReactNative branch of same github repository.</b>

Introduction to Notify!

The main motive of this app is to notify(simply push message) someone(registered with app) by using beautiful features and design.
The app functions like:
Login Screen:
The login screen mainly contains Username and Password based design which will login the (pre-registered)user.
It also has Register button which will go to the registration page and let the user register to the app.

![login](https://user-images.githubusercontent.com/34096221/35780681-2db60f96-0a05-11e8-8846-800e0ee1d472.png)


Register Screen:
The register screen contains the fields to be registered i.e. Firstname, Lastname, username, password, etc.
It has two buttons, either to Register(will register the user) or to Cancel(back to Login Screen).

![register](https://user-images.githubusercontent.com/34096221/35780690-5eff970c-0a05-11e8-8014-b548986f68d8.png)


Main App Screen:
It has the fields to enter the username and the message body to be push notified. It then does the verification of ID of the sender
and the receiver and then push notifies the receiver.
It also has a logout button which logs out the user from the app and gets back to Login Screen.

![mainapp](https://user-images.githubusercontent.com/34096221/35780712-95cb3a20-0a05-11e8-9385-d5f280cb31ad.png)

-----------------------------------------------------Backend Api --------------------------------------------
About The APP
This is a Custom push notification app which allows you to login into your account and then send custom notification to other users who are 
the members of the system.

The app at present provides basic push notification but in later versions you will be able to send media content also in your notification 

Later on we will extend the platform to cloud messaging as well 

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
