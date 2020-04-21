import React, {Component} from 'react';

const axios = require('axios');

class Form extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: null,
            nic: null,
            gender: null,
            nameValidationError: null,
        };

        this.getName = this.getName.bind(this);
        this.getNic = this.getNic.bind(this);
        this.getGender = this.getGender.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearForm = this.clearForm.bind(this);
    }

    getName(event){
        this.setState({name: event.target.value});
    }

    getNic(event){
        this.setState({nic: event.target.value});
    }

    getGender(event){
        this.setState({gender: event.target.value});
    }

    clearForm(){
        this.setState({name: ''});
        this.setState({nic: ''});
        this.setState({gender: ''});
    }

    validate(){
        var regex = /\b[a-z]+\b/gi;
        return regex.test(this.state.name);
    }

    handleSubmit(){

        var isValid = this.validate();

        if (isValid){
            //add data to the database
            axios.post('http://localhost:5000/user', {
                name: this.state.name,
                nic: this.state.nic,
                gender: this.state.gender
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }else{
            this.setState({nameValidationError: 'Name can be contained alphabetical characters only'});
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} id="details-form">
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Name"
                            value={this.state.name}
                            onChange={this.getName}
                            required
                        />
                        <div style={{color: "red"}}>
                            {this.state.nameValidationError}
                        </div>
                    </div>
                    <div className="form-group">
                        <label>NIC</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="NIC"
                            value={this.state.nic}
                            onChange={this.getNic}
                            required
                        />
                    </div>
                    <div className="from-group">
                        <select name="gender" onChange={this.getGender} value={this.state.gender} required>
                            <option selected="selected" value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        <div className="from-group">
                            <br/>
                            <div className="row">
                                <div className="col-md-2"></div>
                                <div className="col-md-4">
                                    <button
                                        className="btn btn-warning"
                                        type="clear"
                                        onClick={this.clearForm}
                                    >Clear</button>
                                </div>
                                <div className="col-md-4">
                                    <button
                                        className="btn btn-success"
                                        type="submit"
                                    >Add</button>
                                </div>
                                <div className="col-md-2"></div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default Form;