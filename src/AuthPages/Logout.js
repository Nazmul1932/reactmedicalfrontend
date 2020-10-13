import React from "react";
import {Redirect} from "react-router-dom";
import AuthHandler from "../utills/AuthHandler";


class Logout extends React.Component{
    render() {
        AuthHandler.logoutUser();
        return <Redirect to="/" />
    }
}

export default Logout;

