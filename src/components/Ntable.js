import React , {Component} from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import Delete from 'material-ui/svg-icons/action/delete';
import View from 'material-ui/svg-icons/action/view-list';
//import Notify from 'material-ui/svg-icons/social/notifications';
import {Tabs, Tab} from 'material-ui/Tabs';
//import Received from 'material-ui/svg-icons/navigation/arrow-back';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';


const view = <View />;
//const notify = <Notify />;
const clear = <Delete />;

let url = "https://data.astigmatic44.hasura-app.io/v1/query";
let authToken = window.localStorage.getItem('HASURA_AUTH_TOKEN');
let requestOptions = {
    "method": "POST",
    "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + authToken,
    }
};
let urlX = "https://auth.astigmatic44.hasura-app.io/v1/user/info";
let requestOptionsX = {
    "method": "GET",
    "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + authToken,
    }
};

let body = {};let selectMsg = []; let dlg =[];

export default class Ntable extends Component {

  constructor(props)
  {
      super(props);
      this.state = {
          Messages:[],
          selected: [0],
          selectedIndex: 0,
          opend:false,
      };

  }

  isSelected = (index) =>{ return this.state.selected.indexOf(index) !== -1;}


  handleRowSelection = (selectedRows) => {
    this.setState({
      selected: selectedRows,
    });
  };

handleCellClick =(rowNumber)=>{
  dlg = selectMsg[rowNumber];
}

handleClose = () => this.setState({opend: false});
handleOpen = () => this.setState({opend: true});

handleDelete = () => {
body = {
    "type": "delete",
    "args": {
        "table": "User_Notification_Store",
        "where": {  "id": {  "$eq": dlg[0] } } }
};
requestOptions.body = JSON.stringify(body);
fetch(url, requestOptions)
.then(function(response) {
	return response.json();
})
.then(function(result) {
	console.log(result);
})
.catch(function(error) {
	console.log('Request Failed:' + error);
});
this.handleClose();
window.location.href = '/home';
}
  componentDidMount() {
    this.getUserInfo();
  }



 getUserInfo=()=>{
      fetch(urlX, requestOptionsX)    //get user info
      .then((response) => {
        return response.json();
      })
      .then((result) => {
      this.getMessages(result.username);

      })
      .catch((error) => {
        console.log('User info retrieval:' + error);
      });
  }

getMessages=(user)=>{
  body = {
  "type": "select",
  "args": {
      "table": "User_Notification_Store",
      "columns": [ "*" ],
      "limit": this.props.data.limit,
      "order_by": [  {"column": "id",
           "order": "desc" }  ]
  } };
requestOptions.body = JSON.stringify(body);

fetch(url, requestOptions)
.then((response) => {
  return response.json();
})
.then((adata) => {
    this.setState({Messages: adata})
  });
}

showMessages=()=>{
  let recentMsg=this.state.Messages.map((val) => {return ([val.id,val.Time_Stamp,val.From,val.To,val.Notification])});
 selectMsg=recentMsg.reverse();
  }


  render()
  {
let row = (x,i) =>
               <TableRow key={i} selected={this.isSelected(i)} >
                   {x.map((y,k)=>
                       <TableRowColumn key={k} >
                         {y}
                       </TableRowColumn>)}
               </TableRow>;

               const actions = [
                 <RaisedButton
                   label="DELETE"
                   secondary={true}
                   onClick={this.handleDelete}
                 />,
                 <FlatButton label=" " disabled={true}/>,
                 <RaisedButton
                   label="Close"
                   primary={true}
                   keyboardFocused={true}
                   onClick={this.handleClose}
                 />,
               ];

// icon={<Received />}
      return (
        <div>
        <Tabs>
          <Tab

            label={<h3>View Recent Notification Messages </h3>}
            onActive={this.showMessages()}
          />

        </Tabs>
        <Dialog
          title={dlg[1]}
          actions={actions}
          modal={false}
          open={this.state.opend}
          onRequestClose={this.handleClose}
        >
         <h5><u>Message ID:</u>  {dlg[0]}</h5>
         <strong> From : </strong> {dlg[2]}  <strong>To : </strong> {dlg[3]}
         <h3><u>Message:</u> {dlg[4]}</h3>

        </Dialog>
        <Table onRowSelection={this.handleRowSelection} onCellClick={this.handleCellClick} multiSelectable={false} height={this.props.data.height} fixedHeader={false} style={{ tableLayout: 'auto' }}>
          <TableHeader adjustForCheckbox={false} displaySelectAll={true}>
            <TableRow>
              <TableHeaderColumn>MSG_ID</TableHeaderColumn>
              <TableHeaderColumn>TIME</TableHeaderColumn>
              <TableHeaderColumn>FROM</TableHeaderColumn>
              <TableHeaderColumn>TO</TableHeaderColumn>
              <TableHeaderColumn>MESSAGE </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={true}>
            {selectMsg.map((x,i)=>row(x,i))}
          </TableBody>
        </Table>
        <Paper zDepth={1}>
          <BottomNavigation >
            <BottomNavigationItem
              label="View"
              icon={view}
              onClick={() => this.handleOpen()}
            />
            <BottomNavigationItem
              label="Clear"
              icon={clear}
              onClick={() => this.handleDelete()}
            />
           </BottomNavigation>
        </Paper>
        </div>
        )
}
}

/*
<BottomNavigationItem
  label="Notify others"
  icon={notify}
  onClick={() => this.handleCompose()}
/>

*/
