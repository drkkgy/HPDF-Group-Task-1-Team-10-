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

 let idv =""; let idv_usr =""; let img_url="";
export default class Sidebar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      usr_inf: "",
      open: false,
      opend: false,
      Data : ['All Offline'],
      message: "",
      title:"",
      Images : [],
                };
  }


  setUsers() {

    const url = "https://api.astigmatic44.hasura-app.io/Users/Active_Users";
    let requestOptions = {
      "method": "POST",
      "headers": {
          "Content-Type": "application/x-www-form-urlencoded"
      } };

    const body = {};
    requestOptions.body = JSON.stringify(body);

   fetch(url, requestOptions)
   .then((response) => {
     return response.json();
   })
   .then((adata) => {
    this.setState({Data : adata.map((data)=>{return data.User_Name+" ( "+data.F_Name+" "+data.L_Name+" )" })});
    this.setState({Images : adata.map((data)=>{return data.Pic_Id })});
    }).catch((error) => {
      console.log("FAILED",error);
    })}


  componentWillMount(){
  this.setUsers();

  }


  handleToggle = () =>{ this.setState({open: !this.state.open}); this.setUsers();}
  handleClose = () => this.setState({open: false,opend: false});
  change = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit=(e) =>{
    e.preventDefault();
    this.props.sendnotif(idv_usr,this.state.title,this.state.message);
    this.setState({
      message:"",
      title:"",
      open:false,
      opend:false,
    });
    this.handleClose();
}

   listItems(values) {
     return values.map((name,id) => {
       img_url="https://filestore.astigmatic44.hasura-app.io/v1/file/"+this.state.Images[id];
      return (<ListItem
         key={name}
         onClick={()=>{idv = name; this.passUser();} }
         primaryText={name}
         leftAvatar={<Avatar src={img_url} />}
         rightIcon={<CommunicationChatBubble />}
       />);

     });
   }


passUser = () => {
this.handleClose();
idv_usr=idv.substr(0,idv.indexOf(' ')); //extracting only username
this.props.selectUser(idv_usr);
this.setState({opend: true});
}

  render() {
    const actions = [
      <RaisedButton
        label="Push"
        secondary={true}
        onClick={(e)=>this.onSubmit(e)}
      />,
      <FlatButton label=" " disabled={true}/>,
      <RaisedButton
        label="Close"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
    ];

    return (
      <div>

        <RaisedButton
          label="View Online"
          onClick={this.handleToggle}
          backgroundColor="#CE93D8"
        />
        <Drawer width={350}
        openSecondary={true}
        open={this.state.open}
        docked={false}
        onRequestChange={(open) => this.setState({open})}>
          <AppBar title="Online Users" />

          <List>
             {this.listItems(this.state.Data)}
            </List>

         <MenuItem onClick={this.handleClose}><h3 backgroundcolor={"Orange"}><u>Close</u></h3></MenuItem>

        </Drawer>

        <Dialog
          title={"Composing for: "+idv}
          actions={actions}
          modal={false}
          open={this.state.opend}
          onRequestClose={this.handleClose}
        >
      <TextField  name="title"  fullWidth={true}
                  floatingLabelText="Notifcation Title"
                  multiLine={false}  rows={1}  rowsMax={1}
                  value={this.state.title}
                  onChange={e =>this.change(e)}
            />
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
