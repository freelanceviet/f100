var Mogodb   = require('../mongodb/connection');
var ALL = require('../modules/public-manager');
var JM = require('../modules/job-manager');
var IM = require('../modules/uploadimage-manager');
var moment   	= Mogodb.moment;

module.exports = function (app) {
	//---------------------------------------
	// router admin home page
	//---------------------------------------
	app.get('/job-database', function (req, res) {
		var category = req.query.category;
		var subcat = req.query.subcat;
		var remote = req.query.location;
		var filter = req.query.filter;
		var sort = req.query.budget;
		var page = req.query.page;
		var sattus = req.query.status;
		var jobtype = req.query.jobtype;
		var type_value = req.query.type_value;
		var arr = {
			category : req.query.category, 
			subcat : req.query.subcat,
			remote : req.query.location,
			filter : req.query.filter,
			sort : req.query.budget,
			page : req.query.page,
			sattus : req.query.status,
			jobtype : req.query.jobtype,
			type_value : req.query.type_value
		};
		ALL.getAllLocation(function(errLocation, resLocation){
			if(category==undefined && remote==undefined && filter==undefined && sort==undefined && page==undefined && sattus==undefined && jobtype==undefined && type_value==undefined){
				JM.getJobDefault(7, 0, function(errJobs, resJobs){
					ALL.getAllCategories(function(errCategories, resCategories){
						ALL.getAllLocation(function(errLocations, resLocations){
							JM.countAllJobs(function(errNumJobs, resNumJobs){
								if(req.session.user==null){
									res.render('block/font-end/jobs', {
										title:"List jobs",
										user : null,
										resJobs : resJobs,
										resCategories : resCategories,
										resLocations : resLocations,
										arrOption : arr,
										resCategoryItem : null,
										resNumJobs : resNumJobs,
										resLocation : resLocation
									});
								}else{
									res.render('block/font-end/jobs', {
										title:"List jobs",
										user : req.session.user,
										resJobs : resJobs,
										resCategories : resCategories,
										resLocations : resLocations,
										arrOption : arr,
										resCategoryItem : null,
										resNumJobs : resNumJobs,
										resLocation : resLocation
									});
								}
							});
						});
					});
				});
			}else{
				if(req.query.type=="get"){
					JM.jobSortFiller(arr ,function(errJobs, resJobs){
						JM.countAllJobsGet(arr, function(errNumJobs, resNumJobs){
							res.render('block/font-end/job_get', {
								resJobs : resJobs,
								resNumJobs : resNumJobs,
								arrOption : arr
							});
						});
					});
				}else{
					ALL.getAllCategories(function(errCategories, resCategories){
						ALL.getAllLocation(function(errLocations, resLocations){
							ALL.getItemCategory(arr['category'],function(errCategoryItem, resCategoryItem){
								JM.jobSortFiller(arr ,function(errJobs, resJobs){
									JM.countAllJobsGet(arr, function(errNumJobs, resNumJobs){
										if(req.session.user==null){
											res.render('block/font-end/jobs', {
												title:"List jobs",
												user : null,
												resJobs : resJobs,
												resCategories : resCategories,
												resLocations : resLocations,
												arrOption : arr,
												resCategoryItem : resCategoryItem,
												resNumJobs : resNumJobs,
												resLocation : resLocation
											});
										}else{
											res.render('block/font-end/jobs', {
												title:"List jobs",
												user : req.session.user,
												resJobs : resJobs,
												resCategories : resCategories,
												resLocations : resLocations,
												arrOption : arr,
												resCategoryItem : resCategoryItem,
												resNumJobs : resNumJobs, 
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
	});
	//--------------------------------------
	// Redirect to page post a job
	//--------------------------------------
	app.get('/post-a-job', function (req, res) {
		if(req.session.user==null){ // Begin if session
			ALL.getAllCategories(function(errCategories, resCategories){
				ALL.getAllSkill(function(errSkill, resSkill){
					ALL.getAllCurrency(function(errCurrency, resCurrency){
						ALL.getAllCurrencyRange(function(errCurrencyRange, resCurrencyRange){
							ALL.getAllOptional(function(errOptional, resOptional){
								ALL.getCurrencyDefault(function(errCurrencyDefault, resCurrencyDefault){
									ALL.getAllLocation(function(errLocation, resLocation){
										res.render('block/font-end/job_post', {
											title : "List jobs",
											user : null,
											resCategories : resCategories,
											resSkill : resSkill,
											resCurrency : resCurrency,
											resCurrencyRange : resCurrencyRange,
											resOptional : resOptional,
											resCurrencyDefault : resCurrencyDefault,
											resLocation : resLocation
										});
									});
								});
							});
						});
					});
				});
			});
		}else{ // - session
			ALL.getAllCategories(function(errCategories, resCategories){
				ALL.getAllSkill(function(errSkill, resSkill){
					ALL.getAllCurrency(function(errCurrency, resCurrency){
						ALL.getAllCurrencyRange(function(errCurrencyRange, resCurrencyRange){
							ALL.getAllOptional(function(errOptional, resOptional){
								ALL.getCurrencyDefault(function(errCurrencyDefault, resCurrencyDefault){
									ALL.getAllLocation(function(errLocation, resLocation){
										res.render('block/font-end/job_post', {
											title : "List jobs",
											user : req.session.user,
											resCategories : resCategories,
											resSkill : resSkill,
											resCurrency : resCurrency,
											resCurrencyRange : resCurrencyRange,
											resOptional : resOptional,
											resCurrencyDefault : resCurrencyDefault,
											resLocation : resLocation
										});
									});
								});
							});
						});
					});
				});
			});
		} // End session
	});
	
	//--------------------------------------
	// Form add post job
	//--------------------------------------
	app.post('/addpostjob', function (req, res) {
		if(req.session.user){
			var type_submit = req.param('job_post_type');
			if(type_submit==0){
				// Sub category
				var sub_ca = null;
				// if(req.param('skill_subcategory')!=undefined){
					// sub_ca = req.param('skill_subcategory');
				// }
				// Assisted
				var assisted = null;
				if(!req.param('chkbx_assisted')){
					var assisted = null;
				}else{
					var assisted = req.param('chkbx_assisted')[0];
				}
				// Location
				var location = null;
				if(!req.param('job_location')){
					var location = null;
				}else{
					var location = req.param('job_location')[0]
				}
				// File up load
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
				// Date for job  
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
				// Document of job
				var document = {
					category_id : req.param('skill_category'),
					category_sub_id : sub_ca,
					project_name : req.param('project_name'),
					job_skill : req.param('job_skill')[0],
					job_description : req.param('job_description'),
					file_up : file_all,
					budgetPeriod : req.param('budgetPeriod'),
					currency : req.param('currency'),
					cu_from : req.param('budget_from'),
					cu_to : req.param('budget_to'),
					deadline : req.param('deadline'),
					assisted : assisted,
					location : location,
					user_info : user_info, 
					date_add : addDate.format('YYYY-MM-DD hh:mm:ss'),
					date_spam : n,
					date_update : n,
					sattus : 1
				};
				JM.addJob(document, function(errJob, resJob){
					res.send('success',200);
				});
			}else{
				IM.uploadimage('jobs',req.files.files_job[0], function(errFile, resFile){
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