import React , {Component} from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

var fetchAction =  require('node-fetch');

var url = "https://data.dankness95.hasura-app.io/v1/query";

var requestOptions = {
    "method": "POST",
    "headers": {
        "Content-Type": "application/json"
    }
};

var body = {
    "type": "select",
    "args": {
        "table": "article",
        "columns": [
            "id",
            {
                "name": "author",
                "columns": [
                    "name"
                ]
            },
            "title"
        ]
    }
};

requestOptions.body = JSON.stringify(body);



export default class Ntable extends Component {

  constructor(props)
  {
      super(props);
      this.state = {
          authors: [],
          selected: [2],
      };

  }

  isSelected = (index) => {
    return this.state.selected.indexOf(index) !== -1;
  };

  handleRowSelection = (selectedRows) => {
    this.setState({
      selected: selectedRows,
    });
  };

  componentDidMount() {
  fetchAction(url, requestOptions)
  .then(response => {
  	return response.json();
  })
  .then((adata) => {
      this.setState({authors: adata})
    });
  }

  render()
  {
      let adata = this.state.authors;
      let data = adata.map((val)=>{return (
          [ val.id,val.author.name,val.title]
                )});

let row = (x,i) =>
               <TableRow key={i} selected={this.isSelected(i)}>
                   {x.map((y,k)=>
                       <TableRowColumn key={k}>
                         {y}
                       </TableRowColumn>)}
               </TableRow>;

      return (

        <Table onRowSelection={this.handleRowSelection}  multiSelectable={true} height='600px'>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Date-Time</TableHeaderColumn>
              <TableHeaderColumn>USERS / GROUPS</TableHeaderColumn>
              <TableHeaderColumn>MESSAGE </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((x,i)=>row(x,i))}
          </TableBody>
        </Table>
        )
}
}
