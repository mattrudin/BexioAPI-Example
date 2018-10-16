import React, { Component } from 'react';
import './App.css';
import Bexio from './Bexio';

const config = {
  clientID: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  clientSecret: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXX'
}

const BexioExample = new Bexio(config);

class App extends Component {
  componentDidMount() {
    BexioExample.timerInterval();
  }
  render() {
    return (
      <div className="App">
        <h1>Test example</h1>
        <button type="button" onClick={BexioExample.goLogin}>Login to Bexio</button>
      </div>
    );
  }
}

export default App;
