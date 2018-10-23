import React, { Component } from 'react';
import './App.css';
import BexioAPI from './BexioAPI';
import { client_ID, client_secret } from './.env_data'; // hidden

const config = {
  clientID: client_ID,
  clientSecret: client_secret,
  redirectURI: 'http://localhost:3000/',
  scopes: 'article_show monitoring_show project_show',
};

const Bexio = new BexioAPI(config); // please use this name convention as best practice

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    Bexio.callback();
  }

  handleClick() {
    const data = Bexio.getData('users');
    this.setState({
      data,
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Test example</h1>
        <button type="button" onClick={Bexio.goLogin}>
          Login to Bexio
        </button>
        <button type="button" onClick={() => this.handleClick}>
          Get Users
        </button>
      </div>
    );
  }
}

export default App;
