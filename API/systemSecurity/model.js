const mongoose 		  =  require('mongoose');

const blogsSecurity = mongoose.Schema({
	_id 		: mongoose.Schema.Types.ObjectId,
    name 		: String,
    email 	    : String,
    password    : String,
    createdAt 	: Date,
});

module.exports = mongoose.model("users", blogsSecurity);