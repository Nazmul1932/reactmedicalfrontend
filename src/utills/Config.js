class Config{
    static loginUrl=" http://127.0.0.1:8000/api/gettoken/";
    static refreshUrl = " http://127.0.0.1:8000/api/refresh_token/";
    static companyUrl = " http://127.0.0.1:8000/api/company/";
    static companyBankUrl = " http://127.0.0.1:8000/api/companybank/";
    static company_account_url = " http://127.0.0.1:8000/api/company_account/";
    static company_only = " http://127.0.0.1:8000/api/company_only/";
    static employee_api_only = " http://127.0.0.1:8000/api/company_employee/";
    static medicineApiUrl = " http://127.0.0.1:8000/api/medicine/";
    static homeUrl = "/home";
    static logoutUrl = "/logout";

    static sidebarItem = [
        { index: "0", title: "Home", url: "/home", icons: "home" },
        { index: "1", title: "Company", url: "/company", icons: "assessment" },
        { index: "2", title: "Medicine", url: "/add_medicine", icons: "assessment" },
        { index: "3", title: "Manage Medicine", url: "/manage_medicine", icons: "assessment" },
        { index: "4", title: "Manage Company Account", url: "/manage_company_account", icons: "assessment" },
        { index: "5", title: "Manage Company Employee", url: "/employee_manage", icons: "assessment" },
    ];
}

export default Config;