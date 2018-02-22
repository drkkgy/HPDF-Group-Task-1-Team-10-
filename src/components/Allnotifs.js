import React, { Component }  from 'react';
import Topnavbar from './Topnavbar';
import Ntable from './Ntable';
import Paper from 'material-ui/Paper';


const style = {
  height: 800,
  width: 900,
  margin: 5,
  textAlign: 'center',
  display: 'inline-block',
};

export default class Main extends Component {

  constructor(props){
    super(props);
    this.state = {
      table:{
      limit:  "50",
      height:'500px',
      },
    };
  }


  render(){
  return(
    <div>
      <Paper style={style} zDepth={5} rounded={true} >
    <Topnavbar/>
    <Ntable data={this.state.table}/>
       </Paper>
    </div>
);
}
}
