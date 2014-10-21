var Mogodb   = require('../mongodb/connection');
var ALL = require('../modules/public-manager');
var JM = require('../modules/job-manager');
var IM = require('../modules/uploadimage-manager');
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
							res.render('block/font-end/contest_post', {
								title:"Form Post Contest",
								resCategories:resCategories,
								resSkill:resSkill,
								resCurrency:resCurrency,
								resOptional:resOptional,
								resCurrencyDefault:resCurrencyDefault
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
		var type_submit = req.param('job_post_type');
		if(type_submit==0){
			res.send('binh thuong',200);
		}else{
			IM.uploadimage('contests',req.files.files_contest[0], function(errFile, resFile){
				console.log(resFile);
				res.send('ngon hang',200);
			});
		}
	});
}
