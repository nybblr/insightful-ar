import React, { Component } from 'react';
import { Link } from 'react-router';

import Level from './Level';
import Progress from './Progress';
import t from './translations';

let skill = 3;

class App extends Component {
  render() {
    return (
      <div className="modal animated fadeInUp">
        <Link to="/" className="close">
          <img src="icons/close.svg" />
        </Link>
        <h1 className="name">Jonathan Martin</h1>
        <h2 className="progress">{t.progress['on-track']}</h2>
        <h2 className="progress">Book Progress: 78%</h2>
        <Progress value={0.8} />
        <section className="row">
          <h3>Role:</h3>
          <p>Junior Android Developer</p>
        </section>
        <section className="row">
          <h3>Goals:</h3>
          <p>I want to master CSS.</p>
        </section>
        <section className="row">
          <h3>Topics:</h3>
          <p>Flexbox, CSS Grid, WebRTC</p>
        </section>
        <section className="row">
          <h3>Hand Raises this Class:</h3>
          <p>5</p>
        </section>
        <section className="row">
          <h3>Skill Level:</h3>
          <Level value={skill} />
        </section>
      </div>
    );
  }
}

export default App;
