var Mogodb   = require('../mongodb/connection');
var ALL = require('../modules/public-manager');
var CM = require('../modules/contest-manager');
var IM = require('../modules/uploadimage-manager');
var moment   	= Mogodb.moment;
module.exports = function (app) {
	//--------------------------------------
	// Redirect to home page
	//--------------------------------------
	app.get('/contests', function (req, res) {
		ALL.getAllLocation(function(errLocation, resLocation){
			CM.getContestDefault(20, 0, function(errContests, resContests) {
				if(req.session.user==null){
					res.render('block/font-end/contests', {
						title : "List contests",
						user : null,
						resContests : resContests,
						resLocation : resLocation
					});
				}else{
					res.render('block/font-end/contests', {
						title:"List contests",
						user : req.session.user,
						resContests : resContests,
						resLocation : resLocation
					});
				}
			});
		});
	});
	//--------------------------------------
	// Redirect to page post contest
	//--------------------------------------
	app.get('/post-competition', function (req, res) {
		if(req.session.user == null) {
			ALL.getAllCategories(function(errCategories, resCategories) {
				ALL.getAllSkill(function(errSkill, resSkill) {
					ALL.getAllCurrency(function(errCurrency, resCurrency) {
						ALL.getAllOptional(function(errOptional, resOptional) {
							ALL.getCurrencyDefault(function(errCurrencyDefault, resCurrencyDefault) {
								ALL.getAllLocation(function(errLocation, resLocation) {
									ALL.getItemSetting(function(errSettings, resSettings){
										res.render('block/font-end/contest_post', {
											title : "Form Post Contest",
											user : null,
											resCategories : resCategories,
											resSkill : resSkill,
											resCurrency : resCurrency,
											resOptional : resOptional,
											resCurrencyDefault : resCurrencyDefault,
											resLocation : resLocation,
											resSettings : resSettings
										});
									});
								});
							});
						});
					});
				});
			});
		}else{
			ALL.getAllCategories(function(errCategories, resCategories){
				ALL.getAllSkill(function(errSkill, resSkill){
					ALL.getAllCurrency(function(errCurrency, resCurrency){
						ALL.getAllOptional(function(errOptional, resOptional){
							ALL.getCurrencyDefault(function(errCurrencyDefault, resCurrencyDefault){
								ALL.getAllLocation(function(errLocation, resLocation){
									ALL.getItemSetting(function(errSettings, resSettings){
										res.render('block/font-end/contest_post', {
											title:"Form Post Contest",
											user:req.session.user,
											resCategories:resCategories,
											resSkill:resSkill,
											resCurrency:resCurrency,
											resOptional:resOptional,
											resCurrencyDefault:resCurrencyDefault,
											resLocation:resLocation,
											resSettings : resSettings
										});
									});
								});
							});
						});
					});
				});
			});
		}
	});
	//--------------------------------------
	// Form add post job
	//--------------------------------------
	app.post('/addpostcontest', function (req, res) {
		if(req.session.user){
			var type_submit = req.param('contest_post_type');
			if(type_submit==0){
				// Sub category
				var sub_ca = null;
				if(req.param('skill_subcategory')!=undefined){
					sub_ca = req.param('skill_subcategory');
				}
				// Assisted
				var assisted = null;
				if(!req.param('chkbx_assisted')){
					var assisted = null;
				}else{
					assisted = req.param('chkbx_assisted');
				}
				// Location
				var location = null;
				if(!req.param('job_location')){
					var location = null;
				}else{
					var location = req.param('job_location')[0]
				}
				// File up load for contest
				var file_all = new Array();
				var num_file = req.param('contest_post_f');
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
				// Document for contest
				var document = {
					category_id : req.param('skill_category'),
					category_sub_id : sub_ca,
					project_name : req.param('project_name'),
					job_skill : req.param('contest_skill')[0],
					job_description : req.param('job_description'),
					contest_about : req.param('contest_about'),
					file_up : file_all,
					assisted : assisted,
					contest_length : req.param('contest_length'),
					currency : req.param('currency'),
					currency_title : req.param('contest_currency_title'),
					currency_name : req.param('contest_currency_name'),
					budget : req.param('budget_value'),
					bonus_price : req.param('price_sum_ponust'),
					location : location,
					user_info : user_info, 
					date_add : addDate.format('YYYY-MM-DD hh:mm:ss'),
					name_prize : req.param('name_prize'),
					day_begin: req.param('day_begin'),
					day_end: req.param('day_end'),
					date_spam : n,
					date_update : n,
					status : -1
				};
				CM.addContest(document, function(errContest, resContest){
					var url_payment = "/payment?id="+resContest[0]._id+"&amount=300&name="+resContest[0].project_name+"";
					res.send(url_payment, 200);
				});
			}else{
				IM.uploadimage('contests',req.files.files_contest[0], function(errFile, resFile){
					res.render('block/font-end/block/jobs/file_contest_post', {
						resFile:resFile
					});
				});
			}
		}else{
			res.send('not-login',200);
		}
	});
	//--------------------------------------
	// Page select type payment
	//--------------------------------------
	app.get('/payment', function (req, res) {
		if(req.session.user){
			var id_contest = req.query.id;
			if(id_contest!=undefined){
				ALL.getAllLocation(function(errLocation, resLocation){
					ALL.getItemSetting(function(errSettings, resSettings){
						CM.getItemContest(id_contest, function(errContestItem, resContestItem){
							if(resContestItem.user_info.user_id == req.session.user._id){
								if(resContestItem){
									res.render('block/font-end/payment', {
										title : 'payment pro',
										resLocation : resLocation,
										resContestItem : resContestItem,
										resSettings : resSettings
									});
								}else{
									res.send('ID not correct!', 200);
								}
							}else{
								res.send('ID not correct!', 200);
							}
						});
					});
				});
			}else{
				res.send('url not invalid!');
			}
		}else{
			res.send('Login to continue!', 200);
		}
	});
	
	//--------------------------------------
	// Form add post job
	//--------------------------------------
	app.post('/payments_redirect', function (req, res) {
		if(req.session.user){
			var type_payment = req.param('type_payment');
			var id_contest = req.param('id_contest');
			CM.getItemContest(id_contest, function(errContestItem, resContestItem){
				if(resContestItem){
					if(type_payment=='cod'){
						CM.updateStatusContest(id_contest, 0, function(errContestItemUpdate, resContestItemUpdate){
							var url = "/contestdetail?id="+id_contest+"&tab=timeline&value="+resContestItem.project_name.replace(/ /g,"-")+"";
							res.send(url, 200);
						});
					}else if(type_payment=='baokiem'){
						res.send('thanh toan bang bao kiem', 200);
					}else if(type_payment=='paypal'){
						res.send('thanh toan voi  paypal', 200);
					}else{
						res.send('Method is not supports', 200);
					}
				}else{
					res.send('ID is not correct!', 200);
				}
			});
		}else{
			res.send('Login to continue!', 200);
		}
	});
	
}
