import React, { Component }  from 'react';
import Topnavbar from './Topnavbar';
import Ntable from './Ntable';
import Paper from 'material-ui/Paper';


const style = {
  height: 910,
  width:1000,
  margin: 3,
  textAlign: 'center',
  display: 'inline-block',
};

export default class Main extends Component {

  constructor(props){
    super(props);
    this.state = {
      table:{
      limit:  "999",
      height:'550px',
      },
    };
  }

setUserInfo = (user) =>{}

checkLoggedIn=()=> {
  let authToken = window.localStorage.getItem('HASURA_AUTH_TOKEN');
    if(authToken===null){
      window.location.href = '/';
      alert ("Not logged in !! Please login first");}}

  render(){
    this.checkLoggedIn();
  return(
    <div>
      <Paper style={style} zDepth={5} rounded={true} >
    <Topnavbar getUserInfo={this.setUserInfo}/>
    <Ntable data={this.state.table}/>
       </Paper>
    </div>
);
}
}
/*

componentDidMount() {
    fetch(url, requestOptions)
    .then((response) => {
      return response.json();
    })
    .then((result) => { this.props.getUserInfo(result.username); this.setState({usr_inf: result.username});
     this.sendSessionID(authToken,result.username); this.getUserPic(authToken,result.username);
     })
    .catch((error) => {
    console.log('User info retrieval:' + error);
     });
  }

  <RaisedButton label="get-Info" onClick={} primary={true} />
this.getDetails(this.state.user)

getInfo=()=>{
const urq = "https://api.astigmatic44.hasura-app.io/return_user_info";
let requestOptionsr = {
  "method": "POST",
  "Content-Type": "application/x-www-form-urlencoded"};
let body = {"User_Name": this.state.user };
requestOptions.body = JSON.stringify(body);
console.log("SERVER requestOptions:",requestOptionsr);
          fetch(urq, requestOptionsr)
          .then((response)=>{
            console.log(response);
            return response.json();
          })
          .then((result)=> {
            console.log(result);
            console.log("SERVER INFO RESPONSE:",result);
          })
          .catch(function(error) {
            console.log('Request Failed:' + error);
          });
}
//  <h4> {this.state.file_url} </h4>


  getUserInfo=()=>{
  const urq = "https://api.astigmatic44.hasura-app.io/notification/display";
  let requestOptionsr = {
    "method": "POST",
    "Content-Type": "application/x-www-form-urlencoded"};
  let body = {"User_Name": this.state.usr_inf };
  requestOptionsr.body = JSON.stringify(body);
            fetch(urq, requestOptionsr)
            .then((response)=>{
              return response.json();
            })
            .then((result)=> {
              console.log("SERVER INFO RESPONSE:",result);
            })
            .catch(function(error) {
              console.log('Request Failed:' + error);
            });
  }


*/
