const { response } = require("express");
const mongoose          	= require("mongoose");
const todoList       		= require('./model.js');


exports.insertTodoList = (req, res, next)=>{
    console.log("inside controller insideTodoList",req.body)
        if (req.body.type === "Submit") {
            const todoListData = new todoList ({
                        "_id" 		       : new mongoose.Types.ObjectId(),
                        "title"            : req.body.title,
                        "subTitle"         : req.body.subTitle,
                        "tags"             : req.body.tags,
                        "content"          : req.body.content,
                        "createdAt"        : new Date()
            });
            todoListData  
                        .save()
                        .then((Data)=>{
                            res.status(200).json({
                                data   : Data,
                                message: "Data inserted !!!"
                            });
                        })
                        .catch((error)=>{
                            res.status(500).json({
                                error : error,
                                message: "Some problem occured while insertion"
                            });
                        });
        }else{
            todoList
                    .updateOne(
                        {"_id":req.body._id},
                        {$set : {
                            "title"            : req.body.title,
                            "subTitle"         : req.body.subTitle,
                            "tags"             : req.body.tags,
                            "content"          : req.body.content,
                            "createdAt"        : new Date()
                        }}
                    )
                    .then((data)=>{
                        console.log("data after update = ",data);
                        res.status(200).json({
                            "message": "Data Updated Successfully",
                        });
                    })
                    .catch((error)=>{
                        console.log("error while updating Data = ", error);
                        res.status(500).json({
                            "message" : "Some error occured while updating Data",
                            "error"   : error
                        })
                    });
        }

}

exports.todoListData = (req, res, next)=>{
    todoList.find({})
            .sort({"createdAt" : -1})
            .then(TodoListData =>{
                res.status(200).json({
                    TodoListData : TodoListData,
                    message      : "Todo List Generated !!"
                })
            })
            .catch(error=>{
                res.status(500).json({
                    error:error,
                    message:"Some error occured while generating Todo List Data !!"
                })
            })
}

exports.todoListOneData = (req, res, next)=>{
    console.log("req.parms delete",req.params)
    todoList.findOne({"_id":req.params._id})
            .then(data =>{
                res.status(200).json({
                    data : data,
                    message: "Find One Data successfully" 
                })
            })
            .catch(error=>{
                res.status(500).json({
                    error:error,
                    message:"Some error occured while generating  Data !!"
                })
            })
}

exports.deleteOneTodoData = (req,res,next)=>{
    console.log("req.parms delete",req.params)
    todoList.deleteOne({"_id":req.params._id})
            .then(data =>{
                res.status(200).json({
                    data : data,
                    message: "Data deleted successfully" 
                })
            })
            .catch(error=>{
                res.status(500).json({
                    error : error,
                    message : "Some issue occurred while deleting Data!"
                })
            })
}


exports.getPostsByTag = (req,res,next) =>{
    console.log("getPostsByTag -> ",req.params);
    todoList.find({"tags" : req.params.tags})
            .then(TodoListData =>{
                res.status(200).json({
                    TodoListData : TodoListData,
                    message      : "Todo List Generated !!"
                })
            })
            .catch(error =>{
                res.status(500).json({
                    error : error,
                    message : "Some issue Occcure While find Data"
                })
            })
}

exports.getTags = (req,res,next) =>{
        todoList.aggregate( [ { $project : { tags : 1  } } ] )
            .then(tags =>{
                console.log("tags TodoListData -> ",tags);
                res.status(200).json({
                    data : tags,                   
                })
            })
            .catch(error =>{
                res.status(500).json({
                    error : error,
                    message : "Some issue Occcure While find Data"
                })
            })
}

// exports.getPostsByTag=(req,res,next) =>{
//     todoList.find({tags : })
//             .then(postTagsData => {
//                 res.status(200).json({
//                     postTagsData : postTagsData,
//                     message      : "Tags Data Available"   
//                 })
//             })
//             .catch(error =>{
//                 res.status(500).json({
//                     error : error,
//                     message : "Some issue Occure While Find tags"
//                 })
//             })
// }