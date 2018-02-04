import React from 'react';
import Paper from 'material-ui/Paper';
import Topnavbar from './Topnavbar';
import NotifDisplay from './NotifDisplay';
import TabsEx from './TabsEx';
import ActionsBar from './ActionsBar';
import Bottombar from './Bottombar';
import Ntable from './Ntable';


const style = {
  height: 800,
  width: 900,
  margin: 5,
  textAlign: 'center',
  display: 'inline-block',
};

const Ngrouped = () => (
  <div>
    <Paper style={style} zDepth={5} rounded={true} >
    <Topnavbar /><br/>
    <NotifDisplay /><br/>
    <ActionsBar /><br/>
    <TabsEx /><br/>
    <Ntable /><br/>
    <Bottombar /><br/>
    </Paper>
  </div>
);

export default Ngrouped;
