import React, { Component } from 'react';
import './App.css';
import BexioAPI from './BexioAPI';

const config = {
  clientID: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  clientSecret: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  redirectURI: 'http://localhost:3000/',
  scopes: 'article_show monitoring_show project_show'
}

const Bexio = new BexioAPI(config); //please use this name convention as best practice

class App extends Component {
  componentDidMount() {
    Bexio.callback();
  }
  render() {
    return (
      <div className="App">
        <h1>Test example</h1>
        <button type="button" onClick={Bexio.goLogin}>Login to Bexio</button>
        <button type="button" onClick={() => Bexio.getData('users')}>Get Users</button>
      </div>
    );
  }
}

export default App;
