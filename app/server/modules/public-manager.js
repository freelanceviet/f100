var Mogodb   	  = require('../mongodb/connection');


var free_categories	      = Mogodb.free_categories;
var free_skill	          = Mogodb.free_skill;
var free_currency	      = Mogodb.free_currency;
var free_currency_range	  = Mogodb.free_currency_range;
var free_optional	      = Mogodb.free_optional;
var free_location	      = Mogodb.free_location;
var ObjectID	          = Mogodb.ObjectID;

// ------------------------------------
// Get list categories
// note: 
// callback: arr list categories
// ------------------------------------
exports.getAllCategories = function(callback){
	free_categories.find({},{'name_en':1,'name_vn':1})
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
// Get list skill
// note: 
// callback: arr list skill
// ------------------------------------
exports.getAllSkill = function(callback){
	free_skill.find({})
	.sort([['rank', 'asc']])
	.toArray(
		function(e, res) {
		if (e) callback(e)
		else callback(null, res)
	});
};

// ------------------------------------
// Get list skill
// note: 
// callback: arr list skill
// ------------------------------------
exports.getAllCurrency = function(callback){
	free_currency.find({})
	.sort([['rank', 'asc']])
	.toArray(
		function(e, res) {
		if (e) callback(e)
		else callback(null, res)
	});
};

// ------------------------------------
// Get list skill
// note: 
// callback: arr list skill
// ------------------------------------
exports.getAllCurrencyRange = function(callback){
	free_currency_range.find({})
	.sort([['from', 'asc']])
	.toArray(
		function(e, res) {
		if (e) callback(e)
		else callback(null, res)
	});
};
// ------------------------------------
// Get list skill
// note: 
// callback: arr list skill
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
// Get item currency default
// note: 
// callback: document
// ------------------------------------
exports.getCurrencyDefault = function(callback){
	free_currency.findOne({'is_default':1}, function(errItem, resItem){
		if(resItem){
			callback(null,resItem);
		}else{
			callback(null,null);
		}
	});
};

// ------------------------------------
// Get item currency with currency id
// note: 
// callback: document
// ------------------------------------
exports.getItemCurrency = function(currency_id,callback){
	free_currency.findOne({_id:new ObjectID(currency_id)}, function(err, res){
		if(res){
			callback(null,res);
		}else{
			callback(null,null);
		}
	});
};

// ------------------------------------
// Get item currency with currency id
// note: 
// callback: document
// ------------------------------------
exports.getAllLocation = function(callback){
	free_location.find({})
	.toArray(
		function(e, res) {
		if (e) callback(e)
		else callback(null, res)
	});
};

// ------------------------------------
// Get item location
// note: 
// callback: document
// ------------------------------------
exports.getItemLocation = function(name,callback){
	free_location.findOne({lo_name:name}, function(err, res){
		if(res){
			callback(null,res);
		}else{
			callback(null,null);
		}
	});
};
