var express = require('express');
var session = require('express-session');
var http = require('http');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var port  = 3000;//<----- Control the port no from here
var server = require('http').Server(app);// needed to deploy on server
var fetchAction =  require('node-fetch');
var randomInt = require('random-int');
var fs = require('fs');

// setting up local storage

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

// Express server
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Postgress SQL acess linkd

var url_data = "https://data.dankness95.hasura-app.io/v1/query";

var requestOptions = {
	"method": "POST",
    "headers": {
        "Content-Type": "application/json"
    }
};

var H_id = {
    "auth_token": "bb6ad8c1638ea501db12fca4acbd76e3665e5c45ec315914",
    "username": "default",
    "hasura_id": 33,
    "hasura_roles": [
        "user"
    ]
}; // for storing Hasura Id
// Fire Base Setup

// --------------------------------------------------------------------------------------------
var admin = require('firebase-admin');
var serviceAccount = require('./hasura-custom-notification-firebase-adminsdk-f4kqo-b6d8c6ce91.json');
var FCM = require('fcm-push');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://hasura-custom-notification.firebaseio.com"
});

var serverKey = 'AAAAi2yKNEQ:APA91bHATD7JYj1Ja9XBGZY3V9y3Hgkk0azgm98y9ujRYcuu4kVyS1NQSSznpb_ZLQTXLUokWP0DkMrmfCMl1YHRU1isSiV5o8JHZXL9sCkeZmZ53j7GBOlFvR1BtJ4oF3qM5ZwqIOGq';
var fcm = new FCM(serverKey);


// ----------------------------------------------------------------

// Hasura Signup Page

var url_Signup = "https://auth.dankness95.hasura-app.io/v1/signup";


// backend api HomePage
app.get('/',(req,res) =>{
  console.log("Request made to server welcome page!!\n");
//res.send('Welcome to the Backend API Built Using Hasura !! Compiled by Ankit');
res.writeHead(200, {'Content-Type': 'application/json'});

var welcome_obj = {
  message: 'Welcome to the Backend API Built Using Hasura !! Compiled by Ankit',
  status: 200
};

res.end(JSON.stringify(welcome_obj));
});

// --------------------------------------------------------------------------------------
// register module 

app.post('/register', (req,res) => {

console.log("Got a Response on the signup page!!\n" );

// Signing up using hasura hasura

var signup_body = {
	"provider": "username",
    "data": {
        "username": req.body.User_Name,
        "password": req.body.Pass
    }
};

requestOptions.body = JSON.stringify(signup_body);

fetchAction(url_Signup, requestOptions)
.then(function(response) {
 	return response.json();
})
.then(function(result) {
  // Storing the Hasura ID in local storage
  var hasuraId = result.hasura_id;
  localStorage.setItem('HASURA_ID', hasuraId);

  //---------Data being sent to the database-------------

var reg_body = {
       "type": "insert", 
       "args": {
       "table":"User_Details",
       "objects":[
         {
         "Hasura_Id": localStorage.getItem('HASURA_ID'),
         "F_Name": req.body.F_Name,
         "L_Name": req.body.L_Name,
         "User_Name": req.body.User_Name,
         "Pass": req.body.Pass,
         "Email_Id": req.body.Email_Id,
         "Phone_No": req.body.Phone_No,
         "Device_Id": req.body.Device_Id
     }
       ]
       
       }
};
requestOptions.body = JSON.stringify(reg_body);

fetchAction(url_data, requestOptions)
.then(function(response) {
  return response.json();
  
})
.then(function(result) {

  console.log(JSON.stringify(result));
  res.send("Your Account has been created sucessfully ! ");

})
.catch(function(error) {

  res.send("D.B->Error Creating account try after some time");
}); 
//-----------------------------------------------------
  
  
})
.catch(function(error) {
	console.log(error);
	res.send("S.F ->User Name Alredy Exist try logginig in with the different user Id");
});
// --------------Signup details being sent to data base----------	                                      



});
// ----------------------------------------------------------------------------------------------
// Mobile customized authentication
var url_custom_login = "https://auth.dankness95.hasura-app.io/v1/login";


