import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    currency: {}
  };

  componentDidMount() {
    axios.get('/currency').then(response => {
      console.log(response.data);
      this.setState({
        currency: response.data
      });
    });
  }

  render() {
    return (
      <div className="App">
        <h1>{this.state.currency.base}</h1>
      </div>
    );
  }
}

export default App;
