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

  class Registration extends Component {

    signup(){
        var data={
        fname:this.refs.fname.value,
        lname:this.refs.lname.value,
        uname:this.refs.uname.value,
        password:this.refs.password.value, //retrieving vale of password using refs
        email:this.refs.email.value,  //retrieving value of email
        phone:this.refs.phone.value,
      };
      const fname=this.refs.fname.value;
      const lname=this.refs.lname.value;
      const uname=this.refs.uname.value;
      const password=this.refs.password.value; //retrieving vale of password using refs
      const email=this.refs.email.value;  //retrieving value of email
      const phone=this.refs.phone.value;
      console.log(data);
    return fetch('https://api.dankness95.hasura-app.io/register/'+fname+'/'+lname+'/'+uname+'/'+password+'/'+email+'/'+phone, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data})
    }).then((response) => response.json())
      .then((responseJson) => {
        return responseJson.success;
      })
      .catch((error) => {
        console.error(error);
      });
  }






    constructor(props){
      super(props);

      this.state = {err:''};

      this.signup=this.signup.bind(this);


    }
    render(){
      return(
        <div className="content">

        <h1 className="head"><em>Sign Up</em></h1>
        <input id="fname" ref="fname" name="fname" type="text" placeholder="First Name"/> <br/>
        <input id="lname" ref="lname" name="lname" type="text" placeholder="Last Name"/> <br/>
        <input id="uname" ref="uname" name="uname" type="text" placeholder="User Name"/> <br/>
        <input id="password" ref="password" name="password" type="password" placeholder="Password" /><br/>
        <input id="email" ref="email" type="email" name="email" placeholder="Email"/> <br/>
        <input id="phone" ref="phone" type="text" name="phone" placeholder="Phone no" /><br/>
        <p>{this.state.err}</p>
        <input type="button" className="button" onClick={this.signup} value="Sign Up" />
        

      </div>
      );
    }
  }

  export default Registration
