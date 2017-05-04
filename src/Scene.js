import React from 'react';

export default ({ users }) =>
  <a-scene embedded artoolkit='detectionMode: mono_and_matrix; matrixCodeType: 3x3; sourceType: webcam;'>
    { users.map(user =>
      <a-marker key={user.id} type="barcode" value={user.markerId} barcodeValue={user.markerId}>
        <a-image src={`./progress/${user.progress}.png`} depth="1" height="1" width="1" rotation="90 0 0" position="0 0 0"></a-image>
      </a-marker>
    )}

    <a-entity camera></a-entity>
  </a-scene>
