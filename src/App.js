import React, { Component } from 'react';
import Rebase from 're-base';
import PDF from 'react-pdf';
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
    let { notes } = this.state;
    return (
      <div className="App">
        {notes.map(note =>
          <p key={note}>{note}</p>
        )}
        <PDF file="file:///Users/jonathan/Desktop/book.pdf" onDocumentComplete={(...args) => this.onDocumentComplete(...args)} onPageComplete={(...args) => this.onPageComplete(...args)} page={this.state.page} />
      </div>
    );
  }
}

export default App;
