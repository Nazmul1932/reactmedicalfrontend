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
        companyAccountData: [],
        dataLoaded: false,
        companylist: [],
    };

    async formSubmit(event){
        event.preventDefault();
        this.setState({ btnMessage: 1 });
        var apiHandler = new APIHandler();
        var response = await apiHandler.saveCompanyTransactionData(
            event.target.company_id.value, event.target.transaction_type.value,
            event.target.transaction_amt.value, event.target.transaction_date.value,  event.target.payment_mode.value
        );

        console.log(response);
        this.setState({ btnMessage: 0 });
        this.setState({ errorRes: response.data.error });
        this.setState({ errorMessage: response.data.message });
        this.setState({ sendData: true });
        this.updateAccountData();
    }

    componentDidMount() {
        this.fetchCompanyAccountData();
    }

    async fetchCompanyAccountData(){
        var apiHandler = new APIHandler();
        var companyData = await apiHandler.fetchCompanyOnly();
        this.updateAccountData();
        this.setState({companylist: companyData.data})
        this.setState({dataLoaded:true});
    }

    viewCompanyDetails=(company_id)=>{
        console.log(company_id);
        console.log(this.props);
        this.props.history.push("/company_details/" +company_id);
    }

    async updateAccountData(){
        var apiHandler = new APIHandler();
        var companyAccountData = await apiHandler.fetchAllCompanyAccount();
        this.setState({companyAccountData:companyAccountData.data.data})
    }

    render() {
        return(
            <section className="content">
                <div className="container-fluid">
                    <div className="block-header">
                        <h2>Manage Company Account</h2>
                    </div>
                    <div className="row clearfix">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="card">
                                <div className="header">
                                    <h2> Add Company Account Bill</h2>
                                </div>
                                <div className="body">
                                    <form   onSubmit={this.formSubmit}>
                                        <div className="row">
                                            <div className="col-lg-4">
                                                <label htmlFor="email_address">Company</label>
                                                <div className="form-group">
                                                    <div className="form-line">
                                                        <select
                                                            className="form-control show-tick"
                                                            name="company_id"
                                                            id="company_id"
                                                        >
                                                            {this.state.companylist.map((item) => (
                                                                <option key={item.id} value={item.id}  selected={
                                                                    item.id === this.state.company_id
                                                                }>
                                                                    {item.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-lg-4">
                                                <label htmlFor="email_address">Transaction Type</label>
                                                <div className="form-group">
                                                    <div className="form-line">
                                                        <select
                                                            id="transaction_type"
                                                            name="transaction_type"
                                                            className="form-control"
                                                        >
                                                            <option value="1">Debit</option>
                                                            <option value="2">Credit</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-lg-4">
                                                <label htmlFor="email_address">Transaction Amount</label>
                                                <div className="form-group">
                                                    <div className="form-line">
                                                        <input type="text" id="transaction_amt" name="transaction_amt" className="form-control"
                                                               placeholder="Enter Transaction Amount"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="row">
                                            <div className="col-lg-4">
                                                <label htmlFor="email_address">Transaction Date</label>
                                                <div className="form-group">
                                                    <div className="form-line">
                                                        <input type="date" id="transaction_date" name="transaction_date" className="form-control"
                                                               placeholder="Enter Transaction Date"/>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-lg-4">

                                                <label htmlFor="email_address">Payment Mode</label>
                                                <div className="form-group">
                                                    <div className="form-line">
                                                        <input type="text" id="payment_mode" name="payment_mode" className="form-control"
                                                               placeholder="Enter Payment Mode"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <br/>
                                        <button type="submit"
                                                className="btn btn-primary m-t-15 waves-effect btn-block" disabled={this.state.btnMessage !== 0}>
                                            {this.state.btnMessage===0?"Add Company Transaction":
                                                "Adding Company Transaction please wait..."}
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
                                    <h2>
                                        All Companies Account Transactions
                                    </h2>

                                </div>
                                <div className="body table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                        <tr>
                                            <th>#ID</th>
                                            <th>COMPANY ID</th>
                                            <th>COMPANY NAME</th>
                                            <th>TRANSACTION TYPE</th>
                                            <th>TRANSACTION AMOUNT</th>
                                            <th>DATE</th>
                                            <th>PAYMENT MODE</th>
                                            <th>ADDED ON</th>
                                            <th>ACTION</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.companyAccountData.map((company_account)=>
                                            <tr key={company_account.id}>
                                                <td>{company_account.id}</td>
                                                <td>{company_account.company.id}</td>
                                                <td>{company_account.company.name}</td>
                                                <td>
                                                    {company_account.transaction_type === 1
                                                        ? "Debit"
                                                        : "Credit"}
                                                </td>
                                                <td>{company_account.transaction_amt}</td>
                                                <td>{company_account.transaction_date}</td>
                                                <td>{company_account.payment_mode}</td>
                                                <td>{new Date(company_account.added_on).toLocaleString()}</td>
                                                <td>
                                                    <button className="btn btn-block btn-warning" onClick={()=>this.viewCompanyDetails(company_account.id)}>
                                                        View
                                                    </button>
                                                </td>
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










