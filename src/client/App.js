import React from 'react';
import logo from './logo.svg';
import { ConfigConsumer } from '../components/ConfigProvider';
import ExampleComponent from '../components/ExampleComponent';
import './App.css';

const App = () => (
  <ConfigConsumer>
    {config => (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">
              Welcome to
            {config.app.TITLE}
          </h1>
        </header>
        <p className="App-intro">
            To get started, edit
          {'App.js'}
          <code>src/App.js</code>
          {' '}
            and save to reload.
        </p>
        <ExampleComponent text="Some Text" />
      </div>
    )}
  </ConfigConsumer>
);

export default App;
