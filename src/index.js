import React from 'react';
import ReactDOM from 'react-dom';
import 'aframe';
import 'aframe-text-geometry-component';
import 'aframe-ar';
import './index.css';

import Router from './Router';

ReactDOM.render(
  <Router />,
  document.getElementById('root')
);
