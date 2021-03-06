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

    async fetchCompanyDetails(id){
        await this.checkLogin();

        return await Axios.get(Config.companyUrl+""+id+"/", {headers: {Authorization: "Bearer " + AuthHandler.getLoginToken()}});
    }

    async editCompanyData(name, license_no, address, contact_no, email, description, id){
        await this.checkLogin();

        return await Axios.put(Config.companyUrl+""+id+"/", {
                name: name, license_no: license_no, address: address,
                contact_no: contact_no, email: email, description: description
            },
            {headers: {Authorization: "Bearer " + AuthHandler.getLoginToken()}});
    }

    async saveCompanyBankData(bank_account_no, ifsc_no, company_id){

        await this.checkLogin();
        return await Axios.post(Config.companyBankUrl, {
                bank_account_no: bank_account_no, ifsc_no: ifsc_no, company_id: company_id,
            },
            {headers: {Authorization: "Bearer " + AuthHandler.getLoginToken()}});
    }

    async saveCompanyTransactionData(company_id, transaction_type, transaction_amt, transaction_date,
                                     payment_mode)
    {
        await this.checkLogin();

        return  await Axios.post(
            Config.company_account_url,
            {
                company_id: company_id,
                transaction_type: transaction_type,
                transaction_amt: transaction_amt,
                transaction_date: transaction_date,
                payment_mode: payment_mode,
            },
            { headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() } }
        );

    }

    async saveEmployeeData(name, joining_date, phone, address)
    {
        await this.checkLogin();

        return  await Axios.post(
            Config.employee_api_only,
            {
                name: name,
                joining_date: joining_date,
                phone: phone,
                address: address,
            },
            { headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() } }
        );

    }

    async fetchCompanyBankDetails(id){
        await this.checkLogin();

        return await Axios.get(Config.companyBankUrl + "" + id + "/", {
            headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
        });
    }

    async EditCompanyBankData(bank_account_no, ifsc_no, company_id, id){
        await this.checkLogin();

        return await Axios.put(Config.companyBankUrl+""+id+"/", {
                bank_account_no: bank_account_no, ifsc_no: ifsc_no, company_id: company_id
            },
            {headers: {Authorization: "Bearer " + AuthHandler.getLoginToken()}});
    }

    async fetchCompanyOnly(){
        await this.checkLogin();

        return await Axios.get(Config.company_only, {headers: {Authorization: "Bearer " + AuthHandler.getLoginToken()}});
    }

    async fetchEmployee(){
        await this.checkLogin();

        return await Axios.get(Config.employee_api_only, {headers: {Authorization: "Bearer " + AuthHandler.getLoginToken()}});
    }

    async saveMedicineData(
        name, medical_typ,buy_price,sell_price, c_gst, s_gst,batch_no,shelf_no, expire_date,mfg_date,company_id,
        description,in_stock_total,qty_in_strip, medicinedetails
    ) {
        await this.checkLogin();
        //Wait Until Token Get Updated

        return  await Axios.post(
            Config.medicineApiUrl,
            {
                name: name, medical_typ: medical_typ,buy_price: buy_price,sell_price: sell_price,
                c_gst: c_gst,s_gst: s_gst,batch_no: batch_no, shelf_no: shelf_no,expire_date: expire_date,
                mfg_date: mfg_date,company_id: company_id,description: description,in_stock_total: in_stock_total,
                qty_in_strip: qty_in_strip,medicine_details: medicinedetails,
            },
            { headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() } }
        );
    }

    async FetchMedicineAll(){
        await this.checkLogin();

        return await Axios.get(Config.medicineApiUrl, {headers: {Authorization: "Bearer " + AuthHandler.getLoginToken()}});
    }

    async EditMedicineData(
        name, medical_typ, buy_price,sell_price, c_gst, s_gst,batch_no,shelf_no, expire_date, mfg_date,company_id,
        description, in_stock_total, qty_in_strip,medicinedetails,id
    ) {
        await this.checkLogin();
        //Wait Until Token Get Updated

        return  await Axios.put(
            Config.medicineApiUrl + "" + id + "/",
            {
                name: name,
                medical_typ: medical_typ,
                buy_price: buy_price,
                sell_price: sell_price,
                c_gst: c_gst,
                s_gst: s_gst,
                batch_no: batch_no,
                shelf_no: shelf_no,
                expire_date: expire_date,
                mfg_date: mfg_date,
                company_id: company_id,
                description: description,
                in_stock_total: in_stock_total,
                qty_in_strip: qty_in_strip,
                medicine_details: medicinedetails,
            },
            {headers: {Authorization: "Bearer " + AuthHandler.getLoginToken()}}
        );
    }
    async fetchAllCompanyAccount(){
        await this.checkLogin();

        return await Axios.get(Config.company_account_url, {headers: {Authorization: "Bearer " + AuthHandler.getLoginToken()}});
    }


    async editEmployeeData(name, joining_date, phone, address, id) {
        await this.checkLogin();

        return  await Axios.put(
            Config.employee_api_only + "" + id + "/",
            {
                name: name,
                joining_date: joining_date,
                phone: phone,
                address: address,
            },
            { headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() } }
        );

    }


    async AddEmployeeSalaryData(salary_date, salary_amount, employee_id) {
        await this.checkLogin();
        return  await Axios.post(
            Config.employeeSalaryApiUrl,
            {
                salary_date: salary_date,
                salary_amount: salary_amount,
                employee_id: employee_id,
            },
            { headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() } }
        );


    }

    async AddEmployeeBankData(bank_account_no, ifsc_no, employee_id) {
        await this.checkLogin();
        return  await Axios.post(
            Config.employeeBankApiUrl,
            {
                bank_account_no: bank_account_no,
                ifsc_no: ifsc_no,
                employee_id: employee_id,
            },
            { headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() } }
        );

    }

    async fetchBankEmployee(id) {
        await this.checkLogin();

        return  await Axios.get(Config.employeeBankApiUrlBYID + "" + id, {
            headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
        });

    }

    async fetchSalaryEmployee(id) {
        await this.checkLogin();

        return  await Axios.get(Config.employeeSalaryByIdApiUrl + "" + id, {
            headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
        });

    }

    async fetchEmployeeById(id) {
        await this.checkLogin();

        return  await Axios.get(Config.employee_api_only + "" + id + "/", {
            headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
        });

    }

    async fetchMedicineByName(name){
        if (name!==""){
            await this.checkLogin();
            return await Axios.get(Config.medicineNameApiUrl+" "+name,{
                headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
            });
        }else{
            return {data:[]}
        }
    }

}

export default APIHandler;
