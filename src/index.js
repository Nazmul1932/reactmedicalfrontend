import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './AuthPages/Login'
import MainComponent from './components/MainComponent';
import {PrivateRoute} from "./utills/PrivateRoute";


ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path="/" component={Login}></Route>
            <PrivateRoute exact path="/home" component={MainComponent}></PrivateRoute>
        </Switch>
    </Router>
    ,document.getElementById("root")
)