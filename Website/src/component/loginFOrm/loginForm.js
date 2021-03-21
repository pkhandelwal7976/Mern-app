import React, { Component } from 'react';
import "./loginForm.css";
import Axios from 'axios';
import Swal  from 'sweetalert2';

export default class loginForm extends Component {

    constructor(props) {
        super(props);
            this.state = {
                email           : "",
                password        : "",
                errors          : {},
                isValid     : false

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
        this.setState({
          errors: errors
        });
        return isValid;
    }  
  

    logIn(event){
        event.preventDefault();
        if(this.validate()){
            var fomvalues = {
                email           : this.state.email,
                password        : this.state.password,
            }
            Axios.post('http://localhost:3003/api/auth/login', fomvalues)
                .then((response) => {
                    console.log("response:==>",response)
                    if(response.data.message==="success"){
                            this.props.history.push("/blog-list")
                    }else{
                        Swal.fire("Sorry !","Please Enter Valid UserId or Password","warning");
                    }
                })
                .catch(error =>{
                    Swal.fire("Sorry !","Please Enter Valid UserId or Password","warning");
                })
        }
    }



    render() {
        return (
            <div className="col-lg-12 loginFormWrapper">
                <div className="loginForm col-lg-4 col-lg-offset-4">
                <h3 className="heading">Login Form</h3>
                <hr/>
                    <form className=" input-group-mb-0">
                        <div className="col-lg-12 col-md-12">
                            <div className="col-lg-12 col-md-12 input-group mt60">
                                <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                                <input id="email" type="email" className="form-control" name="email" placeholder="User Name" onChange  = {this.emailHandleChange.bind(this)} required/>
                            </div>
                           
                            <div className="text-danger">{this.state.errors  ? this.state.errors.email : '' || !this.state.isValid ? <p>Enter Valid Email</p>:"" }</div>    

                            <div className="input-group col-lg-12 col-md-12">
                                <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
                                <input id="password" type="password" className="form-control" name="password" placeholder="Password" onChange  = {this.handleChange.bind(this)} required/>
                            </div>
                            <div className="text-danger">{this.state.errors ? this.state.errors.password : ''}</div>    

                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 button padZero">
                                <button type="button" className="col-lg-3 pull-right btn btn-primary loginbutton boldFont" onClick={this.logIn.bind(this)}>Login</button>
                                <a href="/signup-form"><button type="button" className="col-lg-3 pull-left btn btn-primary loginbutton boldFont">Sign Up</button></a>
                            </div> 
                        </div> 
                    </form>
                </div>
                
            </div>
        )
    }
}
