var Mogodb   = require('../mongodb/connection');
var ALL = require('../modules/public-manager');
var JM = require('../modules/job-manager');
var IM = require('../modules/uploadimage-manager');
var moment   	= Mogodb.moment;

module.exports = function (app) {
	//---------------------------------------
	// router admin home page
	//---------------------------------------
	app.get('/jobs', function (req, res) {
		JM.getJobDefault(20, 0, function(errJobs, resJobs){
			ALL.getAllCategories(function(errCategories, resCategories){
				if(req.session.user==null){
					res.render('block/font-end/jobs', {
						title:"List jobs",
						user : null,
						resJobs : resJobs,
						resCategories : resCategories
					});
				}else{
					res.render('block/font-end/jobs', {
						title:"List jobs",
						user : req.session.user,
						resJobs : resJobs,
						resCategories : resCategories
					});
				}
			});
		});
	});
	//--------------------------------------
	// Redirect to page post a job
	//--------------------------------------
	app.get('/jobs-post', function (req, res) {
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
				if(req.param('skill_subcategory')!=undefined){
					sub_ca = req.param('skill_subcategory');
				}
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
				// File upload
				var file_up = req.param('public_id');
				var file_all = new Array();
				if(file_up!=undefined){
					for(var i=0;i<file_up[0].length;i++){
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