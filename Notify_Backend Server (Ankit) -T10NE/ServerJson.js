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
//var admin = require('firebase-admin');
//var serviceAccount = require('./hasura-custom-notification-firebase-adminsdk-f4kqo-b6d8c6ce91.json');
var FCM = require('fcm-push');
//admin.initializeApp({
//  credential: admin.credential.cert(serviceAccount),
//  databaseURL: "https://hasura-custom-notification.firebaseio.com"
//});

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
  res.send("S.F ->User Name Alredy Exist or pass length less than 8 character try logginig in with proper credentials ");
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
  if(result.code != 'invalid-creds' && req.body.username !='')
  {
  res.json({"responseCode":200 ,"auth_token":result.auth_token,"message":JSON.stringify(result.message)});
  }
  else
  {
    res.json({"responseCode":400,"auth_token":result.auth_token,"message":JSON.stringify(result.message)});
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
  var token = result[0].Device_Id;// Change to Device id when finalizing 
  console.log(token);
  localStorage.setItem('Device_Id',token)// Change this also
  console.log("Data fetched " + result);
})
.catch(function(error) {
  console.log('Request Failed:' + error);
  res.send("User does not exist")
});
//---------------------------------------------------------------

var message = {
    to: localStorage.getItem('Device_Id'), // <--- change this also ::: required fill with device token or topics
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
var file = '';
app.post('/Upload/', (req,res)=> {

console.log(req.headers.auth);

var requestOptions_upload = {
  method: 'POST',
  headers: {
      
      "Authorization": "Bearer " + req.headers.auth
  },
  body: file
}

fetchAction(url_Upload, requestOptions_upload)
.then(function(response) {
  return response.json();
})
.then(function(result) {
  console.log(result);
  var pic_id = result.file_id;
  localStorage.setItem('Pic_Id' , pic_id);
  
})
.catch(function(error) {
  console.log('Request Failed:' + error);
  res.json({"Upload_Status":504,"File_Id": localStorage.getItem('Pic_Id')});
});

// Storing the pic id in Database----------------------------------------------------
var reg_body_Pic_Id_Update = {
       "type": "update", 
       "args": {
       "table":"User_Details",
       "where": {
          "Session_Id": {
               "$eq": req.headers.auth
          }
       },
       "$set": {
           "Pic_Id": localStorage.getItem('Pic_Id')
       }
  }
};


requestOptions.body = JSON.stringify(reg_body_Pic_Id_Update);

fetchAction(url_data, requestOptions)
.then(function(response) {
  return response.json();
  
})
.then(function(result) {

  console.log(result);
  res.json({"Upload_Status":500,"File_Id": localStorage.getItem('Pic_Id')});

})
.catch(function(error) {

  res.json({"Upload_Status":504,"File_Id": localStorage.getItem('Pic_Id')});
}); 
// --------------------------------------------------------------------------


});

// ---------------------------Logout----------------------------------------------
var url_Logout = "https://auth.dankness95.hasura-app.io/v1/user/logout";
app.post('/auth/Logout', (req,res) => {

  // -----------------Fetching the auth token from the server------------------
  var body_user_details_response_token2 = {
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

requestOptions.body = JSON.stringify(body_user_details_response_token2);

fetchAction(url_data, requestOptions)
.then(function(response) {
  return response.json();
})
.then(function(result) {
  var token1 = result[0].Session_Id;
  console.log(token1);
  localStorage.setItem('session_ID1',token1)
  console.log("Data fetched " + result);
})
.catch(function(error) {
  console.log('Request Failed:' + error);
  res.send("User does not exist")//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
});

var requestOptions_Logout = {
     "method": "POST",
     "headers": {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem('session_ID1')
     }
};

fetchAction(url_Logout,requestOptions_Logout)
.then(function(response){
  return response.json();
})
.then(function(result){
  //---------------Updating loged in status------------------------------
  var reg_body_Login_status = {
       "type": "update", 
       "args": {
       "table":"User_Details",
       "where": {
          "User_Name": {
               "$eq": req.body.User_Name
          }
       },
       "$set": {
           "Session_Id": "NULL"
       }
  }
};
requestOptions.body = JSON.stringify(reg_body_Login_status);

fetchAction(url_data, requestOptions)
.then(function(response) {
  return response.json();
  
})
.then(function(result) {

  console.log(JSON.stringify(result));

})
.catch(function(error) {

  res.send(error);
}); 
  // --------------------------------------------------------------------
  res.send(result);
})
.catch(function(error){
  res.send('Request Failed' + error);
});
});
// ----------------------Display logged in user----------------------------------
app.post('/Users/Active_Users', (req,res) => {

  var body_Acitve_Logged_in_user_Details = {
    "type": "select",
    "args": {
        "table": "User_Details",
        "columns": [
            "User_Name"
        ],
        "where": {
            "Session_Id": {
                "$ne": "NULL"
            }
        }
    }
};

requestOptions.body = JSON.stringify(body_Acitve_Logged_in_user_Details);

fetchAction(url_data, requestOptions)
.then(function(response) {
  return response.json();
})
.then(function(result) {
  res.json(result);
})
.catch(function(error) {
  console.log('Request Failed:' + error);
  res.send("User does not exist")
});

});
// ------------------------------Url for updating device id-------------------------------
app.post('/Users/Device_ID/Update', (req,res) => {

var reg_body_Fire_Base_Device_Token_Update = {
       "type": "update", 
       "args": {
       "table":"User_Details",
       "where": {
          "User_Name": {
               "$eq": req.body.User_Name
          }
       },
       "$set": {
           "Device_Id": req.body.Device_Id
       }
  }
};
requestOptions.body = JSON.stringify(reg_body_Fire_Base_Device_Token_Update);

fetchAction(url_data, requestOptions)
.then(function(response) {
  return response.json();
  
})
.then(function(result) {
  
  console.log(JSON.stringify(result));
  if(JSON.stringify(result) == '{"affected_rows":0}')
  {
    res.send("User Name Does not exist");
  }
  res.send("Token Updated sucessfully ! ");

})
.catch(function(error) {

  res.send("Error updating Firebase Token status");
}); 

});
//---------------------------------------------------------------------------- 
// Server Started
app.listen(port);
console.log('Test Server Started ! on port ' + port);