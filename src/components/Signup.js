
import React,{Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardTitle} from 'material-ui/Card';
import LinearProgress from 'material-ui/LinearProgress';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router-dom'

const style = {
  height: 780,
  width: 500,
  margin: 10,
  display: 'inline-block',
};


const url = "https://auth.astigmatic44.hasura-app.io/v1/signup";
let user='',passwd='',Fname='',Lname='',Email='',Phn='';
const requestOptions = {
    "method": "POST",
    "headers": {
        "Content-Type": "application/json"
    },

};

  export default class Signup extends Component {
    state = {
      fname:'',
      lname:'',
      uname:'',
      pwd:'',
      email:'',
      phone:''
    }

   change = (e) => {
     this.setState({
       [e.target.name]: e.target.value
     });
   };

   onSubmit=(e) =>{
     e.preventDefault();
     this.setState({
       fname:'',
       lname:'',
       uname:'',
       pwd:'',
       email:'',
       phone:''
     });
     this.signup();
   }

   sendUserInfo = (auth,hid,user,passwd,Fname,Lname,Email,Phn) => {

   var urlq = "https://data.astigmatic44.hasura-app.io/v1/query";
   var requestOptionsQ = {
      "method": "POST",
      "headers": {"Content-Type": "application/json",
                  "Authorization": "Bearer " + auth}};

        var body= {
      "type": "insert",
      "args": {
          "table": "User_Details",
          "objects": [{
            "Hasura_Id": hid,
            "User_Name": user,
            "Pass": passwd,
            "F_Name": Fname,
            "L_Name": Lname,
            "Email_Id": Email,
            "Phone_No": Phn,
          //  "Session_Id": auth,
            }]}};

        requestOptionsQ.body = JSON.stringify(body);

       console.log(urlq, requestOptionsQ)
        fetch(urlq, requestOptionsQ)
        .then((response)=> {
          console.log(response);
          return response.json();
        })
        .then((result)=> {
          alert("Success !! now login to continue");
          window.location.href ='/';
        })
        .catch((error)=> {
            alert('Request Failed:' + error);
            window.location.href ='/signup';
        });

      }


      signup = () => {
        var body = {
        "provider": "username",
        "data": {   "username": this.state.uname,
                    "password": this.state.pwd,  }   };
      user=this.state.uname;
      passwd=this.state.pwd;
      Fname=this.state.fname;
      Lname=this.state.lname;
      Email=this.state.email;
      Phn=this.state.phone;

      requestOptions.body = JSON.stringify(body);
      console.log(requestOptions);
      fetch(url, requestOptions)
      .then((response)=>{
      	return response.json();
      })
      .then((result)=> {
      	console.log(result);
      	let authToken = result.auth_token; let h_id=result.hasura_id;
      	window.localStorage.setItem('HASURA_AUTH_TOKEN', authToken);
        if(result.auth_token!=null)
       this.sendUserInfo(authToken,h_id,user,passwd,Fname,Lname,Email,Phn);
        else
        alert("Something went wrong ! Try again !");
      })
      .catch((error)=> {
      	alert('Request Failed:' + error);
      });
    }


      render() {
        return(
          <div>
          <Paper style={style} zDepth={3} >
          <img src="images/logo.png" alt="logo" height="190" width="500"/>
          <Card>
          <LinearProgress mode="indeterminate" />
          <CardTitle
             title="To Signup (Register) " subtitle="Enter your Info & click SIGNUP" />
          <form>
          <TextField
              name="fname"
              hintText="First Name"
              floatingLabelText="Your First Name"
              value={this.state.fname}
              onChange={e =>this.change(e)}
          /> <br/>
          <TextField name="lname"
                 hintText="Last Name"
                 floatingLabelText="Your Last Name"
                 value={this.state.lname}
                 onChange={e =>this.change(e)}
          /><br/>
          <TextField
              name="uname"
              hintText="Username"
              floatingLabelText="Create A Username"
              value={this.state.uname}
              onChange={e =>this.change(e)}
          /> <br/>
          <TextField name="pwd" type="password"
                 hintText="Password"
                 floatingLabelText="Min 8 Characters"
                 value={this.state.pwd}
                 onChange={e =>this.change(e)}
          /><br/>
          <TextField
              name="email"
              hintText="Email ID"
              floatingLabelText="Your Email ID"
              value={this.state.email}
              onChange={e =>this.change(e)}
          /> <br/>
          <TextField name="phone"
                 hintText="Phone no."
                 floatingLabelText="Your Phone no."
                 value={this.state.phone}
                 onChange={e =>this.change(e)}
          /><br/>
          <br/>
          <RaisedButton onClick={(e)=>{(this.state.uname && this.state.pwd)?this.onSubmit(e):alert('Username / Password missing')}} label="SIGNUP" secondary={true} />
          <FlatButton label=" " disabled={true}/>
          <Link to='/'><RaisedButton label="Login" primary={true} /></Link>
          </form>
          <br/>
            <LinearProgress mode="indeterminate" />
          </Card>
          </Paper>
          </div>
        );
      }

  }
