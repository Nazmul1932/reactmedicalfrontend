import React from "react";
import APIHandler from "../utills/APIHandler";


class CompanyComponent extends React.Component{

    constructor(props) {
        super(props);
        this.formSubmit = this.formSubmit.bind(this);
    }

    state = {
        errorResponse: false,
        errorMessage: "",
        btnMessage: 0,
        sendData: false,
        companyDataList: [],
        dataLoaded: false,
    };

    async formSubmit(event){
        event.preventDefault();
        this.setState({ btnMessage: 1 });
        var apiHandler = new APIHandler();
        var response = await apiHandler.saveCompanyData(event.target.name.value, event.target.license_no.value, event.target.address.value,
            event.target.contact_no.value,  event.target.email.value, event.target.description.value);
        console.log(response);
        this.setState({ btnMessage: 0 });
        this.setState({ errorRes: response.data.error });
        this.setState({ errorMessage: response.data.message });
        this.setState({ sendData: true });
    }

    render() {
        return(
            <section className="content">
                <div className="container-fluid">
                    <div className="block-header">
                        <h2>Manage Company</h2>
                    </div>
                    <div className="row clearfix">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="card">
                                <div className="header">
                                    <h2>
                                        Add Company
                                    </h2>

                                </div>
                                <div className="body">
                                    <form   onSubmit={this.formSubmit}>

                                        <label htmlFor="email_address">Name</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text" id="name" name="name" className="form-control"
                                                       placeholder="Enter Company Name"/>
                                            </div>
                                        </div>

                                        <label htmlFor="email_address">License No</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text" id="license_no" name="license_no" className="form-control"
                                                       placeholder="Enter Company License No"/>
                                            </div>
                                        </div>

                                        <label htmlFor="email_address">Address</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text" id="address" name="address" className="form-control"
                                                       placeholder="Enter Company Address"/>
                                            </div>
                                        </div>

                                        <label htmlFor="email_address">Contact No</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text" id="contact_no" name="contact_no" className="form-control"
                                                       placeholder="Enter Company Contact No"/>
                                            </div>
                                        </div>

                                        <label htmlFor="email_address">Email</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text" id="email" name="email" className="form-control"
                                                       placeholder="Enter Company Email"/>
                                            </div>
                                        </div>

                                        <label htmlFor="email_address">Description</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text" id="description" name="description" className="form-control"
                                                       placeholder="Enter Company Description"/>
                                            </div>
                                        </div>


                                        <br/>
                                        <button type="submit"
                                                className="btn btn-primary m-t-15 waves-effect btn-block" disabled={this.state.btnMessage !== 0}>
                                            {this.state.btnMessage===0?"Add Company":"Adding company please wait..."}
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
                </div>
            </section>
        );
    }
}

export default CompanyComponent;










