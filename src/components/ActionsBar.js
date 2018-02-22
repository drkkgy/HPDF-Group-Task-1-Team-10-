import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import Sidebar from './Sidebar';
import ComposeNew from './ComposeNew';
import { Link } from 'react-router-dom'

let pickUser='default';

export default class ActionsBar extends React.Component {

  constructor(props){
    super(props);
    this.state = {

    };
  }

  componentWillMount(){
  this.setState({Data : this.props.transfer});
  }

 handlepass=(title,message)=> {
   this.props.passnotif(title,message);
 }

msgUser = (user) => {
  pickUser = user;
}

  render() {
    return (
      <div>

      <Toolbar>
        <ToolbarGroup firstChild={false}>
        <ComposeNew sendnotif={this.handlepass} user={pickUser}/>
        </ToolbarGroup>
        <ToolbarGroup>
        <Sidebar sendnotif={this.handlepass} selectUser={this.msgUser}/>
        </ToolbarGroup>
        <ToolbarGroup lastChild={false}>
          <Link to='/viewall'><RaisedButton label="ALL Notifications" primary={true} /></Link>
        </ToolbarGroup>
      </Toolbar>
      </div>
    );
  }
}
