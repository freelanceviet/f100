var Mogodb   = require('../mongodb/connection');
var ALL = require('../modules/public-manager');
var JM = require('../modules/job-manager');
var IM = require('../modules/uploadimage-manager');
var moment   	= Mogodb.moment;
module.exports = function (app) {
	//--------------------------------------
	// Redirect to home page
	//--------------------------------------
	app.get('/contests', function (req, res) {
		res.render('block/font-end/contests', {
			title:"List contests"
		});
	});
	//--------------------------------------
	// Redirect to page post contest
	//--------------------------------------
	app.get('/contest-post', function (req, res) {
		ALL.getAllCategories(function(errCategories, resCategories){
			ALL.getAllSkill(function(errSkill, resSkill){
				ALL.getAllCurrency(function(errCurrency, resCurrency){
					ALL.getAllOptional(function(errOptional, resOptional){
						ALL.getCurrencyDefault(function(errCurrencyDefault, resCurrencyDefault){
							ALL.getAllLocation(function(errLocation, resLocation){
								res.render('block/font-end/contest_post', {
									title:"Form Post Contest",
									resCategories:resCategories,
									resSkill:resSkill,
									resCurrency:resCurrency,
									resOptional:resOptional,
									resCurrencyDefault:resCurrencyDefault,
									resLocation:resLocation
								});
							});
						});
					});
				});
			});
		});
	});
	//--------------------------------------
	// Form add post job
	//--------------------------------------
	app.post('/addpostcontest', function (req, res) {
		var type_submit = req.param('contest_post_type');
		if(type_submit==0){
			// File
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
			//
			var addDate = moment(new Date());
			var d = new Date();
			var n = d.getTime();
			
			var document = {
				category_id : req.param('skill_category'),
				category_sub_id : req.param('skill_subcategory'),
				project_name : req.param('project_name'),
				job_skill : req.param('contest_skill')[0],
				job_description : req.param('job_description'),
				file_up : file_all,
				assisted : req.param('chkbx_assisted')[0],
				contest_length: req.param('contest_length'),
				currency:req.param('currency'),
				budget : req.param('budget_value'),
				location : req.param('contest_location')[0],
				date_add : addDate.format('YYYY-MM-DD hh:mm:ss'),
				date_spam : n,
				date_update : n,
			};
			 console.log(document);
			 res.send('xxxx',200);
		}else{
			IM.uploadimage('contests',req.files.files_contest[0], function(errFile, resFile){
				res.render('block/font-end/block/jobs/file', {
					resFile:resFile
				});
			});
		}
	});
}
