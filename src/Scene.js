import React from 'react';

export default ({ users }) =>
  <a-scene embedded vr-mode-ui="enabled: false" artoolkit='detectionMode: mono_and_matrix; matrixCodeType: 3x3; sourceType: webcam;'>
    { Object.keys(users).map(id => {
      let user = users[id];
      return (
      <a-marker key={user.id} type="barcode" value={user.markerId} barcodeValue={user.markerId}>
        <a-image src={`./progress/${user.progress}.png`} depth="1" height="1" width="1" rotation="90 0 0" position="0 0.01 0"></a-image>
      </a-marker>
      )
    })}

    <a-entity camera></a-entity>
  </a-scene>


// depth="1" height="1" width="1" rotation="90 0 0" position="0 0.5 0.5"
        // <a-entity text-geometry="value: Jonathan Martin;" rotation="-90 0 0" position="-0.5 0.001 -0.5" material="color: red;" size="0.2"></a-entity>
