var Mogodb   = require('../mongodb/connection');
var AM = require('../modules/admin-manager');
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
}
