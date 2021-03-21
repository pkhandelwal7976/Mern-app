const express 	= require('express');
const router 	= express.Router();

const userListController = require("./controller.js");


router.post('/post', 	               userListController.userSignup);
router.post('/auth/login', 	               userListController.userLogin);
// router.get('/get/list',                 todoListController.todoListData);
// router.get('/get/one/:_id',             todoListController.todoListOneData);
// router.get('/get/list/:tags',           todoListController.getPostsByTag);
// router.delete('/delete/:_id',           todoListController.deleteOneTodoData);

module.exports = router;
