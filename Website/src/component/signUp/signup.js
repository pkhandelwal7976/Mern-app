import React, { Component } from 'react'
import './signup.css'
import Axios from 'axios';
import Swal  from 'sweetalert2';

export default class signup extends Component {

    constructor(props) {
        super(props);
            this.state = {
                fullName         : "",
                email           : "",
                password        : "",
                errors          : {},
                isValid         : false

            };
    }

    handleChange = (event)=>{
        var name = event.currentTarget.name;
        var value = event.currentTarget.value;              
        this.setState({ [name] : value}
        ); 
    }
    emailHandleChange = (event) =>{
        var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(event.target.value.match(regex)){
            this.setState({
                [event.target.name]:event.target.value,
                isValid:true
            })
        }else{
            this.setState({
                [event.target.name]:event.target.value,
                isValid:false
            })
        }
    }

    validate(){
        let input = this.state;
        console.log("input", input);
        let errors = {};
        let isValid = true;
        if (!input["password"]) {
          isValid = false;
          errors["password"] = "Please Enter Password";
        }
        if (!input["email"]) {
          isValid = false;
          errors["email"] = "Please Enter email";
        }
        if (!input["fullName"]) {
            isValid = false;
            errors["fullName"] = "Please Enter Full Name";
        }

        this.setState({
          errors: errors
        });
        return isValid;
    }  
    handleSubmit (event){
        event.preventDefault();
        var fomvalues = {
            name            : this.state.fullName,
            email           : this.state.email,
            password        : this.state.password,
        }
        console.log(fomvalues)
        Axios.post('http://localhost:3003/api/post', fomvalues)
            .then((response) => {
                console.log("response:==>",response.data.data)
                Swal.fire("Congrats !","Data submitted SuccessFully","success");
                this.props.history.push("/");
            })
            .catch(error =>{
                Swal.fire("Sorry !", error,"warning");
            })

    }


    render() {
        return (
            <div className="signUpWrapper container-fluid">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                    <div className="col-lg-5 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-12 col-xs-12">
                        <div className="signUpForm"> 
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                <h3 className="boldFont text-left">Signup Form</h3>
                                <hr/>
                            </div>
                            <div className="col-lg-12 col-md-12">
                                <form className=" input-group-mb-0">
                                    <div className="col-lg-12 col-md-12">
                                        <div className="col-lg-12 col-md-12 input-group mt60">
                                            <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                                            <input id="fullName" type="text" className="form-control" name="fullName" placeholder="Full Name" onChange  = {this.handleChange.bind(this)} required/>
                                        </div>
                                        <div className="text-danger text-left pull-left">{this.state.errors  ? this.state.errors.email : '' || !this.state.isValid ? <p>Enter Valid Email</p>:"" }</div>    
                                        
                                        <div className="col-lg-12 col-md-12 input-group">
                                            <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                                            <input id="email" type="email" className="form-control" name="email" placeholder="User Email" onChange  = {this.emailHandleChange.bind(this)} required/>
                                        </div>
                                        <div className="text-danger">{this.state.errors  ? this.state.errors.email : '' || !this.state.isValid ? <p>Enter Valid Email</p>:"" }</div>    

                                        <div className="input-group col-lg-12 col-md-12">
                                            <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
                                            <input id="password" type="password" className="form-control" name="password" placeholder="Password" onChange  = {this.handleChange.bind(this)} required/>
                                        </div>
                                        <div className="text-danger">{this.state.errors ? this.state.errors.password : ''}</div>    
                                        
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 button padZero">
                                            <a href="/"><button type="button" className="col-lg-3 pull-left btn btn-primary loginbutton boldFont">Login</button></a>
                                            <button type="button" className="col-lg-3 pull-right btn btn-primary loginbutton boldFont"onClick={this.handleSubmit.bind(this)}>Signup</button>
                                        </div>     
                                    </div> 
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
