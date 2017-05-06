import React, { Component } from 'react';
import { Link } from 'react-router';

import Level from './Level';
import Progress from './Progress';
import t from './translations';
import base from './database';

let skill = 3;

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: {}
    };
  }

  init(){
    let { params } = this.props;
    this.ref = base.syncState(`/users/${params.id}`, {
      context: this,
      state: 'user'
    });
  }
  componentDidMount(){
    this.init();
  }
  componentWillUnmount(){
    base.removeBinding(this.ref);
  }
  componentWillReceiveProps(){
    base.removeBinding(this.ref);
    this.init();
  }

  render() {
    let { user } = this.state;
    return (
      <div className="modal animated fadeInUp">
        <Link to="/" className="close">
          <img src="icons/close.svg" />
        </Link>
        <h1 className="name">{user.name}</h1>
        <h2 className="progress">{t.progress['on-track']}</h2>
        <h2 className="progress">Book Progress: 78%</h2>
        <Progress value={0.8} />
        <section className="row">
          <h3>Role:</h3>
          <p>{user.background || '—'}</p>
        </section>
        <section className="row">
          <h3>Goals:</h3>
          <p>{user.goal || '—'}</p>
        </section>
        <section className="row">
          <h3>Topics:</h3>
          <p>{user.topics || '—'}</p>
        </section>
        <section className="row">
          <h3>Hand Raises this Class:</h3>
          <p>{user.handRaiseCount || '—'}</p>
        </section>
        <section className="row">
          <h3>Skill Level:</h3>
          <Level value={user.level} />
        </section>
      </div>
    );
  }
}

export default App;
