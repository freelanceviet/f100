var Mogodb   = require('../mongodb/connection');
var ALL = require('../modules/public-manager');
var HM = require('../modules/hourlie-manager');
var IM = require('../modules/uploadimage-manager');
var moment   	= Mogodb.moment;

module.exports = function (app) {
	//--------------------------------------
	// Redirect to home page
	//--------------------------------------
	app.get('/freelancer-services', function (req, res) {
		//
		var category = req.query.category;
		var subcat = req.query.subcat;
		var remote = req.query.location;
		var filter = req.query.filter;
		var sort = req.query.budget;
		var page = req.query.page;
		var sattus = req.query.status;
		var arr = {
			category : req.query.category, 
			subcat : req.query.subcat,
			remote : req.query.location,
			filter : req.query.filter,
			sort : req.query.budget,
			page : req.query.page,
			sattus : req.query.status
		};
		ALL.getAllLocation(function(errLocation, resLocation){
			if(category==undefined && remote==undefined && filter==undefined && sort==undefined && page==undefined && sattus==undefined){
				HM.getHourlieDefault(9, 0, function(errHourlies, resHourlies) {
					ALL.getAllCategories(function(errCategories, resCategories){
						ALL.getAllLocation(function(errLocations, resLocations){
							HM.countAllHourlies(function(errNumHourlies, resNumHourlies){
								if(req.session.user==null){
									res.render('block/font-end/hourlies', {
										title:"List Hourlies",
										user : null,
										resHourlies : resHourlies,
										resCategories : resCategories,
										resLocations : resLocations,
										arrOption : arr,
										resCategoryItem : null,
										resNumHourlies : resNumHourlies,
										resLocation : resLocation
									});
								}else{
									res.render('block/font-end/hourlies', {
										title:"List HOurlies",
										user : req.session.user,
										resHourlies : resHourlies,
										resCategories : resCategories,
										resLocations : resLocations,
										arrOption : arr,
										resCategoryItem : null,
										resNumHourlies : resNumHourlies,
										resLocation : resLocation 
									});
								}
							});
						});
					});
				});
			}else{
				if(req.query.type=="get"){
					HM.hourlieSortFiller(arr ,function(errHourlies, resHourlies){
						HM.countAllHourliesGet(arr, function(errNumHourlies, resNumHourlies){
							res.render('block/font-end/hourlie_get', {
								resHourlies : resHourlies,
								resNumHourlies : resNumHourlies,
								arrOption : arr
							});
						});
					});
				}else{
					ALL.getAllCategories(function(errCategories, resCategories){
						ALL.getAllLocation(function(errLocations, resLocations){
							ALL.getItemCategory(arr['category'],function(errCategoryItem, resCategoryItem){
								HM.hourlieSortFiller(arr ,function(errHourlies, resHourlies){
									HM.countAllHourliesGet(arr, function(errNumHourlies, resNumHourlies){
										if(req.session.user==null){
											res.render('block/font-end/hourlies', {
												title:"List hourlies",
												user : null,
												resHourlies : resHourlies,
												resCategories : resCategories,
												resLocations : resLocations,
												arrOption : arr,
												resCategoryItem : resCategoryItem,
												resNumHourlies : resNumHourlies,
												resLocation : resLocation
											});
										}else{
											res.render('block/font-end/hourlies', {
												title:"List hourlies",
												user : req.session.user,
												resHourlies : resHourlies,
												resCategories : resCategories,
												resLocations : resLocations,
												arrOption : arr,
												resCategoryItem : resCategoryItem,
												resNumHourlies : resNumHourlies,
												resLocation : resLocation
											});
										}
									});
								});
							});
						});
					});
				}
			}
		});
		//
	});
	
	//--------------------------------------
	// Redirect to page post a hourlie
	//--------------------------------------
	app.get('/promote-your-services', function (req, res) {
		if(req.session.user == null) {
			ALL.getAllCategories(function(errCategories, resCategories) {
				ALL.getAllCurrency(function(errCurrency, resCurrency) {
					ALL.getCurrencyDefault(function(errCurrencyDefault, resCurrencyDefault) {
						res.render('block/font-end/hourlie_post', {
							title : "Form Post Hourlie",
							user : null,
							resCategories : resCategories,
							resCurrency : resCurrency,
							resCurrencyDefault : resCurrencyDefault
						});
					});
				});
			});
		}else{
			ALL.getAllCategories(function(errCategories, resCategories){
				ALL.getAllCurrency(function(errCurrency, resCurrency){
					ALL.getCurrencyDefault(function(errCurrencyDefault, resCurrencyDefault){
						res.render('block/font-end/hourlie_post', {
							title:"Form Post Hourlie",
							user:req.session.user,
							resCategories:resCategories,
							resCurrency:resCurrency,
							resCurrencyDefault:resCurrencyDefault
						});
					});
				});
			});
		}
	});
	
	//--------------------------------------
	// Form add post job
	//--------------------------------------
	app.post('/addposthourlie', function (req, res) {
		if(req.session.user){
			var type_submit = req.param('hourlie_post_type');
			if(type_submit==0){
				// Sub category
				var sub_ca = null;
				if(req.param('skill_subcategory')!=undefined){
					sub_ca = req.param('skill_subcategory');
				}
				// File up load for contest
				var file_all = new Array();
				var num_file = req.param('hourlie_post_f');
				if(num_file>0){
					if(num_file==1){
						var do_file = {
							public_id: req.param('public_id')[0],
							format: req.param('format')[0],
							created_at: req.param('created_at')[0],
							bytes: req.param('bytes')[0],
							type: req.param('type')[0]
						};
						file_all.push(do_file);
					}else{
						for(var i=0;i<num_file;i++){
							var do_file = {
								public_id: req.param('public_id')[0][i],
								format: req.param('format')[0][i],
								created_at: req.param('created_at')[0][i],
								bytes: req.param('bytes')[0][i],
								type: req.param('type')[0][i]
							};
							file_all.push(do_file);
						}
					}
				}
				// Date for contest
				var addDate = moment(new Date());
				var d = new Date();
				var n = d.getTime();
				// Info user
				var user_info = {
					user_id : ""+req.session.user._id+"",
					user_av : req.session.user.avatar,
					user_name_f : req.session.user.first_name,
					user_name_l : req.session.user.last_name
				};
				// Item sub info
				var price_all = new Array();
				var num_price = req.param('hourlie_post_f');
				for(var i=0; i<num_price;i++){
					if(req.param('form_hourlie_item_name')){
						var do_price = {
							item_name : req.param('form_hourlie_item_name')[0][i],
							item_price : req.param('form_hourlie_item_value')[0][i]
						};
						price_all.push(do_price);
					}
				}
				// Document for hourlie
				var document = {
					category_id : req.param('skill_category'),
					category_sub_id : sub_ca,
					project_name : req.param('project_name'),
					job_description : req.param('job_description'),
					file_up : file_all,
					currency : req.param('currency'),
					price : req.param('hourlie_price'),
					user_info : user_info, 
					item : price_all,
					date_add : addDate.format('YYYY-MM-DD hh:mm:ss'),
					date_spam : n,
					date_update : n,
				};
				HM.addHourlie(document, function(errContest, resContest){
					res.send('success',200);
				});
			}else{
				IM.uploadimage('hourlies',req.files.files_hourlie[0], function(errFile, resFile){
					res.render('block/font-end/block/jobs/file', {
						resFile:resFile
					});
				});
			}
		}else{
			res.send('not-login',200);
		}
	});
}