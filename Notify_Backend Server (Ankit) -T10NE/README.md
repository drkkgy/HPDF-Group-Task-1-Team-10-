# HPDF-Group-Task-1-Team-10-
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

Refferecen Hasura Docs v0.15 (Link:-https://docs.hasura.io/0.15/manual/getting-started/index.html)
-------------------------------------(No More in use)------------------------------
Authetication (use by Web app only) -------------------------------------(No More in use)------------------------------
----------------------------------------------------
https://auth.astigmatic44.hasura-app.io/ui/?=XXXXXXXX -> Use this link to redirect the web-app to the login screen
--------------------------------------------------------------------------------------------
For signup (Use by both mobile and web
-----------------------------------Url to Perform Registration for new users----------------------------------------------------
https://api.astigmatic44.hasura-app.io/register

body= {
    "F_Name": "your content here"
    "L_Name": "your content here"
    "User_Name": "your content here"
    "Pass": "your content here"
    "Email_id": "your content here"
    "Phone_No": "your content here"
  }

Use the api call to extract values from the fields from front end and send to the api for processing 

You will receive a call back in the form of a string (for success or failure)

Success :-{"message":"Your Account has been created successfully !"}

Failure :-{"message":"S.F ->User Name Already Exist or pass length less than 8 character try logging in with proper credentials"}
--------------------------------------Mobile Login function-----------------------------------------------
for authentication to Mobile app

https://api.astigmatic44.hasura-app.io/mobile_login

body= {
    "username": "your content here"
    "password": "your content here"
}

*Password should be minimum 8 character long

*here on sucessfull login you get response in the form of string )if you want Json let me know)

{
    "responseCode": 200,
    
     "auth_token": "b0a6e04decec49bf11b25f6f262504cec96cf3f6bbd43cbb"

}

on unsuccessful login

{
    
   "responseCode": 400,
    
   
   "message": "\"Username cannot be empty\""
} 

for errors 

{"error":"error"}

* the auth_token field is blank in the second one and the message field is blank in first one in the response
---------------------------------------------Url for Custom Push Notification--------------------------------------------------------
For Custom push notification

https://api.astigmatic44.hasura-app.io/auth/Send_Notification

body= {
    "User_Name_Reciever": "your content here",
    "User_Name_Sender": "Your content here",
    "Title": "your content here",
    "Notification_Message": "your content here"
}
Responses are

on success

{"message":"Successfully sent with response"+ (Response here)}

on failure
Something has gone wrong!

----------------------------------------------Url for Uploading user pic------------------------------------------------
For Uploading user pics

https://api.astigmatic44.hasura-app.io/Upload/

Pass the following header 

header
{
 "Auth": "Token here"
 "User_Name": "Username here"
}

body
{
 "file": "Exact File Here"
}

On sucess you get following String Responses
{
    
"Upload_Status":500,
    
"File_Id": "d975fbd6-ba7c-41ab-b78c-541dbe985331"

}

On Unsuccessful upload you will get following String Responses
{
    
"Upload_Status":504,
    
"File_Id": ""

}
-------------------------------------------Url to display user info on front end----------------------------------------------------
User Info display on front end
https://api.astigmatic44.hasura-app.io/return_user_info

body= {
    "User_Name": "your content here"

Enter the username to receive the user data 

response comes in json format
---------------------------------------------Url to Logout--------------------------------------------------------
For Logout 
https://api.astigmatic44.hasura-app.io/auth/Logout

Here Pass the User name in json format
{
 "User_Name": "user name here"
}

On sucess full logout you will get following response
{
    
   "message": "logged out"

}

On unsucess full logout you get 
{
    
   "message": "invalid authorization token"

}
-----------------------------------------To display Logged in user-----------------------------------------------------------
for displaying logged in user

https://api.astigmatic44.hasura-app.io/Users/Active_Users

you just pass a empty post request system based on the loged in user display the list 

[
    
   {
        
        "User_Name": "asd1234"
    
   }
]
-----------------------------------------To Update the file id in database---------------------------------------

https://api.astigmatic44.hasura-app.io/File_ID

Here Pass the User name in json format
{
 "User_Name": "user name here",
 "File_id": "File id recieved from hasura "
}

for uploading the binary file in hasura file store of our cluster use this link directly 

https://filestore.beginnings83.hasura-app.io/v1/file  

Response format will be 

{
    
"file_id": "5c08c475-c806-4972-a389-f0d55ed43a72",
    
"user_id": 1,
    
"user_role": "admin",
    
"content_type": null,
    
"file_status": "uploaded",
    
"created_at": "2018-02-26T13:36:33.202978Z",
    
"file_size": 691

}
-------------------------------Use this to receive the details of message----------------------------------------------
https://api.astigmatic44.hasura-app.io/notification/display

Here Pass the User name and get all the notification sent by the user
{
 "User_Name": "user name here",
}

-------------------------link to update user info----------------------------
https://api.astigmatic44.hasura-app.io/user_details_update

-----------------------------------------------------------------------------------------------------
Created by Ankit Yadav at Hasura !! using Hasura !!

body= {
    "F_Name": "your content here"
    "L_Name": "your content here"
    "User_Name": "your content here"
    "Pass": "your content here"
    "Email_id": "your content here"
    "Phone_No": "your content here"
  }


---------------------------------------------------------------------------------------------
