import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class ComposeNew extends React.Component {

  constructor(props){
    super(props);
    this.state = {
    open: false,
    values: [],
    message: "",
    title:"",
    Data : ['All Offline'],
  };
}

setUsers() {
   let authToken = window.localStorage.getItem('HASURA_AUTH_TOKEN');
  const url = "https://data.astigmatic44.hasura-app.io/v1/query";
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
          "table": "User_Details",
          "columns": ["*"],
          "where": { "Device_Id": { "$ne": null}}}};
  requestOptions.body = JSON.stringify(body);

 fetch(url, requestOptions)
 .then((response) => {
   return response.json();
 })
 .then((adata) => {
  this.setState({Data : adata.map((data)=>{return data.User_Name+" ( "+data.F_Name+" "+data.L_Name+" )" })});
  }).catch((error) => {
    console.log("FAILED",error);
                })
       }

componentWillMount(){
this.setUsers();
}


  change = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit=(e) =>{
    e.preventDefault();
   let idv_usr="",idv=this.state.values;
   idv_usr=idv.substr(0,idv.indexOf(' ')); //extracting only username

    this.props.sendnotif(idv_usr,this.state.title,this.state.message);
    this.setState({
      message:"",
      title:"",
      open:false,
    });
}

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleChange = (event, index, values) => this.setState({values});

  menuItems(values) {
    return this.state.Data.map((name) => (
      <MenuItem
        key={name}
        insetChildren={true}
        checked={values && values.indexOf(name) > -1}
        value={name}
        primaryText={name}
      />
    ));
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

    const {values} = this.state;

    return (
      <div>

        <RaisedButton label="COMPOSE NEW" secondary={true}  onClick={this.handleOpen} />

        <Dialog
          title="Compose a new notification"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >

        <SelectField
        multiple={false}
        hintText="Select users"
        value={values}
        maxHeight={300}
        onChange={this.handleChange} >
        {this.menuItems(values)}
        </SelectField>
        <TextField  name="title"  fullWidth={true}
                  floatingLabelText="Notifcation Title"
                  multiLine={false}  rows={1}  rowsMax={1}
                  value={this.state.title}
                  onChange={e =>this.change(e)}
            />
      <TextField  name="message"  fullWidth={true}
                  floatingLabelText="Notifcation Message"
                  multiLine={true}  rows={2}  rowsMax={4}
                  value={this.state.message}
                  onChange={e =>this.change(e)}
            />

        </Dialog>
      </div>
    );
  }
}
