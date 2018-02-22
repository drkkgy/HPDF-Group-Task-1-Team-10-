import React from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

//Todo : include file id/link in request sent to server to display each users profile image

let names= []; let idv ='';
let authToken = window.localStorage.getItem('HASURA_AUTH_TOKEN');
export default class Sidebar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false,
      opend: false,
      Data : ['All Offline'],
                };
  }


  setUsers() {

    const url = "https://data.dankness95.hasura-app.io/v1/query";
    let requestOptions = {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + authToken,
        }
    };
    const body = {
        "type": "select",
        "args": {
            "table": "FCM_tokens",
            "columns": [
                "username",]
              }};
    requestOptions.body = JSON.stringify(body);

   fetch(url, requestOptions)
   .then((response) => {
     return response.json();
   })
   .then((adata) => {
    this.setState({Data : adata.map((data)=>{return data.username })});
    }).catch((error) => {
      console.log("FAILED",error);
                  })
         }

  componentWillMount(){
  this.setUsers();
  }


  handleToggle = () => this.setState({open: !this.state.open});
  handleClose = () => this.setState({open: false,opend: false});
  change = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit=(e) =>{
    e.preventDefault();
    this.props.sendnotif(idv,this.state.message);
    this.setState({
      message:"",
      open:false,
    });
}

   listItems(values) {
     return names.map((name) => {

      return (<ListItem
         key={name}
         onClick={()=>{idv = name; this.passUser();} }
         primaryText={name}
         leftAvatar={<Avatar src="images/defaultUser.png" />}
         rightIcon={<CommunicationChatBubble />}
       />);

     });
   }


passUser = () => {
this.handleClose();
this.props.selectUser(idv);
this.setState({opend: true});
}

  render() {
    const actions = [
      <RaisedButton
        label="Push"
        secondary={true}
        onClick={(e)=>this.onSubmit(e)}
      />,
      <FlatButton label=" "/>,
      <RaisedButton
        label="Close"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
    ];

    names = this.state.Data.map((arr) => {return arr});
    return (
      <div>

        <RaisedButton
          label="View Online"
          onClick={this.handleToggle}
          backgroundColor="LimeGreen"
        />
        <Drawer width={250}
        openSecondary={true}
        open={this.state.open}
        docked={false}
        onRequestChange={(open) => this.setState({open})}>
          <AppBar title="Online Users" />

          <List>
             {this.listItems(names)}
            </List>

         <MenuItem onClick={this.handleClose}>Close</MenuItem>

        </Drawer>

        <Dialog
          title="Compose notification for :"
          actions={actions}
          modal={false}
          open={this.state.opend}
          onRequestClose={this.handleClose}
        >
      <h2>{idv}</h2>
      <TextField  name="message"  fullWidth={true}
                  floatingLabelText="Enter Notifcation message below"
                  multiLine={true}  rows={2}  rowsMax={4}
                  value={this.state.message}
                  onChange={e =>this.change(e)}
            />

        </Dialog>
      </div>
    );
  }
}
