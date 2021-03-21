const mongoose 		  =  require('mongoose');

const todoListSchema = mongoose.Schema({
	_id 		: mongoose.Schema.Types.ObjectId,
    title 		: String,
    subTitle 	: String,
    tags        : String,
    content     : String,
    createdAt 	: Date,
});

module.exports = mongoose.model("todolist", todoListSchema);