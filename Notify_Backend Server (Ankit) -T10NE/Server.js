var express = require('express');
var session = require('express-session');
var http = require('http');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var port  = 8080;//<----- Control the port no from here
var server = require('http').Server(app);// needed to deploy on server
var fetchAction =  require('node-fetch');
var fs = require('fs');
var timestamp = require('time-stamp');
var request = require('request');
var cors = require('cors');

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

var url_data = "https://data.astigmatic44.hasura-app.io/v1/query";//<---

var requestOptions = {
  "method": "POST",
    "headers": {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json"
        //"Content-Type": "multipart/form-data"
    }
};

//----------------permiting Origin acess---------------------------------------------------------------------



//--------------------------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------------

var FCM = require('fcm-push');


var serverKey = 'AAAAi2yKNEQ:APA91bFqm6V4bpUImALPYVqeaBQzJDrHj-7dJMCG6cBNxyAW3COAyexU2CQScmkJ-6mGGCmZNAsYx__lSemafVV2tM6Ar1c8kul0ANWIbteHF8o8slp7XoKpRPv3kSjLMyU8mAsJwC2t';
var fcm = new FCM(serverKey);


// ----------------------------------------------------------------

// Hasura Signup Page

var url_Signup = "https://auth.astigmatic44.hasura-app.io/v1/signup";

app.use(express.static("./src"));

app.use(cors());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})


// backend api HomePage
app.get('/',(req,res) =>{
//----------------setting no cors headers-------------------------

//--------------------------------------------------------------------
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
// setting request------format---


  //----------------setting no cors headers-------------------------
//--------------------------------------------------------------------

console.log("Got a Response on the signup page!!\n");

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
  res.json({"message":"Your Account has been created sucessfully ! "});

})
.catch(function(error) {

  res.json({"message":"D.B->Error Creating account try after some time"});
}); 
//-----------------------------------------------------
  
  
})
.catch(function(error) {
  console.log(error);
  res.json({"message": "S.F ->User Name Alredy Exist or pass length less than 8 character try logginig in with proper credentials"});
});
// --------------Signup details being sent to data base----------                                       



});
// ----------------------------------------------------------------------------------------------
// Mobile customized authentication
var url_custom_login = "https://auth.astigmatic44.hasura-app.io/v1/login";


