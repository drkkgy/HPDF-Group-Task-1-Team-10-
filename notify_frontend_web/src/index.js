import React from 'react';
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import Notifier from './components/Notifier'
import registerServiceWorker from './registerServiceWorker';

render((
  <BrowserRouter>
    <Notifier />
  </BrowserRouter>
), document.getElementById('root'));


registerServiceWorker();
