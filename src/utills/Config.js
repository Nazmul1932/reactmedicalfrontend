class Config{
    static loginUrl=" http://127.0.0.1:8000/api/gettoken/";
    static homeUrl = "/home";

    static sidebarItem = [
        { index: "0", title: "Home", url: "/home", icons: "home" },
        { index: "1", title: "Company", url: "/company", icons: "assessment" },
        // {
        //     index: "2",
        //     title: "Add Medicine",
        //     url: "/addMedicine",
        //     icons: "assessment",
        // },
        // {
        //     index: "3",
        //     title: "Manage Medicine",
        //     url: "/manageMedicine",
        //     icons: "assessment",
        // },
        // {
        //     index: "4",
        //     title: "Manage Company Account",
        //     url: "/manageCompanyAccount",
        //     icons: "assessment",
        // },
        // {
        //     index: "5",
        //     title: "Manage Employee",
        //     url: "/employeeManage",
        //     icons: "assessment",
        // },
    ];
}

export default Config;