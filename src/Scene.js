import React from 'react';

export default ({ users }) =>
  <a-scene embedded artoolkit='detectionMode: mono_and_matrix; matrixCodeType: 3x3; sourceType: webcam;'>
    { users.map(user =>
      <a-marker key={user.id} type="barcode" value={user.markerId} barcodeValue={user.markerId}>
        <a-box depth="1" height="1" width="1" position='0 0.5 0' material='opacity: 0.5; side:double; color:green;'></a-box>
      </a-marker>
    )}

    <a-entity camera></a-entity>
  </a-scene>
