var Mogodb   	  = require('../mongodb/connection');

var free_jobs	          = Mogodb.free_jobs;
var free_categories	      = Mogodb.free_categories;
var free_proposals	      = Mogodb.free_proposals;
var ObjectID	          = Mogodb.ObjectID;

// ------------------------------------
// Sort job example
exports.jobSortFiller = function(arr, callback){
	var doc = {};
	if(arr['category']!=undefined){
		doc.category_id = arr['category'];
	}
	if(arr['subcat']!=undefined){
		doc.category_sub_id = arr['category_sub_id'];
	}
	if(arr['remote']!=undefined){
		doc.location = arr['remote'];
	}
	free_jobs.aggregate([
	  {$match: doc}
	],function(err, result) {
		console.log(result);
		callback(null,result);
	});
};

// ------------------------------------
// Get list categories
// note: 
// callback: arr list categories
// ------------------------------------
exports.addJob = function(document, callback){
	free_jobs.insert(document, function(errDocument, resDocument){
		if(resDocument){
			// Update number for category
			if(resDocument[0].category_id!="-1"){
				free_categories.update(
					{ _id : new ObjectID(resDocument[0].category_id) },
					{ $inc: { numjob : 1 }},
					{ safe : true},
					function (errNumCa, resNumCa) {
						// Update number for category sub
						if(resDocument[0].category_sub_id){
							free_categories.update(
								{ "items.id":resDocument[0].category_sub_id},
								{ $inc: { "items.$.num" : 1 }},
								{ safe : true},
								function (errNumCaSu, resNumCaSu) {
									callback(null, resDocument);
								}
							);
						}else{
							callback(null, resDocument);
						}
					}
				);
			}else{
				callback(null, resDocument);
			}
		}else{
			callback(null,null);
		}
	});
};
// -------------------------------------
// Get list job default
// note: 
// -------------------------------------
exports.getJobDefault = function(limit, skip, callback){
	free_jobs.find({})
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
exports.getItemJob = function(id, callback){
	free_jobs.findOne({_id:new ObjectID(id)}, function(errItemJob, resItemJob){
		if(resItemJob){
			callback(null,resItemJob);
		}else{
			callback(null,null);
		}
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
// Get all item proposal of job
// note: 
// ------------------------------------
exports.getProposalJob = function(id_job, limit, skip, callback){
	free_proposals.find({project_id : id_job})
	.sort([['date_spam', 'desc']])
	.limit(parseInt(limit))
	.skip(parseInt(skip))
	.toArray(function(errProposals, resProposals)
	{
		if(resProposals){
			callback(null, resProposals);
		}else{
			callback(null, null);
		}
	});
};