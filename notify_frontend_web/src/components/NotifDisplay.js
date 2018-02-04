import React from 'react';
import {Card, CardHeader, CardTitle} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';

const style = {

 textAlign: 'left',
};

const NotifDisplay = () => (
  <Paper style={style} zDepth={3} >
  <Snackbar
         open={true}
         message="New Notification Received !!"
         autoHideDuration={4000}
       />
  <Card>
    <CardHeader
      title="Peer name "
      subtitle="Date & time"
      avatar="images/jsa-128.jpg"
    />
    <CardTitle title="This is a sample notification sent to the user !!"/>
  </Card>
  </Paper>
);

export default NotifDisplay;