app.post('/mobile_login', (req,res)=> {


var body_Custom_Login = {
    "provider": "username",
    "data": {
        "username": req.body.username,
        "password": req.body.password
    }
};

requestOptions.body = JSON.stringify(body_Custom_Login);

fetchAction(url_custom_login, requestOptions)
.then(function(response) {
	return response.json();
})
.then(function(result) {
	console.log(result);
  if(result.code != 'invalid-creds')
  {
	res.json({"responseCode":200 ,"auth_token":result.auth_token})
	}
	else
	{
		res.send(JSON.stringify(result.message));
	}

	// To save the auth token received to offline storage
	 var authToken = result.auth_token;
	 localStorage.setItem('HASURA_AUTH_TOKEN', authToken);
   console.log(result.hasura_id);
   console.log(localStorage.getItem('HASURA_ID'));
   //-------Saving Auth Token in the database-------------------------------
   var reg_body_authtoken = {
       "type": "update", 
       "args": {
       "table":"User_Details",
       "where": {
          "User_Name": {
               "$eq": req.body.username
          }
       },
       "$set": {
           "Session_Id": localStorage.getItem('HASURA_AUTH_TOKEN')
       }
  }
};
requestOptions.body = JSON.stringify(reg_body_authtoken);

fetchAction(url_data, requestOptions)
.then(function(response) {
  return response.json();
  
})
.then(function(result) {

  console.log(JSON.stringify(result));
  res.send("auth token saved sucessfully sucessfully ! ");

})
.catch(function(error) {

  res.send("D.B->Error storing auth token");
}); 
   //---------------------------------------------------------------------
   
	 //res.send('logged in');
})
.catch(function(error) {
	console.log('Request Failed:' + error);
	res.send('error');
});
});
//---------------------------------------------------------
// Sending user info to the frontend for display
app.post('/return_user_info' , (req,res) => {

  var body_user_details_response = {
    "type": "select",
    "args": {
        "table": "User_Details",
        "columns": [
            "F_Name",
            "L_Name",
            "User_Name",
            "Email_Id",
            "Phone_No"
        ],
        "where": {
            "User_Name": {
                "$eq": req.body.User_Name
            }
        }
    }
};

requestOptions.body = JSON.stringify(body_user_details_response);

fetchAction(url_data, requestOptions)
.then(function(response) {
  return response.json();
})
.then(function(result) {
  res.json(result);
  console.log(result);
})
.catch(function(error) {
  console.log('Request Failed:' + error);
  res.send("User does not exist")
});


});
//-----------------------------------------------------------

// -------------------------------------------------------------------------------------------------------
// Notification Sending Module using Fire Base
app.post('/auth/Send_Notification', (req,res) => {
//------------------------------Fetching user token-----------------------------------
 var body_user_details_response_token = {
    "type": "select",
    "args": {
        "table": "User_Details",
        "columns": [
            
            "Session_Id"
        ],
        "where": {
            "User_Name": {
                "$eq": req.body.User_Name
            }
        }
    }
};

requestOptions.body = JSON.stringify(body_user_details_response_token);

fetchAction(url_data, requestOptions)
.then(function(response) {
  return response.json();
})
.then(function(result) {
  var token = result.Session_Id;
  console.log(result.Session_Id);
  localStorage.setItem('session_ID',token)
  console.log("Data fetched " + result);
})
.catch(function(error) {
  console.log('Request Failed:' + error);
  res.send("User does not exist")
});
//---------------------------------------------------------------

var message = {
    to: localStorage.getItem('session_ID'), // required fill with device token or topics
    //collapse_key: 'your_collapse_key', 
    data: {
        //your_custom_data_key: 'your_custom_data_value'
    },
    notification: {
        title: req.body.Title,
        body: req.body.Notification_Message
    }
};

fcm.send(message)
    .then(function(response){
        res.send("Successfully sent with response: " + response);
    })
    .catch(function(err){
        res.send("Something has gone wrong!");
        console.error(err);
    });

});

// ---------------------------------------------------------------------------
// Image upload url
var url_Upload = "https://filestore.dankness95.hasura-app.io/v1/file";
app.get('/Upload/:File_location?/', (req,res)=> {
//res.send('aaaaa');
var file = fs.readFile(res.params.File_location);
var requestOptions_upload = {
	method: 'POST',
	headers: {
	  "Content-Type": image/png,
      "Authorization": "Bearer" + "f215da1ee0d1c8074047afcacd785372e2665d448bffb2e6"
	},
	body: file
}

fetchAction(url_Upload, requestOptions_upload)
.then(function(response) {
	return response.json();
})
.then(function(result) {
	console.log(result);
	res.send("Image upladed sucess fully");
})
.catch(function(error) {
	console.log('Request Failed:' + error);
	res.send("Error uploading the file");
});

});
// Server Started
app.listen(port);
console.log('Test Server Started ! on port ' + port);