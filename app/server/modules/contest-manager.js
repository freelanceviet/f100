var Mogodb   	   = require('../mongodb/connection');

var free_contests  = Mogodb.free_contests;
var free_comments  = Mogodb.free_comments;
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
// -------------------------------------
// Get list contest default
// note: 
// -------------------------------------
exports.getContestDefault = function(limit, skip, callback){
	free_contests.find({})
	.limit(parseInt(limit))
	.skip(parseInt(skip))
	.sort([['date_spam', 'desc']])
	.toArray(function(err, items)
	{
		callback(null,items);
	});
};
// ------------------------------------
// Get item job with id
// note: 
// ------------------------------------
exports.getItemContest = function(id, callback){
	free_contests.findOne({_id:new ObjectID(id)}, function(errItemContest, resItemContest){
		if(resItemContest){
			callback(null,resItemContest);
		}else{
			callback(null,null);
		}
	});
};
// ------------------------------------
// Update avatar image of contest
// note: 
// ------------------------------------
exports.updateAvatarContest = function(id, docImage, callback){
	free_contests.update({_id:new ObjectID(id)}, {$set: {image_avatar:docImage}}, {multi:true}, function(err) {
		callback(null, null);
	});
};

// ------------------------------------
// Update banner image of contest
// note: 
// ------------------------------------
exports.updateBannerContest = function(id, docImage, callback){
	free_contests.update({_id:new ObjectID(id)}, {$set: {image_banner:docImage}}, {multi:true}, function(err) {
		callback(null, null);
	});
};

// ------------------------------------
// Insert comment of contest
// note: 
// ------------------------------------
exports.insertCommentContest = function(document, callback){
	free_comments.insert(document, function(errDocument, resDocument){
		callback(null, resDocument);
	});
};

// ------------------------------------
// Get list comment of contest with id contest
// note: 
// ------------------------------------
exports.getListCommentContest = function(id, limit, skip, callback){
	free_comments.find({{_id:new ObjectID(id)})
	.limit(parseInt(limit))
	.skip(parseInt(skip))
	.sort([['time_sort', 'asc']])
	.toArray(function(err, items)
	{
		callback(null,items);
	});
};

