import React from "react";
import APIHandler from "../utills/APIHandler";
import { Link } from 'react-router-dom';




class EditCompanyBankComponents extends React.Component{

    constructor(props) {
        super(props);
        this.formSubmit = this.formSubmit.bind(this);
    }

    state = {
        errorResponse: false,
        errorMessage: "",
        btnMessage: 0,
        sendData: false,
        bank_account_no:"",
        ifsc_no:"",
    };

    async formSubmit(event){
        event.preventDefault();
        this.setState({ btnMessage: 1 });
        var apiHandler = new APIHandler();
        var response = await apiHandler.EditCompanyBankData( event.target.bank_account_no.value,
            event.target.ifsc_no.value, this.props.match.params.company_id,  this.props.match.params.id);
        console.log(response);
        this.setState({ btnMessage: 0 });
        this.setState({ errorRes: response.data.error });
        this.setState({ errorMessage: response.data.message });
        this.setState({ sendData: true });
    }

    componentDidMount() {
        this.fetchCompanyBankDataAll();
    }

    async fetchCompanyBankDataAll(){
        var apiHandler = new APIHandler();
        var companyData = await apiHandler.fetchCompanyBankDetails(this.props.match.params.id);
        console.log(companyData);
        this.setState({bank_account_no: companyData.data.data.bank_account_no})
        this.setState({ifsc_no: companyData.data.data.ifsc_no})

        this.setState({dataLoaded:true});
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

                                    <h2>Edit Company Bank #{this.props.match.params.id}</h2>

                                </div>
                                <div className="body">
                                    <form   onSubmit={this.formSubmit}>

                                        <label htmlFor="email_address">Account No</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text" id="bank_account_no" name="bank_account_no" className="form-control"
                                                       placeholder="Enter Company Account No" defaultValue={this.state.bank_account_no}/>
                                            </div>
                                        </div>

                                        <label htmlFor="email_address">IFSC No</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text" id="ifsc_no" name="ifsc_no" className="form-control"
                                                       placeholder="Enter Company IFSC No" defaultValue={this.state.ifsc_no}/>
                                            </div>
                                        </div>



                                        <br/>
                                        <button type="submit"
                                                className="btn btn-primary m-t-15 waves-effect btn-block" disabled={this.state.btnMessage !== 0}>
                                            {this.state.btnMessage===0?"Edit Company Bank":"Editing company Bank please wait..."}
                                        </button>
                                        <br/>

                                        {this.state.errorResponse===false && this.state.sendData===true ?
                                            (
                                                <div className="alert alert-success">
                                                    <strong>Well Done!!</strong> {this.state.errorMessage}
                                                    <Link to={"/company_details/"+ this.props.match.params.id} className="btn btn-info">Back to company details</Link>
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

export default EditCompanyBankComponents;










