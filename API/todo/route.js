const express 	= require('express');
const router 	= express.Router();

const todoListController = require("./controller.js");


router.post('/post', 	                todoListController.insertTodoList);
router.get('/get/list',                 todoListController.todoListData);
router.get('/get/tags',                 todoListController.getTags);
router.get('/get/one/:_id',             todoListController.todoListOneData);
router.get('/get/list/:tags',           todoListController.getPostsByTag);
router.delete('/delete/:_id',           todoListController.deleteOneTodoData);

module.exports = router;
