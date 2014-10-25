var Mogodb   	   = require('../mongodb/connection');

var free_contests  = Mogodb.free_contests;
var ObjectID	   = Mogodb.ObjectID;

// ------------------------------------
// Insert contest
// note: 
// callback:
// ------------------------------------
exports.addContest = function(document, callback){
	free_contests.insert(document, function(errDocument, resDocument){
		callback(null, resDocument);
	});
};