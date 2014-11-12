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

// ------------------------------------
// Count all jobs
// note: 
// callback: num of jobs
// ------------------------------------
exports.countAllHourlies = function(callback){
	free_hourlies.find().count(
		function(err, result) {
			callback(null,result);
		}
	);
};

// ------------------------------------
// Sort hourlies example
// ------------------------------------
exports.hourlieSortFiller = function(arr, callback){
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
	if(arr['sattus']!=undefined){
		doc.sattus = parseInt(arr['sattus']);
	}
	console.log(doc);
	
	var limit = 9;
	var skip = 0;
	if(arr['page']!=undefined){
		skip = (parseInt(arr['page'])-1)*9;
	}
	free_hourlies.aggregate([
	  {$match: doc},
	  { $skip : skip },
	  { $limit : limit }
	],function(err, result) {
		console.log(result);
		callback(null,result);
	});
};

// ------------------------------------
// Count all hourlies get
// note: 
// callback: number of hourlies get
// ------------------------------------
exports.countAllHourliesGet = function(arr, callback){
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
	free_hourlies.aggregate([
	  {$match : doc},
	  {$group : {_id: "$project_name"}}
	],function(err, result) {
		callback(null,result.length);
	});
};




