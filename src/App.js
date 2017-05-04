import React, { Component } from 'react';
import Rebase from 're-base';
import './App.css';

let base = Rebase.createClass({
  apiKey: "AIzaSyD9mjz3baEAtuezAJyPJuk1zUU2BagHTUQ",
  authDomain: "insightful-e5084.firebaseapp.com",
  databaseURL: "https://insightful-e5084.firebaseio.com",
  projectId: "insightful-e5084",
  storageBucket: "insightful-e5084.appspot.com",
});

let username = 'nybblr';

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
      <a-scene embedded artoolkit='detectionMode: mono_and_matrix; matrixCodeType: 3x3; sourceType: webcam;'>
        <a-marker type="barcode" value="11" barcodeValue="11">
          <a-box depth="1" height="1" width="1" position='0 0.5 0' material='opacity: 0.5; side:double; color:green;'></a-box>
        </a-marker>

        <a-marker type="barcode" value="7" barcodeValue="7">
          <a-box depth="1" height="1" width="1" position='0 0.5 0' material='opacity: 0.5; side:double; color:red;'></a-box>
        </a-marker>

        <a-marker type="barcode" value="3" barcodeValue="3">
          <a-box depth="1" height="1" width="1" position='0 0.5 0' material='opacity: 0.5; side:double; color:blue;'></a-box>
        </a-marker>

        <a-entity camera></a-entity>
      </a-scene>
    );
  }
}

export default App;



    // let { notes } = this.state;
        // {notes.map(note =>
        //   <p key={note}>{note}</p>
        // )}
        // <a-scene embedded artoolkit='sourceType: webcam;'>
        //   <a-box position='0 0 0.5' material='opacity: 0.5;'></a-box>
        //   <a-marker-camera preset='hiro'></a-marker-camera>
        // </a-scene>
