import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './AuthPages/Login'
import Logout from './AuthPages/Logout';
import HomeComponent from "./AuthPages/HomeComponent";
import CompanyComponent from "./AuthPages/CompanyComponent";
import {PrivateRouteNew} from "./utills/PrivateRouteNew";
import Config from "./utills/Config";
import CompanyDetailsComponent from "./AuthPages/CompanyDetailsComponent";
import CompanyAddBankComponent from "./AuthPages/CompanyAddBankComponent";
import EditCompanyBankComponents from "./AuthPages/EditCompanyBankComponents";
import AddMedicineComponent from "./AuthPages/AddMedicineComponent";
import ManageMedicineComponent from "./AuthPages/ManageMedicineComponent";
import CompanyAccountComponent from "./AuthPages/CompanyAccountComponent";
import EmployeeComponent from "./AuthPages/EmployeeComponent";


ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path="/" component={Login}/>
            <Route exact path={Config.logoutUrl} component={Logout}/>
            <PrivateRouteNew exact path="/home" activepage="0" page={HomeComponent}/>
            <PrivateRouteNew exact path="/company" activepage="1" page={CompanyComponent}/>
            <PrivateRouteNew exact path="/company_details/:id" activepage="1" page={CompanyDetailsComponent}/>
            <PrivateRouteNew exact path="/add_company_bank/:id" activepage="1" page={CompanyAddBankComponent}/>
            <PrivateRouteNew exact path="/edit_company_bank/:company_id/:id" activepage="1" page={EditCompanyBankComponents}/>
            <PrivateRouteNew exact path="/add_medicine" activepage="2" page={AddMedicineComponent}/>
            <PrivateRouteNew exact path="/manage_medicine" activepage="3" page={ManageMedicineComponent}/>
            <PrivateRouteNew exact path="/manage_company_account" activepage="4" page={CompanyAccountComponent}/>
            <PrivateRouteNew exact path="/employee_manage" activepage="5" page={EmployeeComponent}/>
        </Switch>
    </Router>,
    document.getElementById("root")
)