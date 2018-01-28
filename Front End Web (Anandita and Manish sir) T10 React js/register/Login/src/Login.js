import React,{Component} from 'react';
var firebase=require('firebase');
var config = {
    apiKey: "AIzaSyBvieaLYKpAIQ-RUulhwlpCdPUfgroWR8A",
    authDomain: "survey-8d8a3.firebaseapp.com",
    databaseURL: "https://survey-8d8a3.firebaseio.com",
    projectId: "survey-8d8a3",
    storageBucket: "survey-8d8a3.appspot.com",
    messagingSenderId: "137526420490"
  };
  firebase.initializeApp(config);

class Authen extends Component {

  signup(){
        window.location.href = '/Register'
  }

  login(){
    const uname=this.refs.uname.value;
    const password=this.refs.password.value;
    var x="Invalid credentials";
    fetch('https://api.dankness95.hasura-app.io/mobile_login/'+uname+'/'+password).then((response) => response.text())
      .then((responseText) => {
        console.log(responseText);
         x= responseText;
      })
      .catch((error) => {
        console.error(error);
      });
      if(x!=="Invalid credentials"){
        //redirect
        window.location.href = '/Home';
      }else{
        alert("Invalid credentials")
      }

  }


  constructor(props){
    super(props);

    this.state = {err:''};
    this.login=this.login.bind(this);
    this.signup=this.signup.bind(this);

  }
  render(){
    return(
      <div className="content">
        <h1 className="head"><em>LOGIN</em></h1>
      <input id="uname" ref="uname" type="text" placeholder="Enter your username"/> <br/>
      <input id="password" ref="password" type="password" placeholder="Password" /><br/>
      <p>{this.state.err}</p>
      <br/>
        <br/>
      <button id="login"onClick={this.login}>Log In</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <button onClick={this.signup}>Sign Up</button>
        </div>
    );
  }
}

export default Authen;
