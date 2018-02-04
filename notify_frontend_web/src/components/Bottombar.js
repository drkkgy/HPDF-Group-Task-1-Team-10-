import React, {Component} from 'react';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import Delete from 'material-ui/svg-icons/action/delete';
import View from 'material-ui/svg-icons/action/view-list';
import Notify from 'material-ui/svg-icons/social/notifications';

const view = <View />;
const notify = <Notify />;
const clear = <Delete />;

class Bottombar extends Component {
  state = {
    selectedIndex: 0,
  };

  select = (index) => this.setState({selectedIndex: index});

  render() {
    return (
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
    );
  }
}

export default Bottombar;
