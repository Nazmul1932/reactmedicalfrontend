import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './AuthPages/Login'
import HomeComponent from "./AuthPages/HomeComponent";
import CompanyComponent from "./AuthPages/CompanyComponent";
import {PrivateRouteNew} from "./utills/PrivateRouteNew";


ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path="/" component={Login}/>
            <PrivateRouteNew exact path="/home" activepage="0" page={<HomeComponent/>}/>
            <PrivateRouteNew exact path="/company" activepage="1" page={<CompanyComponent/>}/>
        </Switch>
    </Router>,
    document.getElementById("root")
)