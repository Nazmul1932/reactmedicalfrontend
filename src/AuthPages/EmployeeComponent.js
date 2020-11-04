import React from "react";
import APIHandler from "../utills/APIHandler";


class EmployeeComponent extends React.Component{

    constructor(props) {
        super(props);
        this.formSubmit = this.formSubmit.bind(this);
    }

    state = {
        errorResponse: false,
        errorMessage: "",
        btnMessage: 0,
        sendData: false,
        employee_list: [],
        dataLoaded: false,
    };

    async formSubmit(event){
        event.preventDefault();
        this.setState({ btnMessage: 1 });
        var apiHandler = new APIHandler();
        var response = await apiHandler.saveEmployeeData(
            event.target.name.value, event.target.joining_date.value,
            event.target.phone.value, event.target.address.value
        );

        console.log(response);
        this.setState({ btnMessage: 0 });
        this.setState({ errorRes: response.data.error });
        this.setState({ errorMessage: response.data.message });
        this.setState({ sendData: true });
        this.updateData();
    }

    componentDidMount() {
        this.fetchCompanyEmployeeData();
    }

    async fetchCompanyEmployeeData(){
        this.updateData();

    }
    async updateData(){
        var apiHandler = new APIHandler();
        var employee_data_list = await apiHandler.fetchEmployee();
        this.setState({employee_list:employee_data_list.data.data})
        this.setState({dataLoaded:true});
    }

    viewCompanyDetails=(company_id)=>{
        console.log(company_id);
        console.log(this.props);
        this.props.history.push("/company_details/" +company_id);
    }

    ShowEmpDetails = (eid) => {
        this.props.history.push("/employee_details/" + eid);
    };



    render() {
        return(
            <section className="content">
                <div className="container-fluid">
                    <div className="block-header">
                        <h2>Manage Employee</h2>
                    </div>
                    <div className="row clearfix">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="card">
                                <div className="header">
                                    <h2> Add Company Employee</h2>
                                </div>
                                <div className="body">
                                    <form  onSubmit={this.formSubmit}>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <label htmlFor="email_address">Name</label>
                                                <div className="form-group">
                                                    <div className="form-line">
                                                        <input type="text" id="name" name="name" className="form-control"
                                                               placeholder="Enter Employee Name"/>
                                                    </div>
                                                </div>
                                            </div>



                                            <div className="col-lg-6">
                                                <label htmlFor="email_address">Joining Date</label>
                                                <div className="form-group">
                                                    <div className="form-line">
                                                        <input type="date" id="joining_date" name="joining_date" className="form-control"
                                                               placeholder="Enter Joining Date"/>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-lg-6">
                                                <label htmlFor="email_address">Phone</label>
                                                <div className="form-group">
                                                    <div className="form-line">
                                                        <input type="text" id="phone" name="phone" className="form-control"
                                                               placeholder="Enter Employee Phone No"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <label htmlFor="email_address">Address</label>
                                                <div className="form-group">
                                                    <div className="form-line">
                                                        <input type="text" id="address" name="address" className="form-control"
                                                               placeholder="Enter Employee Address"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <br/>
                                        <button type="submit"
                                                className="btn btn-primary m-t-15 waves-effect btn-block" disabled={this.state.btnMessage !== 0}>
                                            {this.state.btnMessage===0?"Add Company Employee":
                                                "Adding Company Employee please wait..."}
                                        </button>
                                        <br/>

                                        {this.state.errorResponse===false && this.state.sendData===true ?
                                            (
                                                <div className="alert alert-success">
                                                    <strong>Well Done!!</strong> {this.state.errorMessage}
                                                </div>
                                            ):""
                                        }

                                        {this.state.errorResponse===true && this.state.sendData===true ?(
                                            <div className="alert alert-danger">
                                                <strong>OH! Sorry..</strong> {this.state.errorMessage}
                                            </div>
                                        ):""
                                        }
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row clearfix">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="card">
                                <div className="header">
                                    {this.state.dataLoaded===false?(
                                        <div className="text-center">
                                            < div className="preloader pl-size-xl">
                                                <div className="spinner-layer">
                                                    <div className="circle-clipper left">
                                                        <div className="circle"/>
                                                    </div>
                                                    <div className="circle-clipper right">
                                                        <div className="circle"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ):""}
                                    <h2>All Employee</h2>

                                </div>
                                <div className="body table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                        <tr>
                                            <th>#ID</th>
                                            <th>NAME</th>
                                            <th>JOINING DATE</th>
                                            <th>PHONE</th>
                                            <th>ADDRESS</th>
                                            <th>ADDED ON</th>
                                            <th>ACTION</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.employee_list.map((employee)=>
                                            <tr key={employee.id}>
                                                <td>{employee.id}</td>
                                                <td>{employee.name}</td>
                                                <td>{employee.joining_date}</td>
                                                <td>{employee.phone}</td>
                                                <td>{employee.address}</td>
                                                <td>{new Date(employee.added_on).toLocaleString()}</td>
                                                <td><button className="btn btn-block btn-warning"  onClick={() => this.ShowEmpDetails(employee.id)}>View</button></td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default EmployeeComponent;










