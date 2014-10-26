var Mogodb   	  = require('../mongodb/connection');

var free_jobs	          = Mogodb.free_jobs;
var free_categories	      = Mogodb.free_categories;
var ObjectID	          = Mogodb.ObjectID;

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