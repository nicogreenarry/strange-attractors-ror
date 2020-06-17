import React from 'react';
import { render } from 'react-dom';
import App from '../components/App';

document.addEventListener('turbolinks:load', () => {
  render(
    <App />,
    document.body.appendChild(document.createElement('div'))
  );
});
