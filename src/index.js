import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './AuthPages/Login'
import Logout from './AuthPages/Logout';
import HomeComponent from "./AuthPages/HomeComponent";
import CompanyComponent from "./AuthPages/CompanyComponent";
import {PrivateRouteNew} from "./utills/PrivateRouteNew";
import Config from "./utills/Config";


ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path="/" component={Login}/>
            <Route exact path={Config.logoutUrl} component={Logout}/>
            <PrivateRouteNew exact path="/home" activepage="0" page={<HomeComponent/>}/>
            <PrivateRouteNew exact path="/company" activepage="1" page={<CompanyComponent/>}/>
        </Switch>
    </Router>,
    document.getElementById("root")
)