/*import React,{Component} from 'react';
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
    const email=this.refs.email.value;  //retrieving value of email
    const password=this.refs.password.value; //retrieving vale of password using refs
    console.log(email,password);

    const auth=firebase.auth()
    const promise=auth.createUserWithEmailAndPassword(email,password);
    promise
    .then(user=>{
      var err="Welcome"+user.email
      firebase.database().ref('User/'+user.uid).set({
        email:user.email
    });
    console.log(user);
    this.setState({err:err});

  });
  promise.catch(e=>{
    var err=e.message;
    console.log(err);
    this.setState({err:err});
  });

  }

  login(){
    const email=this.refs.email.value;
    const password=this.refs.password.value;
    console.log(email,password);

    const auth=firebase.auth()
    const promise=auth.signInWithEmailAndPassword(email,password);
    promise.then(user=>{
      var err="Welcome "+user.email;
      var lout=document.getElementById('logout');
      lout.classList.remove('hide');
      var lin=document.getElementById('login');
      lin.classList.add('hide');
      this.setState({err:err});
    });
    promise.catch(e=>{
      var err=e.message;
      console.log(err);
      this.setState({err:err});
    });
  }

  logout(){
    var err="Thankyou";
    firebase.auth().signOut();
    var lout=document.getElementById('logout');
    lout.classList.add('hide');
    var lin=document.getElementById('login');
    lin.classList.remove('hide');
    this.setState({err:err});

  }
  google(){
    console.log('I am from google');
    var provider = new firebase.auth.GoogleAuthProvider();
    var promise=firebase.auth().signInWithPopup(provider);

    promise.then(result=>{
      var user=result.user;
      console.log(result);

      firebase.database().ref('users/'+user.uid).set({
        email:user.email,
        name:user.displayName
      });

    });
    promise.catch(e=>{
      var msg=e.message;
      console.log(msg);

    });
  }

  constructor(props){
    super(props);

    this.state = {err:''};
    this.login=this.login.bind(this);
    this.signup=this.signup.bind(this);
    this.logout=this.logout.bind(this);
      this.google=this.google.bind(this);
  }
  render(){
    return(
      <div>
      <input id="email" ref="email" type="email" placeholder="Enter your email"/> <br/>
      <input id="password" ref="password" type="password" placeholder="Password" /><br/>
      <p>{this.state.err}</p>
      <button id="login"onClick={this.login}>Log In</button>
      <button onClick={this.signup}>Sign Up</button>
      <button id="logout" onClick={this.logout} className="hide">Log Out</button><br/>
      <button id="google" onClick={this.google} className="google">Signup with Google</button>
      </div>
    );
  }
}

export default Authen;*/
