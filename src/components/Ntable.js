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
import Notify from 'material-ui/svg-icons/social/notifications';
import {Tabs, Tab} from 'material-ui/Tabs';
import Received from 'material-ui/svg-icons/navigation/arrow-back';


const view = <View />;
const notify = <Notify />;
const clear = <Delete />;

let url = "https://data.dankness95.hasura-app.io/v1/query";
let authToken = window.localStorage.getItem('HASURA_AUTH_TOKEN');
let requestOptions = {
    "method": "POST",
    "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + authToken,
    }
};
let urlX = "https://auth.dankness95.hasura-app.io/v1/user/info";
let requestOptionsX = {
    "method": "GET",
    "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + authToken,
    }
};

let body = {};let selectMsg = [];

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

select = (index) => this.setState({selectedIndex: index});

  isSelected = (index) => {
    return this.state.selected.indexOf(index) !== -1;
  };

  handleRowSelection = (selectedRows) => {
    this.setState({
      selected: selectedRows,
    });
  };

  componentDidMount() {
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
      "table": "Messages",
      "columns": [
          "Message",
          "To",
          "From",
          "time"
      ],
      "limit": this.props.data.limit,
      "order_by": [
          {
              "column": "time",
              "order": "desc"
          }
      ]
  }
};
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
 selectMsg=this.state.Messages.map((val) => {return ([ val.time,val.From,val.To,val.Message])});
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

      return (
        <div>
        <Tabs>
          <Tab
            icon={<Received />}
            label={<h2>VIEW  RECENT  NOTIFICATION MESSAGES </h2>}
            onActive={this.showMessages()}
          />

        </Tabs>
      
        <Table onRowSelection={this.handleRowSelection}  multiSelectable={false} height={this.props.data.height}>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>TIME</TableHeaderColumn>
              <TableHeaderColumn>FROM</TableHeaderColumn>
              <TableHeaderColumn>TO</TableHeaderColumn>
              <TableHeaderColumn>MESSAGE </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {selectMsg.map((x,i)=>row(x,i))}
          </TableBody>
        </Table>
        <Paper zDepth={1}>
          <BottomNavigation selectedIndex={this.state.selectedIndex}>
            <BottomNavigationItem
              label="View"
              icon={view}
              onClick={() => this.select(0)}
            />
            <BottomNavigationItem
              label="Clear"
              icon={clear}
              onClick={() => this.select(1)}
            />
            <BottomNavigationItem
              label="Notify others"
              icon={notify}
              onClick={() => this.select(2)}
            />
          </BottomNavigation>
        </Paper>
        </div>
        )
}
}
/*
import Sent from 'material-ui/svg-icons/navigation/arrow-forward';
import { Link } from 'react-router-dom'

*/
