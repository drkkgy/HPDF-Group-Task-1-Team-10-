import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import SearchBar from 'material-ui-search-bar';
import {tealA200} from 'material-ui/styles/colors';

const Homestyle={
  margin:'4px'
}
const Label = {
  fontWeight:'bold',
  color:'black'
}
const Login={
  fontSize:'16px',
  fontWeight:'bold',
  fontFamily:'Arial'
}
const toolbarStyle = {
      backgroundColor: tealA200

    }

export default class ToolbarExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 3,
    };
  }

  handleChange = (event, index, value) => this.setState({value});

  render() {
    return (

      <Toolbar style={toolbarStyle}>
        <h2 id="h2style">Our Website</h2>

          <ToolbarGroup>
            <SearchBar
              style={{
                margin: '0 auto',
                maxWidth: 1000,

              }}/>
              <ToolbarGroup >
            <FlatButton
              label="Messages"
              hoverColor="cyan"
              style={Homestyle}
              labelStyle = {Label}
              />
              <FlatButton
                label="Notification"
                hoverColor="cyan"
                style={Homestyle}
                labelStyle = {Label}/>

            </ToolbarGroup>

              <FlatButton
                label="Logout"
                labelStyle = {Login}
                />

          </ToolbarGroup>
      </Toolbar>

    );
  }
}