app.post('/mobile_login', (req,res)=> {

  //----------------setting no cors headers-------------------------

//--------------------------------------------------------------------


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
  res.json({"message":"auth token saved sucessfully sucessfully ! "});

})
.catch(function(error) {

  res.json({"message":"D.B->Error storing auth token"});
}); 
   //---------------------------------------------------------------------
   
   
})
.catch(function(error) {
  console.log('Request Failed:' + error);
  res.json({"message":"error"});
});
});
//---------------------------------------------------------
// Sending user info to the frontend for display
app.post('/return_user_info' , (req,res) => {

  
//--------------------------------------------------------------------

  var body_user_details_response = {
    "type": "select",
    "args": {
        "table": "User_Details",
        "columns": [
            "F_Name",
            "L_Name",
            "User_Name",
            "Email_Id",
            "Phone_No",
            "Pic_Id"
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
  res.json({"message":"User does not exist"})
});


});
//-----------------------------------------------------------

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Notification Sending Module using Fire Base
app.post('/auth/Send_Notification', (req,res) => {

  //----------------setting no cors headers-------------------------

//--------------------------------------------------------------------
//------------------------------Fetching user token-----------------------------------
 var body_user_details_response_token = {
    "type": "select",
    "args": {
        "table": "User_Details",
        "columns": [
            "Device_Id"
        ],
        "where": {
            "User_Name": {
                "$eq": req.body.User_Name_Reciever//<---------------------------------------------------------------------------------------- in notes
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
	localStorage.setItem('Time_Stamp', timestamp('YYYY/MM/DD:mm:ss'));// generating a time stamp
  var token = result[0].Device_Id;// Change to Device id when finalizing 
  console.log(token);
  localStorage.setItem('Device_Id',token)// Change this also
  console.log("Data fetched " + result);
})
.catch(function(error) {
  console.log('Request Failed:' + error);
  localStorage.setItem('Status', false);
  res.json({"message":"User does not exist"})
});
//---------------Storing Details to Databse----------------------

var reg_body_notification = {
       "type": "insert", 
       "args": {
       "table":"User_Notification_Store",
       "objects":[
         {
         "Title": req.body.Title,
         "Notification": req.body.Notification_Message,
         "User_Details": req.body.User_Name_Sender,
         "Status": localStorage.getItem('Status'),
         "Time_Stamp": localStorage.getItem('Time_Stamp'),
         "To": req.body.User_Name_Reciever,
         "From": req.body.User_Name_Sender
         
     }
       ]
       
       }
};
requestOptions.body = JSON.stringify(reg_body_notification);

fetchAction(url_data, requestOptions)
.then(function(response) {
  return response.json();
  
})
.then(function(result) {

  console.log(JSON.stringify(result));
  localStorage.setItem('Status', true);

  //------------------------------generatingremaining info-------------------------------------------------
  //--------------Sender F_name and L_Name Fetch------------------------------------------------------- 
  var body_Notification_Info_Fetch_to = {
    "type": "select",
    "args": {
        "table": "User_Details",
        "columns": [
            "F_Name",
            "L_Name"
        ],
        "where": {
            "User_Name": {
                "$eq": req.body.User_Name_Sender//------->in notes
            }
        }
    }
};

requestOptions.body = JSON.stringify(body_Notification_Info_Fetch_to);

fetchAction(url_data, requestOptions)
.then(function(response) {
  return response.json();
})
.then(function(result) {

  localStorage.setItem('From', result[0].F_Name + " " + result[0].L_Name);
  console.log("Data fetched " + result);
})
.catch(function(error) {
  console.log('Request Failed:' + error);
 });
//-----------------Reciever F_name and L_name Fetch---------------------------------------------------------
var body_Notification_Info_Fetch_from = {
    "type": "select",
    "args": {
        "table": "User_Details",
        "columns": [
            "F_Name",
            "L_Name"
        ],
        "where": {
            "User_Name": {
                "$eq": req.body.User_Name_Reciever//-------------------> in notes
            }
        }
    }
};

requestOptions.body = JSON.stringify(body_Notification_Info_Fetch_from);

fetchAction(url_data, requestOptions)
.then(function(response) {
  return response.json();
})
.then(function(result) {
  
  localStorage.setItem('T0',result[0].F_Name + " " + result[0].L_Name);//
  console.log(localStorage.getItem('TO'));//
  console.log("Data fetched " + result);
})
.catch(function(error) {
  console.log('Request Failed:' + error);
 });
  //--------------Sender F_name and L_Name Fetch------------------------------------------------------- 
  var body_Notification_Info_Fetch_to = {
    "type": "select",
    "args": {
        "table": "User_Details",
        "columns": [
            "F_Name",
            "L_Name"
        ],
        "where": {
            "User_Name": {
                "$eq": req.body.User_Name_Sender//------->in notes
            }
        }
    }
};

requestOptions.body = JSON.stringify(body_Notification_Info_Fetch_to);

fetchAction(url_data, requestOptions)
.then(function(response) {
  return response.json();
})
.then(function(result) {

  localStorage.setItem('From', result[0].F_Name + " " + result[0].L_Name);
  console.log("Data fetched " + result);
})
.catch(function(error) {
  console.log('Request Failed:' + error);
 });
//-----------------Reciever F_name and L_name Fetch---------------------------------------------------------
var body_Notification_Info_Fetch_from = {
    "type": "select",
    "args": {
        "table": "User_Details",
        "columns": [
            "F_Name",
            "L_Name"
        ],
        "where": {
            "User_Name": {
                "$eq": req.body.User_Name_Reciever//-------------------> in notes
            }
        }
    }
};

requestOptions.body = JSON.stringify(body_Notification_Info_Fetch_from);

fetchAction(url_data, requestOptions)
.then(function(response) {
  return response.json();
})
.then(function(result) {
  
  localStorage.setItem('T0',result[0].F_Name + " " + result[0].L_Name);//
  console.log(localStorage.getItem('TO'));//
  console.log("Data fetched " + result);
})
.catch(function(error) {
  console.log('Request Failed:' + error);
 });
 // ----------------------------------------------------------------------------------------------------------
  //---------------fetching sender and reciever details----------------------------------------------------
     localStorage.setItem('Time_Stamp', timestamp('YYYY/MM/DD:mm:ss'));
  //---------------------------------Storing remaing info---------------------------------------------------
  var body_remaing_Info_Update2 = {
    "type": "update",
    "args": {
        "table": "User_Notification_Store",
        "where": {
            "User_Details": {
                "$eq": req.body.User_Name_Sender
            }
        },
        "$set": {
            "To": localStorage.getItem('TO'),
            "From": localStorage.getItem('From'),
            "Time_Stamp": localStorage.getItem('Time_Stamp'),
            
        }
    }
};

requestOptions.body = JSON.stringify(body_remaing_Info_Update2);

fetchAction(url, requestOptions)
.then(function(response) {
	return response.json();
})
.then(function(result) {
	console.log(result);
})
.catch(function(error) {
	console.log('Request Failed:' + error);
});
  //--------------------------------------------------------------------------------------------------------

})
.catch(function(error) {
	localStorage.setItem('Status', true);

  //res.json({"message":"Something has gone wrong in Database connection"});
}); 

//-------------------------------------------------------Fetching file id from the server-------------------------------------------------------------------

var body_pic_id_fetch = {
    "type": "select",
    "args": {
        "table": "User_Details",
        "columns": [
            "Pic_Id"
           
        ],
        "where": {
            "User_Name": {
                "$eq": req.body.User_Name_Sender//------->in notes
            }
        }
    }
};

requestOptions.body = JSON.stringify(body_pic_id_fetch);

fetchAction(url_data, requestOptions)
.then(function(response) {
  return response.json();
})
.then(function(result) {

  localStorage.setItem('F_ID',result[0].Pic_Id);
  console.log("Data fetched " + result);
})
.catch(function(error) {
  console.log('Request Failed:' + error);
 });

//--------------------------------------------------------------------------------------------------------------------------

var message = {
    to: localStorage.getItem('Device_Id'), // <--- change this also ::: required fill with device token or topics
    //collapse_key: 'your_collapse_key', 
    data: {
        //your_custom_data_key: 'your_custom_data_value'
    },
    notification: {
        title: req.body.Title,
        body: req.body.Notification_Message,
        icon: "https://filestore.astigmatic44.hasura-app.io/v1/file/" + localStorage.getItem('F_ID'),
        click_action: "https://ui.astigmatic44.hasura-app.io/home"
    }
};

fcm.send(message)
    .then(function(response){

        res.json({"message": "Successfully sent with response: " + response});
    })
    .catch(function(err){
        res.json({"message":"Something has gone wrong!"});
        console.error(err);
    });

});

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Image upload url
var url_Upload = "https://filestore.astigmatic44.hasura-app.io/v1/file";
app.post('/Upload/', (req,res)=> {

  //----------------setting no cors headers-------------------------

//--------------------------------------------------------------------
  console.log(req.file)
var file = req.file;

var requestOptions_upload = {
  method: 'POST',
  headers: {
      "Content-Type": "image/png",
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
  res.json({"Upload_Status":504,"File_Id": ''});
});

// Storing the pic id in Database----------------------------------------------------
var reg_body_Pic_Id_Update = {
       "type": "update", 
       "args": {
       "table":"User_Details",
       "where": {
          "User_Name": {
               "$eq": req.headers.user_name
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
var url_Logout = "https://auth.astigmatic44.hasura-app.io/v1/user/logout";
app.post('/auth/Logout', (req,res) => {

  //----------------setting no cors headers-------------------------

//--------------------------------------------------------------------

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
  res.json({"message":"User does not exist"})
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
  //---------------Updating logged in status------------------------------
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

  res.json({"message":error});
}); 
  // --------------------------------------------------------------------
  res.json({"message":result});
})
.catch(function(error){
  res.json({"message":"Request Failed" + error});
});
});
// ----------------------Display logged in user----------------------------------
app.post('/Users/Active_Users', (req,res) => {

  //----------------setting no cors headers-------------------------

//--------------------------------------------------------------------

  var body_Acitve_Logged_in_user_Details = {
    "type": "select",
    "args": {
        "table": "User_Details",
        "columns": [
            "User_Name",
            "F_Name",
            "L_Name",
            "Pic_Id"
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
  res.json({"message":"User does not exist"})
});

});
// ------------------------------Url for updating device id-------------------------------

app.post('/Users/Device_ID/Update', (req,res) => {
  //----------------setting no cors headers-------------------------

//--------------------------------------------------------------------

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
    res.json({"message":"User Name Does not exist"});
  }
  res.json({"message":"Token Updated sucessfully ! "});

})
.catch(function(error) {

  res.json({"message":"Error updating Firebase Token status"});
}); 

});
//-----------------------------Pic_id_update----------------------------------------------- 
app.post('/File_ID', (req,res) => {

  //----------------setting no cors headers-------------------------

//--------------------------------------------------------------------

var pic_id = req.body.File_id;
  localStorage.setItem('Pic_Id' , pic_id);


var reg_body_Pic_Id_Update1 = {
       "type": "update", 
       "args": {
       "table":"User_Details",
       "where": {
          "User_Name": {
               "$eq": req.body.User_Name
          }
       },
       "$set": {
           "Pic_Id": localStorage.getItem('Pic_Id')
       }
  }
};


requestOptions.body = JSON.stringify(reg_body_Pic_Id_Update1);

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

});
// ------------------------Display message with-------------------------------------------*****NEW FEATURE******------------------
app.post('/notification/display', (req,res) => {

  //----------------setting no cors headers-------------------------

//--------------------------------------------------------------------

	var body_sending_Notification_Details = {
    "type": "select",
    "args": {
        "table": "User_Notification_Store",
        "columns": [
            "To",
            "From",
            "Time_Stamp",
            "Notification",
            "Title",
            "Status"
        ],
        "where": {
            "User_Details": {
                "$eq": req.body.User_Name
            }
        }
    }
};

requestOptions.body = JSON.stringify(body_sending_Notification_Details);

fetchAction(url_data, requestOptions)
.then(function(response) {
  return response.json();
})
.then(function(result) {
  res.json(result);
})
.catch(function(error) {
  console.log('Request Failed:' + error);
  res.json({"message":"User Has not send any notification so far "})
});

});

// -------------------------------------User Details Update link-----------------------------------------
app.post('/user_details_update', (req,res) => {
  //----------------setting no cors headers-------------------------

//--------------------------------------------------------------------

var body_User_Details_Update = {
    "type": "update",
    "args": {
        "table": "User_Details",
        "where": {
            "User_Name": {
                "$eq": req.body.User_Name
            }
        },
        "$set": {
            "Phone_No": req.body.Phone_No,
            "F_Name": req.body.F_Name,
            "L_Name": req.body.L_Name,
            "User_Name": req.body.User_Name,
            "Email_Id": req.body.Email_Id,
            "Pass": req.body.Pass
        }
    }
};

requestOptions.body = JSON.stringify(body_User_Details_Update);

fetchAction(url_data, requestOptions)
.then(function(response) {
  return response.json();
  
})
.then(function(result) {

  console.log(JSON.stringify(result));
  res.json({"message":"Your Details have been updated "});

})
.catch(function(error) {

  res.json({"message":"D.B->Error Creating account try after some time"});
});
}); 
// Server Started
app.listen(port);
console.log('Test Server Started ! on port ' + port);
