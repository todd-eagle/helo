import React from 'react';
import './App.css';
import routes from './routes';
import {connect} from 'react-redux';
import Nav from './components/Nav/Nav'
import {withRouter} from 'react-router-dom'

function App(props) {
  return (
    <div className="App">
      {props.location.pathname !== "/" ?  <Nav />: null}  
      {routes}
    </div>
  );
}

const mapStateToProps = reduxState => reduxState
export default connect(mapStateToProps)(withRouter(App))
