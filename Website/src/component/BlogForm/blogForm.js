import React, { Component } from 'react'
import './blogForm.css';

import Axios            from 'axios';
import swal             from 'sweetalert';

export default class blogForm extends Component {

    constructor(props) {
        super(props);
            this.state = {
                title           : "",
                subTitle        : "",
                tags            : "",
                content         : "",
                errors          : {},
                type            : "Submit",
                isValid     : false

            };
    }

    componentDidMount(){
        var id = this.props.match.params.id;
        console.log("id",id);
        if(id){
            this.getOneData(id);
        }
    }
    handleChange = (event)=>{
        var name = event.currentTarget.name;
        var value = event.currentTarget.value;              
        this.setState({ [name] : value}
        ); 
    }
    validate(){
        let input = this.state;
        console.log("input", input);
        let errors = {};
        let isValid = true;
        if (!input["title"]) {
          isValid = false;
          errors["title"] = "Please Enter Title";
        }
        if (!input["subTitle"]) {
          isValid = false;
          errors["subTitle"] = "Please Enter Sub Title";
        }
        if (!input["tags"]) {
            isValid = false;
            errors["tags"] = "Please Enter Tag";
        }
        if (!input["content"]) {
            isValid = false;
            errors["content"] = "Please Enter content";
        }
        this.setState({
          errors: errors
        });
        return isValid;
    }

    handleSubmit = (event) =>{
        event.preventDefault();
        if(this.validate()){
        
            var formValues = {
                title    : this.state.title,
                subTitle : this.state.subTitle,
                tags     : this.state.tags,
                content  : this.state.content,
                type     : "Submit"
            }
            console.log(formValues)
                Axios.post('http://localhost:3003/api/todo/post',formValues)
                .then((response) => {
                    console.log("response => ",response);
                    swal("Congrats!","Blog Post SuccessFully","success");
                    this.props.history.push("/blog-list")
                })
                .catch(error =>{
                    swal("Sorry!","Something Wrong","warning");
                })
        }
    }
    getOneData(id){
        Axios.get('http://localhost:3003/api/todo/get/one/'+id)
        .then((response) => {
            console.log("response => ",response);
            this.setState({
                title    : response.data.data.title,
                subTitle : response.data.data.subTitle,
                tags     : response.data.data.tags,
                content  : response.data.data.content,
                type     : "Update" 
            },()=>{
                
            })
        })
        .catch(error =>{
            swal("Sorry!","Somethig Wrong "+ error  ,"warning");
        })
    }

    handleUpdate = (event) =>{
        var id = this.props.match.params.id;
        if(this.validate()){
            var formValues = {
                title    : this.state.title,
                subTitle : this.state.subTitle,
                tags     : this.state.tags,
                content  : this.state.content,
                _id      : id,
                type     : "Update"
            }
            console.log(formValues)
                Axios.post('http://localhost:3003/api/todo/post',formValues)
                .then((response) => {
                    console.log("response => ",response);
                    swal("Congrats!","Blog Update SuccessFully","success");
                    this.props.history.push("/blog-list")

                })
                .catch(error =>{
                    swal("Sorry!","Something Wrong","warning");
                })
        }
    }
    render() {
        return (
            <div>
                <div className="BlogWrapper container-fluid">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="col-lg-4 col-lg-offset-4 col-md-6 col-md-offset-3 col-sm-12 col-xs-12 blogFormWrapper">
                            <div className="blogHeading"> 
                                <h3 className="boldFont text-center">Blog Form</h3>
                            </div>
                            <hr/>
                            <form>
                                <div className="input-group-mb-0">  
                                        <div className="col-lg-12 col-md-12">
                                            <div className="input-group">
                                                <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                                                <input id="title" type="text" className="form-control" name="title" placeholder="Title" onChange= {this.handleChange.bind(this)} required
                                                    value= {this.state.title}
                                                />
                                            </div>
                                            <div className="text-danger">{this.state.errors ? this.state.errors.title : ''}</div>
                                        </div>
                                        <div className="col-lg-12 col-md-12">
                                            <div className="input-group">
                                                <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                                                <input id="subTitle" type="text" className="form-control" name="subTitle" placeholder="Sub Title" onChange= {this.handleChange.bind(this)} required
                                                    value= {this.state.subTitle}
                                                />
                                            </div>
                                            <div className="text-danger">{this.state.errors ? this.state.errors.subTitle : ''}</div>
                                        </div>
                                        <div className="col-lg-12 col-md-12">
                                            <div className="input-group">
                                                <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                                                <input id="tags" type="text" className="form-control" name="tags" placeholder="Tags" onChange= {this.handleChange.bind(this)} required
                                                    value= {this.state.tags}
                                                />
                                            </div>
                                            <div className="text-danger">{this.state.errors ? this.state.errors.tags : ''}</div>
                                        </div>
                                        <div className="col-lg-12 col-md-12">
                                            <div className="input-group">
                                                <textarea id="content" type="text" className="form-control" rows="2" cols="50" maxlength="200" name="content" placeholder="Content" onChange= {this.handleChange.bind(this)} required
                                                    value= {this.state.content}
                                                />
                                            </div>
                                            <div className="text-danger">{this.state.errors ? this.state.errors.content : ''}</div>
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 button mt30">
                                            {
                                                this.state.type === "Submit"
                                                ?
                                                    <button type="button" className="col-lg-3 pull-left btn btn-primary loginbutton boldFont" onClick={this.handleSubmit}>{this.state.type}</button>
                                                :
                                                    <button type="button" className="col-lg-3 pull-left btn btn-primary loginbutton boldFont" onClick={this.handleUpdate}>{this.state.type}</button>
                                            }
                                        </div>  
                                    </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
