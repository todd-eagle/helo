import React from 'react';
import './App.css';
import routes from './routes';
import {connect} from 'react-redux';
import Nav from './components/Nav/Nav'

function App(props) {
  return (
    <div className="App">
      {routes}
    </div>
  );
}

const mapStateToProps = reduxState => reduxState
export default connect(mapStateToProps)(App)
