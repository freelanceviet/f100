var Mogodb   = require('../mongodb/connection');
var ALL = require('../modules/public-manager');
var JM = require('../modules/job-manager');
var IM = require('../modules/uploadimage-manager');
module.exports = function (app) {
	//--------------------------------------
	// router admin home page
	//--------------------------------------
	app.get('/jobs', function (req, res) {
		res.render('block/font-end/jobs', {
			title:"List jobs"
		});
	});
	//--------------------------------------
	// Redirect to page post a job
	//--------------------------------------
	app.get('/jobs-post', function (req, res) {
		ALL.getAllCategories(function(errCategories, resCategories){
			ALL.getAllSkill(function(errSkill, resSkill){
				ALL.getAllCurrency(function(errCurrency, resCurrency){
					ALL.getAllCurrencyRange(function(errCurrencyRange, resCurrencyRange){
						ALL.getAllOptional(function(errOptional, resOptional){
							ALL.getCurrencyDefault(function(errCurrencyDefault, resCurrencyDefault){
								res.render('block/font-end/job_post', {
									title:"List jobs",
									resCategories:resCategories,
									resSkill:resSkill,
									resCurrency:resCurrency,
									resCurrencyRange:resCurrencyRange,
									resOptional:resOptional,
									resCurrencyDefault:resCurrencyDefault
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
	app.post('/addpostjob', function (req, res) {
		var type_submit = req.param('job_post_type');
		if(type_submit==0){
			res.send('binh thuong',200);
		}else{
			IM.uploadimage('jobs',req.files.files_job[0], function(errFile, resFile){
				console.log(resFile);
				res.send('ngon hang',200);
			});
		}
	});
	
}
