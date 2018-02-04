import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Received from 'material-ui/svg-icons/navigation/arrow-back';
import Sent from 'material-ui/svg-icons/navigation/arrow-forward';


const TabsEx = () => (
  <Tabs>
    <Tab
      icon={<Received />}
      label="Received"
    />
    <Tab
      icon={<Sent />}
      label="Sent"
    />

  </Tabs>
);

export default TabsEx;
/*
import Failed from 'material-ui/svg-icons/alert/warning';

<Tab
  icon={<Failed />}
  label="Failed"
/>
*/
