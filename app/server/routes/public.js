var Mogodb   = require('../mongodb/connection');
var ALL = require('../modules/public-manager');

module.exports = function (app) {
	
	//--------------------------------------
	// Get sub category
	//--------------------------------------
	app.get('/getSubCategory', function (req, res) {
		var category_id = req.query.category_id;
		if(category_id!=undefined){
			ALL.getItemCategory(category_id, function(errCategoryItem, resCategoryItem){
				res.render('block/font-end/block/jobs/category_sub', {
					resCategoryItem:resCategoryItem
				});
			});
		}else{
			res.send('error',200);
		}
	});
	
	//--------------------------------------
	// Get sub currency (Event change currency)
	//--------------------------------------
	app.get('/getSubBudget', function (req, res) {
		var currency_id = req.query.currency_id;
		if(currency_id!=undefined){
			ALL.getItemCurrency(currency_id, function(errCategoryItem, resCurrencyDefault){
				ALL.getAllCurrencyRange(function(errCurrencyRange, resCurrencyRange){
					res.render('block/font-end/block/jobs/currency_sub', {
						resCurrencyDefault:resCurrencyDefault,
						resCurrencyRange:resCurrencyRange
					});
				});
			});
		}else{
			res.send('error',200);
		}
	});
	
	//--------------------------------------
	// Get form budget
	//--------------------------------------
	app.get('/getBudgetCustom', function (req, res) {
		var cu_title = req.query.cu_title;
		var cu_rate  = req.query.cu_reteusd;
		res.render('block/font-end/block/jobs/bubget', {
			cu_title:cu_title,
			cu_rate:cu_rate
		});
	});
}
