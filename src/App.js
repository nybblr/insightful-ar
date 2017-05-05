import React, { Component } from 'react';
import Rebase from 're-base';
import { Link } from 'react-router';

import Scene from './Scene';
import t from './translations';

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

let base = Rebase.createClass({
  apiKey: "AIzaSyD9mjz3baEAtuezAJyPJuk1zUU2BagHTUQ",
  authDomain: "insightful-e5084.firebaseapp.com",
  databaseURL: "https://insightful-e5084.firebaseio.com",
  projectId: "insightful-e5084",
  storageBucket: "insightful-e5084.appspot.com",
});

// let username = 'nybblr';

// let users = [
//   {id: 1, markerId: 3,  name: 'Jonathan Martin', progress: 'behind', goal: 'I want to learn how to make advanced PWAs.', background: 'Junior Android Developer', level: 3},
//   {id: 2, markerId: 7,  name: 'Zack Simon', goal: 'To become an Xcode pro', background: 'iOS/Android', progress: 'on-track', level: 5},
//   {id: 3, markerId: 11, name: 'Bolot Kerimbaev', progress: 'ahead', goal: 'To be a pro at all the things, CSS is weird.', background: 'iOS Developer', level: 2},
// ];

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

    window.setState = this.setState.bind(this);
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



  onDocumentComplete(pages) {
    this.setState({ page: 1, pages });
  }

  onPageComplete(page) {
    this.setState({ page });
  }

  render() {
    let { users } = this.state;
    return (
      <div className="App">
        <div id="vr-root">
        <Scene users={users} />
        { users.map(user =>
          <Link to={`/users/${user.id}`} className="marker" id={`marker_${user.markerId}`}>
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
