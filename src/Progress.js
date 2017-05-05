import React from 'react';

export default ({ value }) =>
  <div className="progress-bar">
    <div
      className="progress-bar-inner"
      style={{width: `${value*100}%`}}>
    </div>
  </div>
