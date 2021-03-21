import React, { Component } from 'react'
import './getList.css';

import Axios from 'axios';
import swal  from 'sweetalert';


export default class getList extends Component {

    constructor(props) {
        super(props);
            this.state = {
                getAllBlogs : [],
                getPostsByTag  : []
            };
    }


    componentDidMount(){
        this.getList();
        this.getTags();
    }



    getList(){
        Axios.get('http://localhost:3003/api/todo/get/list')
        .then((response) => {
            console.log("response => ",response);
            console.log("response.data.TodoListData.tags => ",response.data.TodoListData);
            this.setState({
                getAllBlogs   : response.data.TodoListData,
                // getPostsByTag : response.data.TodoListData

            },()=>{
            })
        })
        .catch(error =>{
            // Swal.fire("Sorry!","Please Enter Valid UserId or Password","warning");
        })
    }

    getTags (){
        Axios.get('http://localhost:3003/api/todo/get/tags')
        .then((response) => {
            console.log("response => ",response.data.data);
            this.setState({
                getPostsByTag : response.data.data
            },()=>{
            })
        })
        .catch(error =>{
            // Swal.fire("Sorry!","Please Enter Valid UserId or Password","warning");
        })
    }


    handleDelete(event){
    	event.preventDefault();
    	var id = event.currentTarget.id;
    	console.log("id", id);
    	swal({
            title: "Are you sure you want to delete Task?",
            text: "Once deleted, you will not be able to recover this task!",
            // icon: "warning",
            dangerMode: true ,
            buttons: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                Axios.delete("http://localhost:3003/api/todo/delete/"+id)
		            .then(response =>{
		                swal("Task has been deleted successfully");
						this.getList()
		            })
		            .catch(error=>{
		                swal("Some Error Occured while deleting the  list",error.message,"error");
		        })
             
            }else {
              swal("Your Data is safe!");
            }
          });
    }

    handleSearchbyFilter(event){
    	event.preventDefault();
        var value = event.currentTarget.value;
        console.log(value);
        if(value == "all"){
            this.getList()
        }else{
            Axios.get('http://localhost:3003/api/todo/get/list/'+value )
            .then((response) => {
                console.log("response => ",response);
                this.setState({
                    getAllBlogs : response.data.TodoListData
                },()=>{
                })
            })
            .catch(error =>{
                swal("Sorry!","Something Is Wrong"+  error ,"warning");
            })
        }
    }



    render() {
        return (
            <div className="">
                <div className="col-lg-12 blogListWrapper">   
                    <div className="col-lg-8 col-lg-offset-2 GetlistWrapper">
                        <div className="col-lg-12 noPadding Heading">
                            <div className="col-lg-4 ">
                                <h3 className="boldFont  ">Blog List</h3>
                            </div>
                            <div className="col-lg-4 ">
                                <div className="row">
                                    <select id="tagId" className="form-control mt20" name="tagId" ref="tagId" onChange={this.handleSearchbyFilter.bind(this)}>
                                        <option value="all" >-- Select --</option>
                                        {
                                            this.state.getPostsByTag && this.state.getPostsByTag.length > 0 
                                            ?
                                                this.state.getPostsByTag.map((data,index)=>{
                                                    return(
                                                        <option value={data.tags} >{data.tags}</option>
                                                    )
                                                })
                                            :
                                                ""
                                        }
                                    </select>
                                </div>  
                            </div>
                            <div className="col-lg-4 ">
                                <a href="/blog-Form"><div className="btn btn-primary boldFont btnheight pull-right">Add Blogs</div></a>
                            </div> 
                        </div>
                        <hr/>  
                        <table class="table table-bordered">
                            <thead>
                                <tr className="">
                                    <th>Sr#</th>
                                    <th>Title</th>
                                    <th>Sub Title</th>
                                    <th>Tags</th>
                                    <th>Content</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.getAllBlogs && this.state.getAllBlogs.length > 0 
                                ?
                                    this.state.getAllBlogs.map((data,index)=>{
                                        return(
                                            <tr key={index}>
                                                <td>{index+1}</td>
                                                <td>{data.title}</td>
                                                <td>{data.subTitle}</td>
                                                <td>{data.tags}</td>
                                                <td>{data.content}</td>
                                                <td>
                                                    <a href={"/blog-Form/"+data._id}><i   className="fa fa-edit pointer pull-left" title="Edit"></i></a>
                                                    <div id={data._id} onClick={this.handleDelete.bind(this)}><i   className="fa fa-trash  pointer pull-right"  title="Delete"></i></div>
                                                
                                                </td>
                                            </tr>
                                        )
                                    })
                                : <div>Data Not Available</div>
                            }     
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
    
        )
    }
}
