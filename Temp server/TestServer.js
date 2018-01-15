var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var port  = 3000;//<----- Contro the port no from here


var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/',(req,res) =>{
res.send('Basic Server for the suggested Wire Frame  -- Ankit Yadav');
});

app.get('/Auth/:id?/:pass?',(req,res) => {
	if(req.params.id  == '123'&&req.params.pass == '123')
	{
		res.send("Logged in");
     }
       
    else
    {
	res.send("Invalid Credintials");
    }
});

app.get('/register/:Name?/:UserName?/:Email?', (req,res) => {
	res.send("Your Account has been created sucessfully !\n Your Details entered were \n" + req.params.Name + "\n" + req.params.UserName + "\n" + req.params.Email);
});

app.get('/auth/Send_Notification/:To/:Notification_Message', (req,res) => {
	res.send("Your notification \n " + req.params.Notification_Message + " \nis send to " + req.params.To);
});



app.listen(port);
console.log('Test Server Started ! on port ' + port);