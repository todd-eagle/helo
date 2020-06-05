import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Landing from './components/Landing';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';

export default (
    <Switch>
        <Route exact path="/" component={Landing}/>
        <Route path="/COMPONENT1" component={Component1}/>
        <Route path="/COMPONENT2" component={Component2}/>
        <Route path="/COMPONENT3" component={Component3}/>
    </Switch>
)