var Mogodb		= require('../mongodb/connection');
var ALL			= require('../modules/public-manager');
var fs			= require('fs');
var easyimg		= require('easyimage');
var moment		= Mogodb.moment;

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
	//--------------------------------------
	// Resize image for page
	//--------------------------------------
	app.get('/upload/:id', function (req, res) {
		var type    = req.params.id;
		var re_type = req.query.type;
		var width   = req.query.width;
		var height  = req.query.height;
		var name    = req.query.name;
		if(re_type=="resize"){
			if (fs.existsSync('app/public/upload/'+type+'/'+(width+"_"+height+"_"+name)+'')) {
				var img = fs.readFileSync('app/public/upload/'+type+'/'+(width+"_"+height+"_"+name)+'');
				res.writeHead(200, {'Content-Type': 'image/jpg' });
				res.end(img, 'binary');
			}else{
				easyimg.thumbnail({
				src:'app/public/upload/'+type+'/'+name+'', dst:'app/public/upload/'+type+'/'+(width+"_"+height+"_"+name)+'',
					width:width, height:height
				}).then(
					function(image) {
						var img = fs.readFileSync('app/public/upload/'+type+'/'+(width+"_"+height+"_"+name)+'');
						res.writeHead(200, {'Content-Type': 'image/jpg' });
						res.end(img, 'binary');
					},
					function (err) {
						console.log(err);
					}
				);
			}
		}else if(re_type=="normal"){
			var img = fs.readFileSync('app/public/upload/'+type+'/'+name+'');
			res.writeHead(200, {'Content-Type': 'image/jpg' });
			res.end(img, 'binary');
		}
	});
}
