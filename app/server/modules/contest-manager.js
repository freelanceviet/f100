var Mogodb   	   = require('../mongodb/connection');

var free_contests  = Mogodb.free_contests;
var free_comments  = Mogodb.free_comments;
var free_proposals = Mogodb.free_proposals;
var free_likes     = Mogodb.free_likes;
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
	free_comments.find({id_object:id})
	.limit(parseInt(limit))
	.skip(parseInt(skip))
	.sort([['time_sort', 'asc']])
	.toArray(function(err, items)
	{
		callback(null,items);
	});
};

// ------------------------------------
// Insert proposal
// note: 
// ------------------------------------
exports.insertProposal = function(document, callback){
	free_proposals.insert(document, function(errDocument, resDocument){
		if(resDocument){
			callback(null, resDocument);
		}else{
			callback(null, null);
		}
	});
};

// ------------------------------------
// Get list comment of contest with id contest
// note: 
// ------------------------------------
exports.getListProposalContest = function(id, limit, skip, callback){
	free_proposals.find({project_id:id})
	.limit(parseInt(limit))
	.skip(parseInt(skip))
	.sort([['date_spam', 'asc']])
	.toArray(function(err, items)
	{
		callback(null,items);
	});
};

// ------------------------------------
// Update status of contest when uer select COD payment
// note: 
// ------------------------------------
exports.updateStatusContest = function(id, status, callback){
	free_contests.update({_id:new ObjectID(id)}, {$set: {status:status}}, {multi:true}, function(err) {
		callback(null, null);
	});
};

// ------------------------------------
// Update status proposal of contest
// note: 
// ------------------------------------
exports.updateStateProposalModel = function(id_proposal, status, callback){
	free_proposals.update({_id:new ObjectID(id_proposal)}, {$set: {winner:status}}, {multi:true}, function(err) {
		callback(null, null);
	});
};

// ------------------------------------
// Count all proposals
// note: 
// callback: num of proposal
// ------------------------------------
exports.countAllProposals = function(id_contest, callback){
	free_proposals.find({project_id:id_contest}).count(
		function(err, result) {
			callback(null,result);
		}
	);
};

// ------------------------------------
// Get proposal
// note: 
// callback: object
// ------------------------------------
exports.getProposalId = function(id, callback){
	free_proposals.findOne({_id:new ObjectID(id)}, function(errItem, resItem){
		if(resItem){
			callback(null,resItem);
		}else{
			callback(null,null);
		}
	});
};

// ------------------------------------
// Put comment for proposal
// note: 
// callback: object
// ------------------------------------
exports.pushCommentForProposal = function(id_proposal,  document, callback){
	free_proposals.update({_id:new ObjectID(id_proposal)}, {$push: {list_comment:document}}, {multi:true}, function(errItem,resItem) {
		free_proposals.update(
			{ _id : new ObjectID(id_proposal) },
			{ $inc: { num_comment : 1 }},
			{ safe : true},
			function (errNumCa, resNumCa) {
				callback(null,resItem);
			}
		);
	});
};

// ------------------------------------
// Put like for proposal
// note: 
// callback: object
// ------------------------------------
exports.pushLikeForProposalID = function(id_proposal,  document, callback){
	free_proposals.update({_id:new ObjectID(id_proposal)}, {$push: {list_like:document}}, {multi:true}, function(errItem,resItem) {
		free_proposals.update(
			{ _id : new ObjectID(id_proposal) },
			{ $inc: { num_like : 1 }},
			{ safe : true},
			function (errNumCa, resNumCa) {
				callback(null,resItem);
			}
		);
	});
};

// ------------------------------------
// Insert like for likes collection
// note: 
// callback:
// ------------------------------------
exports.addLikeContest = function(document, callback){
	free_likes.insert(document, function(errDocument, resDocument){
		callback(null, resDocument);
	});
};

// ------------------------------------
// Test exits like user with contest
// note: 
// callback:
// ------------------------------------
exports.testLikeContestOfUser = function(id_contest, id_user, callback){
	free_likes.find({$and:[{constest_id:id_contest},{'user_info.user_id':id_user}]}).count(
		function(err, result) {
			callback(null,result);
		}
	);
};

// ------------------------------------
// Get list like contest
// note: 
// callback:
// ------------------------------------
exports.getListLikeContest = function(id_contest, limit, skip,callback){
	free_likes.find({constest_id:id_contest})
	.limit(parseInt(limit))
	.skip(parseInt(skip))
	.sort([['date_spam', 'desc']])
	.toArray(function(err, items)
	{
		callback(null,items);
	});
};