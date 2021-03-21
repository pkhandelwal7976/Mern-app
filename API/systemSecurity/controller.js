const { response } = require("express");
const mongoose          	= require("mongoose");
const usersList       		= require('./model.js');


exports.userSignup = (req, res, next)=>{
    console.log("inside controller insideTodoList",req.body)
            const signUpUsers = new usersList ({
                        "_id" 		       : new mongoose.Types.ObjectId(),
                        "name"             : req.body.name,
                        "email"            : req.body.email,
                        "password"         : req.body.password,
                        "createdAt"        : new Date()
            });
            signUpUsers  
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

}

exports.userLogin = (req,res,next) =>{
    usersList.find({email:req.body.email, password:req.body.password})
             .then(data =>{
                 if(data.length>0){
                    res.status(200).json({              
                        message  : "success"
                    })
                 }else{
                    res.status(200).json({                
                        message  : "failure"
                    })
                 }
                 
             })
             .catch(error=>{
                res.status(500).json({
                    error:error,
                    message:"Some error occured while generating User List Data !!"
                })
            })
}