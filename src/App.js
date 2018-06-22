import React, { Component } from 'react';
import './App.css';
import Layout from './components/Layout'
import BookShelf from './components/BookShelf'
import BookSearch from './components/BookSearch'
import {Route} from 'react-router-dom'

class App extends Component {

  render() {
    return (
      <div className="App">
        <Layout>
          <Route path="/" exact component={BookShelf} />
          <Route path="/search" render={() => <BookSearch />} />
        </Layout>
      </div>
    );
  }
}

export default App;
