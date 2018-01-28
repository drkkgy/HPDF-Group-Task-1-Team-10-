import React from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import {teal200} from 'material-ui/styles/colors';
import {indigo50} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
 palette: {
   primaryColor: indigo50,
 }
});

/*const style = {
  margin: 12,
  backgroundColor: teal200
};*/

export default class DrawerExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  render() {
    return (
      <div>
        <MuiThemeProvider muiTheme={muiTheme}>
        <RaisedButton
          label="Chat"
          onClick={this.handleToggle}
          primary={true}
        />
    </MuiThemeProvider>
      <Drawer width={200}  openSecondary={true} open={this.state.open} zDepth={-3} >
        </Drawer>
      </div>
    );
  }
}
