import React, { Component } from 'react';
import { Link } from 'react-router';

class App extends Component {
  render() {
    return (
      <div className="modal animated fadeInDown">
        <Link to="/" className="close">X</Link>
        <h1 className="name">Jonathan Martin</h1>
        <h2 className="progress">Currently Ahead</h2>
        <h2 className="progress">Book Progress: 78%</h2>
      </div>
    );
  }
}

export default App;
