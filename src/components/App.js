import React, { Component } from 'react';
import '../styles/App.css';
import REProperties from './REProperties'
import data from '../datasource/data.json'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
           <h1 className="App-title">Welcome to REA World  via React</h1>
        </header>
        <REProperties results={data.results} saved ={data.saved}/>
      </div>
    );
  }
}

export default App;
