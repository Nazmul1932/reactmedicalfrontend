import AuthHandler from "./AuthHandler";
import Axios from "axios";
import Config from "./Config";
import {reactLocalStorage} from "reactjs-localstorage";


class APIHandler{
    async checkLogin(){
        if(AuthHandler.checkTokenExpiry()){
            try {
                var response = await Axios.post(Config.refreshUrl, {refresh: AuthHandler.getRefreshToken()});
                reactLocalStorage.set("token", response.data.access);
            }catch (error){
                console.log(error);
                AuthHandler.logoutUser();
                window.location = "/";
            }
        }
    }
    async saveCompanyData(name, license_no, address, contact_no, email, description){
        await this.checkLogin();

        return await Axios.post(Config.companyUrl, {
                name: name, license_no: license_no, address: address,
                contact_no: contact_no, email: email, description: description
            },
            {headers: {Authorization: "Bearer " + AuthHandler.getLoginToken()}});
    }

    async fetchAllCompanyData(){
        await this.checkLogin();

        return await Axios.get(Config.companyUrl, {headers: {Authorization: "Bearer " + AuthHandler.getLoginToken()}});
    }
}

export default APIHandler;