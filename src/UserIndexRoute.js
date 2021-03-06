import React, { Component } from 'react';
import { Link } from 'react-router';

import Level from './Level';
import Progress from './Progress';
import t from './translations';
import base from './database';
import calcProgress from './calculate-progress';

window.db = base;

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: {},
      pdfStat: {
        numPages: 1,
        pageNumber: 0,
        sections: []
      }
    };
  }

  init(){
    let { params } = this.props;
    this.ref = base.syncState(`/users/${params.id}`, {
      context: this,
      state: 'user'
    });
    this.ref2 = base.syncState(`/users/${params.id}/pdfStat`, {
      context: this,
      isNullable: true,
      state: 'pdfStat'
    });
    this.ref3 = base.syncState(`/classStats/current/averagePage`, {
      context: this,
      isNullable: true,
      state: 'averagePage'
    });
  }
  componentDidMount(){
    this.init();
  }
  componentWillUnmount(){
    base.removeBinding(this.ref);
    base.removeBinding(this.ref2);
    base.removeBinding(this.ref3);
  }
  componentWillReceiveProps(){
    base.removeBinding(this.ref);
    base.removeBinding(this.ref2);
    base.removeBinding(this.ref3);
    this.init();
  }

  render() {
    let { user, pdfStat, averagePage } = this.state;
    user = calcProgress(user, averagePage);
    pdfStat = pdfStat ||
      {
        numPages: 1,
        pageNumber: 0,
        sections: []
      };
    let { numPages, pageNumber, sections } = pdfStat;
    let progress = pageNumber / numPages;
    sections = sections.map(s => s
      .replace(/Chapter/g, 'Ch.')
      .replace(/Part/g, 'Pt.')
    )

    return (
      <div className="modal animated fadeInUp">
        <Link to="/" className="close">
          <img src="icons/close.svg" />
        </Link>
        <h1 className="name">{user.name}</h1>
        <h2 className="progress">{t.progress[user.progress]}</h2>
        <h2 className="progress">Book Progress: {Math.round(progress*100)}% (Pg. {pageNumber})</h2>
        <Progress value={progress} />
        <section className="row">
          <h3>Role:</h3>
          <p>{user.background || '—'}</p>
        </section>
        <section className="row">
          <h3>Goals:</h3>
          <p>{user.goal || '—'}</p>
        </section>
        <section className="row">
          <h3>Current Section:</h3>
          <ul className="outline">{sections.map((section, i) =>
            <li key={i} className={`animated delayed fadeInUp level-${i}`}>{section}</li>
          )}</ul>
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
