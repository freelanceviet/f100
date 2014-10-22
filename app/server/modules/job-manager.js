var Mogodb   	  = require('../mongodb/connection');

var free_jobs	          = Mogodb.free_jobs;
var ObjectID	          = Mogodb.ObjectID;

// ------------------------------------
// Get list categories
// note: 
// callback: arr list categories
// ------------------------------------
exports.addJob = function(document, callback){
	free_jobs.insert(document, function(errDocument, resDocument){
		callback(null, resDocument);
	});
};