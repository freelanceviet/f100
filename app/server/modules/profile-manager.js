var Mogodb   	  = require('../mongodb/connection');


var free_user    	      = Mogodb.free_user;
var ObjectID	          = Mogodb.ObjectID;

// ------------------------------------
// Get list categories
// note: 
// callback: arr list categories
// ------------------------------------
exports.addUser = function(document, callback){
	free_user.insert(document, function(errDocument, resDocument){
		if(resDocument){
			callback(null, resDocument);
		}else{
			callback(null, null);
		}
	});
};