
import React,{Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardTitle} from 'material-ui/Card';
import LinearProgress from 'material-ui/LinearProgress';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router-dom'

const style = {
  height: 500,
  width: 500,
  margin: 10,
  display: 'inline-block',
};


const url = "https://auth.dankness95.hasura-app.io/v1/signup";

const requestOptions = {
    "method": "POST",
    "headers": {
        "Content-Type": "application/json"
    }
};

  export default class Signup extends Component {
      state = {
        uname:'',
        pwd:'',
      }

   change = (e) => {
     this.setState({
       [e.target.name]: e.target.value
     });
   };

   onSubmit=(e) =>{
     e.preventDefault();
     this.setState({
       uname:'',
       pwd:'',
     });
     this.signup();
   }


  signup = () => {
    let body = {
    "provider": "username",
    "data": {   "username": this.state.uname,
                "password": this.state.pwd,  }   };

  requestOptions.body = JSON.stringify(body);
  console.log(requestOptions);
  fetch(url, requestOptions)
  .then(function(response) {
  	return response.json();
  })
  .then(function(result) {
  	console.log(result);
  	let authToken = result.auth_token
  	window.localStorage.setItem('HASURA_AUTH_TOKEN', authToken);
    if(result.auth_token!=null)
    {   window.location.href = '/';
      alert("AWESOME !! now login to continue");    }
    else
    alert("Something went wrong ! Try again !");
  })
  .catch(function(error) {
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
              name="uname"
              hintText="Username"
              floatingLabelText="Create A Username"
              value={this.state.uname}
              onChange={e =>this.change(e)}
          /> <br/>
          <TextField name="pwd" type="password"
                 hintText="Password"
                 floatingLabelText="A Password to Login"
                 value={this.state.pwd}
                 onChange={e =>this.change(e)}
          /><br/>

          <br/>
          <RaisedButton onClick={(e)=>this.onSubmit(e)} label="SIGNUP" secondary={true} />
          <FlatButton label=" " />
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
