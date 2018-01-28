import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const style={
  align:'left'
}

const About = () => (
  <div>
<br/>
  <Card >

    <div className="block">
    <h2 id="fb">About</h2>
    FirstName :<br/><br/> {//From the server 
    }
    LastName : <br/><br/>
    UserName :<br/><br/>
    Email :<br/><br/>
    Phone Number :<br/><br/>
  </div>
  </Card>
</div>
);

export default About;
