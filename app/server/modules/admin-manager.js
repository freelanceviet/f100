var Mogodb   	  = require('../mongodb/connection');


var free_categories	      = Mogodb.free_categories;
var free_skill	          = Mogodb.free_skill;
var free_currency	      = Mogodb.free_currency;
var free_currency_range	  = Mogodb.free_currency_range;
var free_optional	      = Mogodb.free_optional;
var free_location	      = Mogodb.free_location;
var free_comments		  = Mogodb.free_comments;
var ObjectID	          = Mogodb.ObjectID;

// ------------------------------------
// Get list categories
// note: 
// callback: arr list categories
// ------------------------------------
exports.getAllCategories = function(callback){
	free_categories.find({})
	.sort([['rank', 'asc']])
	.toArray(
		function(e, res) {
		if (e) callback(e)
		else callback(null, res)
	});
};

// ------------------------------------
// Get list categories
// note: 
// callback: arr list categories
// ------------------------------------
exports.getAllOptional = function(callback){
	free_optional.find({})
	.sort([['rank', 'asc']])
	.toArray(
		function(e, res) {
		if (e) callback(e)
		else callback(null, res)
	});
};

// ------------------------------------
// Get list categories
// note: 
// callback: item category
// ------------------------------------
exports.getItemCategory = function(category_id, callback){
	free_categories.findOne({_id:new ObjectID(category_id)}, function(errItem, resItem){
		if(resItem){
			callback(null,resItem);
		}else{
			callback(null,null);
		}
	});
};

// ------------------------------------
// Insert category
// note: 
// callback: item insert
// ------------------------------------
exports.insertCategory = function(document, callback){
	free_categories.insert(document, function(errDocument, resDocument){
		if(resDocument){
			callback(null, resDocument);
		}else{
			callback(null, null);
		}
	});
};

// ------------------------------------
// Insert category sub
// note: 
// callback: item insert
// ------------------------------------
exports.insertCategorySub = function(id, document, callback){
	free_categories.update({_id:new ObjectID(id)}, {$push: {items:document}}, {multi:true}, function(err,res) {
		if(res){
			callback(null, res);
		}else{
			callback(null, null);
		}			
	});
};

// ------------------------------------
// Delete category
// note: 
// callback:
// ------------------------------------
exports.deleteCategory = function(id, callback){
	free_categories.remove({"_id": ObjectID(id)}, function(errDocument, resDocument){
		callback(null, null);
	});
};

// ------------------------------------
// Delete category sub
// note: 
// callback:
// ------------------------------------
exports.deleteCategorySub = function(id, id_sub, callback){
	console.log(id);
	console.log(id_sub);
	free_categories.update({_id:new ObjectID(id)}, {$unset: {items:id_sub}}, function(err,res) {
		if(res){
			callback(null, res);
		}else{
			callback(null, null);
		}
	});
};