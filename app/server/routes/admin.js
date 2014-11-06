var Mogodb   = require('../mongodb/connection');
var AM = require('../modules/admin-manager');
var ALL = require('../modules/public-manager');
module.exports = function (app) {
	
	//--------------------------------------
	// Router admin_ home page
	//--------------------------------------
	app.get('/admin-home', function (req, res) {
		res.render('block/admin/home', {
			title:"Admin"
		}); 
	});
	
	//--------------------------------------
	// Router categories
	//--------------------------------------
	app.get('/category', function (req, res) {
		if(req.query.id == undefined){
			AM.getAllCategories(function(errCategories, resCategories){
				res.render('block/admin/categories', {
					title : "Categories",
					resCategories : resCategories
				});
			});
		}else{
			AM.getItemCategory(req.query.id, function(errCategory, resCategory){
				res.render('block/admin/categories_sub', {
					title : resCategory.name_en,
					resCategory : resCategory
				});
			});
		}
	});
	
	//--------------------------------------
	// Router categories
	//--------------------------------------
	app.get('/optional', function (req, res) {
		AM.getAllOptional(function(errOptional, resOptional){
			res.render('block/admin/optionals', {
				title : "List Optional",
				resOptional : resOptional
			});
		});
	});
	
	//--------------------------------------
	// Router get form add category
	//--------------------------------------
	app.get('/getFormCategory', function (req, res) {
		res.render('block/admin/block/form_category', {
			title : "form category"
		});
	});
	
	//--------------------------------------
	// Router get form add optional
	//--------------------------------------
	app.get('/getFormOptional', function (req, res) {
		res.render('block/admin/block/form_optional', {
			title : "form Optional"
		});
	});
	
	//--------------------------------------
	// Router get form add category sub
	//--------------------------------------
	app.get('/getFormCategorySub', function (req, res) {
		res.render('block/admin/block/form_category_sub', {
			title : "form category sub",
			id : req.query.id
		});
	});
	
	//--------------------------------------
	// Store form category
	//--------------------------------------
	app.post('/store_category', function (req, res) {
		var document = {
			name_en : req.param('admin_category_name_en'),
			name_vn : req.param('admin_category_name_vn'),
			rank : req.param('admin_category_rank')
		};
		AM.insertCategory(document, function(errItem, resItem){
			res.render('block/admin/block/form_category_success', {
				title : "form category success",
				resItem : resItem[0]
			});
		});
	});
	
	//--------------------------------------
	// Store form category
	//--------------------------------------
	app.post('/store_category_sub', function (req, res) {
		var id = req.param('category_id')
		var document = {
			id : req.param('admin_category_sub_id'),
			name : req.param('admin_category_sub_name_en'),
			name_vn : req.param('admin_category_sub_name_vn')
		};
		AM.insertCategorySub(id, document, function(errItem, resItem){
			res.render('block/admin/block/form_category_sub_success', {
				title : "form category success",
				resItem : document
			});
		});
	});
	
	//--------------------------------------
	// Delete category 
	//--------------------------------------
	app.get('/deleteCategory', function (req, res) {
		AM.deleteCategory(req.query.id, function(errItem, resItem){
			res.send('success', 200);
		});
	});
	
	//--------------------------------------
	// Delete category 
	//--------------------------------------
	app.get('/deleteCategorySub', function (req, res) {
		AM.deleteCategorySub(req.query.id_ca, req.query.id, function(errItem, resItem){
			res.send('success', 200);
		});
	});
	
	//--------------------------------------
	// Store form optional
	//--------------------------------------
	app.post('/store_optional', function (req, res) {
		var document = {
			title_vn : req.param('admin_optional_title_en'),
			title_en : req.param('admin_optional_title_vn'),
			name_en : req.param('admin_optional_name_en'),
			name_vn : req.param('admin_optional_name_vn'),
			price : req.param('admin_optional_price'),
			icon : '',
			color : '',
			rank : req.param('admin_optional_rank'),
		};
		AM.insertOptional(document, function(errItem, resItem){
			res.render('block/admin/block/form_optional_success', {
				resItem : resItem[0]
			});
		});
	});
	
	//--------------------------------------
	// Delete optional
	//--------------------------------------
	app.get('/deleteOptional', function (req, res) {
		AM.deleteOptional(req.query.id, function(errItem, resItem){
			res.send('success', 200);
		});
	});
	
	//--------------------------------------
	// Router currency
	//--------------------------------------
	app.get('/currency', function (req, res) {
		AM.getAllCurrency(function(errCurrency, resCurrency){
			res.render('block/admin/currencies', {
				title : "List currencies",
				resCurrency : resCurrency
			});
		});
	});
	
	//--------------------------------------
	// Router get form add optional
	//--------------------------------------
	app.get('/getFormCurrency', function (req, res) {
		res.render('block/admin/block/form_currency', {
			title : "Form Currency"
		});
	});
	
	//-----------------------------------------------------
	// Store form currency
	//-----------------------------------------------------
	app.post('/store_currency', function (req, res) {
		var document = {
			name : req.param('admin_currency_name'),
			value : req.param('admin_currency_value'),
			title : req.param('admin_currency_title'),
			rank : req.param('admin_currency_rank'),
			is_default : req.param('admin_currency_is_default'),
			rate_usd : req.param('admin_currency_rateusd')
		};
		AM.insertCurrency(document, function(errItem, resItem){
			res.render('block/admin/block/form_currency_success', {
				resItem : resItem[0]
			});
		});
	});
	
	//--------------------------------------
	// Delete currency
	//--------------------------------------
	app.get('/deleteCurrency', function (req, res) {
		AM.deleteCurrency(req.query.id, function(errItem, resItem){
			res.send('success', 200);
		});
	});
	
	//--------------------------------------
	// Router skill
	//--------------------------------------
	app.get('/skill', function (req, res) {
		AM.getAllSkill(function(errSkill, resSkill){
			res.render('block/admin/skills', {
				title : "List skill",
				resSkill : resSkill
			});
		});
	});
	
	//--------------------------------------
	// Router get form skill
	//--------------------------------------
	app.get('/getFormSkill', function (req, res) {
		ALL.getAllCategories(function(errCategories, resCategories){
			res.render('block/admin/block/form_skill', {
				title : "Form skill",
				resCategories : resCategories
			});
		});
	});
	
	//--------------------------------------
	// Router get form skill
	//--------------------------------------
	app.get('/getSubCategory', function (req, res) {
		ALL.getItemCategory(req.query.id, function(errCategory, resCategory){
			res.render('block/admin/block/category_sub', {
				resCategory : resCategory
			});
		});
	});
	
	//-----------------------------------------------------
	// Store form skill
	//-----------------------------------------------------
	app.post('/store_skill', function (req, res) {
		var document = {
			name : req.param('admin_skill_title_en'),
			category_id : req.param('category'),
			category_id_sub : req.param('category_sub'),
			rank : req.param('admin_skill_rank')
		};
		AM.insertSkill(document, function(errItem, resItem){
			res.render('block/admin/block/form_skill_success', {
				resItem : resItem[0]
			});
		});
	});
	
	//--------------------------------------
	// Delete currency
	//--------------------------------------
	app.get('/deleteSkill', function (req, res) {
		AM.deleteSkill(req.query.id, function(errItem, resItem){
			res.send('success', 200);
		});
	});
	
	//--------------------------------------
	// Router location
	//--------------------------------------
	app.get('/location', function (req, res) {
		AM.getAllLocation(function(errLocation, resLocation){
			res.render('block/admin/locations', {
				title : "List location",
				resLocation : resLocation
			});
		});
	});
	
	//--------------------------------------
	// Router get form location
	//--------------------------------------
	app.get('/getFormLocation', function (req, res) {
		res.render('block/admin/block/form_location', {
			title : 'Form location'
		});
	});
	
	//-----------------------------------------------------
	// Store form location
	//-----------------------------------------------------
	app.post('/store_location', function (req, res) {
		var document = {
			lo_name : req.param('admin_location_name'),
			lo_flag : req.param('admin_location_flag'),
			lo_lat : req.param('admin_location_lat'),
			lo_lon : req.param('admin_location_lon')
		};
		AM.insertLocation(document, function(errItem, resItem){
			res.render('block/admin/block/form_location_success', {
				resItem : resItem[0]
			});
		});
	});
	
	//--------------------------------------
	// Delete currency
	//--------------------------------------
	app.get('/deleteLocation', function (req, res) {
		AM.deleteLocation(req.query.id, function(errItem, resItem){
			res.send('success', 200);
		});
	});
	
	//--------------------------------------
	// Router location
	//--------------------------------------
	app.get('/currency_range', function (req, res) {
		AM.getCurrencyRange(function(errCurrencyRange, resCurrencyRange){
			res.render('block/admin/currency_range', {
				title : "List currency range",
				resCurrencyRange : resCurrencyRange
			});
		});
	});
}
