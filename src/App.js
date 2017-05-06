import React, { Component } from 'react';
import { Link } from 'react-router';

import Scene from './Scene';
import t from './translations';
import base from './database';
import calcProgress from './calculate-progress';

window.visibilityCallback = (objects) => {
  let markers = {};
  objects.forEach(marker => {
    markers[marker.markerId] = marker.object3d.visible;

    let div = document.querySelector('#marker_'+marker.markerId);
    if (div) {
      div.style.display = marker.object3d.visible ? 'block':'none';
    }
  })
}

window.markerCallback = (event) => {
  let root = document.querySelector('#vr-root');
  let width = parseInt(root.style.width, 10);
  let height = parseInt(root.style.height, 10);
  let pos = event.data.marker.pos;
  let div = document.querySelector('#marker_'+event.data.marker.idMatrix);
  if (div) {
    div.style.left = ''+(pos[0]*width/640)+'px';
    div.style.top = ''+(pos[1]*height/480)+'px';
  }
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      users: [],
    };
  }
  init(){
    this.ref = base.syncState(`/users`, {
      context: this,
      state: 'users'
    });

    this.ref2 = base.syncState(`/classStats/current/averagePage`, {
      context: this,
      isNullable: true,
      state: 'averagePage'
    });

    window.setState = this.setState.bind(this);
  }
  componentDidMount(){
    this.init();
  }
  componentWillUnmount(){
    base.removeBinding(this.ref);
    base.removeBinding(this.ref2);
  }
  componentWillReceiveProps(){
    base.removeBinding(this.ref);
    base.removeBinding(this.ref2);
    this.init();
  }



  render() {
    let { users, averagePage } = this.state;
    users = Object.keys(users).map(id => {
      return users[id];
    });
    users = users.map(user => calcProgress(user, averagePage));
    return (
      <div className="App">
        <div id="vr-root">
        <Scene users={users} />
        { users.map(user =>
          <Link key={user.id} to={`/users/${user.id}`} className="marker" id={`marker_${user.markerId}`}>
            <img className="info" src="icons/info.svg" />
            <h1>{user.name}</h1>
            <p className="progress">{t.progress[user.progress]}</p>
          </Link>
        )}
      </div>
        { this.props.children }
      </div>
    );
  }
}

export default App;
