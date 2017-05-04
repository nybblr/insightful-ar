import React, { Component } from 'react';
import Rebase from 're-base';

import Scene from './Scene';

window.visibilityCallback = (objects) => {
  let markers = {};
  objects.forEach(marker => {
    markers[marker.markerId] = marker.object3d.visible;

    let div = document.querySelector('#marker_'+marker.markerId);
    div.style.display = marker.object3d.visible ? 'block':'none';
  })
}

window.markerCallback = (event) => {
  let width = parseInt(document.body.style.width, 10);
  let height = parseInt(document.body.style.height, 10);
  let pos = event.data.marker.pos;
  let div = document.querySelector('#marker_'+event.data.marker.idMatrix);
  div.style.left = ''+(pos[0]*width/640)+'px';
  div.style.top = ''+(pos[1]*height/480)+'px';
}

let base = Rebase.createClass({
  apiKey: "AIzaSyD9mjz3baEAtuezAJyPJuk1zUU2BagHTUQ",
  authDomain: "insightful-e5084.firebaseapp.com",
  databaseURL: "https://insightful-e5084.firebaseio.com",
  projectId: "insightful-e5084",
  storageBucket: "insightful-e5084.appspot.com",
});

let username = 'nybblr';

let users = [
  {id: 1, markerId: 3,  name: 'Jonathan Martin', progress: 'behind'},
  {id: 2, markerId: 7,  name: 'Zack Simon', progress: 'on-track'},
  {id: 3, markerId: 11, name: 'Bolot Kerimbaev', progress: 'ahead'},
];

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      notes: [],
    };
  }
  init(){
    this.ref = base.syncState(`/${username}`, {
      context: this,
      asArray: true,
      state: 'notes'
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
    return (
      <div className="App">
        <Scene users={users} />
        { users.map(user =>
          <div key={user.id} className="marker" id={`marker_${user.markerId}`}>
            <h1>{user.name}</h1>
            <p className="progress">{user.progress}</p>
          </div>
        )}
      </div>
    );
  }
}

export default App;



    // let { notes } = this.state;
        // {notes.map(note =>
        //   <p key={note}>{note}</p>
        // )}





