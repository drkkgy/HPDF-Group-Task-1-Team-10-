
import React,{Component} from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import NotifDisplay from './NotifDisplay';
import Topnavbar from './Topnavbar';
import { Link } from 'react-router-dom'

const outstyle = {
  height: 910,
  width: 1000,
  margin: 2,
  display: 'inline-block',
};


const style = {
  height: 500,
  width: 990,
  margin: 5,
  display: "flex",
  flexDirection: "row",
  backgroundColor: "DodgerBlue"
};

const instyle = {
  height: 490,
  width: 490,
  margin: 5,};
 let url = "https://filestore.astigmatic44.hasura-app.io/v1/file";
let authToken = window.localStorage.getItem('HASURA_AUTH_TOKEN');
//let headers = { "Authorization" : "Bearer " + authToken }
let requestOptions = {};
const urq = "https://data.astigmatic44.hasura-app.io/v1/query";

const requestOptionsQ = {  "method": "POST",
    "headers": {"Content-Type": "application/json",
                "Authorization": "Bearer " + authToken}};

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      file_id:"",
      file_url: "",
      fname:'',
      lname:'',
      email:'',
      phone:'',
      user:'',
      saved:" Press to save changes"
    }
  }

componentWillMount(){
this.setFileUrl();
}

setFileUrl=()=>{
this.setState({file_url:url+'/'+this.state.file_id});
}

change = (e) => {
  this.setState({
    [e.target.name]: e.target.value
  });
};
  onSubmit=(e) =>{
 e.preventDefault();
 this.updateInfo();
    }

    updateInfo = () => {
   let body = {
          "type": "update",
          "args": {
              "table": "User_Details",
              "where": {
                  "User_Name": {
                      "$eq": this.state.user
                  }
              },
              "$set": {
                  "F_Name": this.state.fname,
                  "L_Name": this.state.lname,
                  "Email_Id": this.state.email,
                  "Phone_No": this.state.phone,
                  "Pic_Id": this.state.file_id
              }
          }
      };

      requestOptionsQ.body = JSON.stringify(body);
      fetch(urq, requestOptionsQ)
      .then((response)=>{
      	return response.json();
      })
      .then((result)=>{
        if(result.affected_rows===1)
      this.setState({saved:"  Changes saved !! "});
      })
      .catch((error)=>{
      	console.log('Request Failed:' + error);
      });
    }

 uploadimg = (e) => {
   e.preventDefault();
   this.upload();
 }
upload =()=>{
let img_file = this.fileInput.files[0];
 requestOptions = {
     method: "POST",
     headers: {
         "Content-Type": "image/png",
        "Authorization": "Bearer " + authToken,
     },
     body : img_file
 };
 fetch(url, requestOptions)
 .then((response)=>{
   return response.json();
 })
 .then((result)=> {
   this.setState({file_id:result.file_id});
   this.setFileUrl();
 })
 .catch(function(error) {
   console.log('Request Failed:' + error);
 });
 }

setUserInfo = (username) =>{
  this.setState({user : username});
 this.getDetails(username);}

getDetails=(username)=>{

let body = {
    "type": "select",
    "args": {
        "table": "User_Details",
        "columns": ["*"],
        "where": {"User_Name": {"$eq": username  }}}};
requestOptionsQ.body = JSON.stringify(body);
fetch(urq, requestOptionsQ)
.then(function(response) {
	return response.json();
})
.then((result)=> {
  this.setState({
    file_id:result[0].Pic_Id,
    fname:result[0].F_Name,
    lname:result[0].L_Name,
    email:result[0].Email_Id,
    phone:result[0].Phone_No,
  });
  this.setFileUrl();
})
.catch((error)=> {
	console.log('Request Failed:' + error);
});
}


checkLoggedIn=()=> {
    if(authToken===null){
      window.location.href = '/';
      alert ("Not logged in !! Please login first");}}

render(){
  this.checkLoggedIn();
    return (
      <div>
      <Paper style={outstyle} zDepth={5} rounded={true} >
      <Topnavbar getUserInfo={this.setUserInfo}/>
      <NotifDisplay />
      <Paper style={style} zDepth={3} >

		 <Paper style={instyle} zDepth={3} >
      <form >
        <br/>
        <h4> Edit Your Profile </h4>
        <br/><br/>
        <img src={this.state.file_url} alt="Profile Image" height="120" width="120"/>
        <h5> <u>Username</u>: {this.state.user}</h5>
		<br/>
        <label>

        <strong> <u>Select image file to upload</u> </strong>
          <br/><br/>
          <input
            type="file"
            ref={input => {
              this.fileInput = input;
            }}
          />
        </label>
        <br/><br/>
        <RaisedButton onClick={(e)=>this.uploadimg(e)} label="UPLOAD" secondary={true} />
    <p><strong><u>*Note</u>:</strong>Press save in right panel to save uploaded image </p>
      </form>


      </Paper>
	  <Paper style={instyle} zDepth={3} >
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
    <RaisedButton onClick={(e)=>this.onSubmit(e)} label="SAVE" secondary={true} />
    <FlatButton label=" " disabled={true}/><br/><br/>
    {this.state.saved}


    </form>
    <br/><br/>
    <Link to='/home'><RaisedButton label="Go Back to home" primary={true} /></Link>
	  </Paper>
      </Paper>
        </Paper>
      </div>
    );
  }
}
