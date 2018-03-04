import React from 'react';
import ReactDOM from 'react-dom';
import Notifier from './components/Notifier';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Notifier />, div);
  ReactDOM.unmountComponentAtNode(div);
});
