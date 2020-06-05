import React from 'react';
import './App.css';
import Nav from './components/Nav/Nav'
import Dashboard from './components/Dashboard/Dashboard'
import Auth from './components/Auth/Auth'
import Post from './components/Post/Post'
import Form from './components/Form/Form'

function App() {
  return (
    <div className="App">
      <Nav />
      <Auth />
      <Dashboard />
      <Post />
      <Form />
     
    </div>
  );
}

export default App;
