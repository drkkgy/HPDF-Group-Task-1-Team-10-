import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import ViewNmore from './ViewNmore';
import ComposeNew from './ComposeNew';
import { Link } from 'react-router-dom'



export default class ActionsBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 3,
    };
  }

  handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
      <div>

      <Toolbar>
        <ToolbarGroup firstChild={false}>
        <ComposeNew />
        </ToolbarGroup>
        <ToolbarGroup>
        <ViewNmore />
        </ToolbarGroup>
        <ToolbarGroup lastChild={false}>
          <Link to='/viewall'><RaisedButton label="ALL Notifications" primary={true} /></Link>
        </ToolbarGroup>
      </Toolbar>
      </div>
    );
  }
}
