var Mogodb   	  = require('../mongodb/connection');

var free_hourlies	      = Mogodb.free_hourlies;
var free_categories	      = Mogodb.free_categories;
var ObjectID	          = Mogodb.ObjectID;

// ------------------------------------
// Insert hourlie
// note: 
// callback:
// ------------------------------------
exports.addHourlie = function(document, callback){
	free_hourlies.insert(document, function(errDocument, resDocument){
		if(resDocument){
			// Update number for category
			if(resDocument[0].category_id!="-1"){
				free_categories.update(
					{ _id : new ObjectID(resDocument[0].category_id) },
					{ $inc: { numhourlie : 1 }},
					{ safe : true},
					function (errNumCa, resNumCa) {
						// Update number for category sub
						if(resDocument[0].category_sub_id){
							free_categories.update(
								{ "items.id":resDocument[0].category_sub_id},
								{ $inc: { "items.$.num_hourlie" : 1 }},
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
// Get list contest default
// note: 
// -------------------------------------
exports.getHourlieDefault = function(limit, skip, callback){
	free_hourlies.find({})
	.limit(parseInt(limit))
	.skip(parseInt(skip))
	.sort([['date_spam', 'desc']])
	.toArray(function(err, items)
	{
		callback(null,items);
	});
};