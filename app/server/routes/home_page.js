var Mogodb   = require('../mongodb/connection');
var CM = require('../modules/contest-manager');
var ALL = require('../modules/public-manager');
var HM = require('../modules/hourlie-manager');
var JM = require('../modules/job-manager');

module.exports = function (app) {
	//--------------------------------------
	// router admin home page
	//--------------------------------------
	app.get('/', function (req, res) {
		CM.getContestDefault(9, 0, function(errContests, resContests) {
			JM.getJobDefault(4, 0, function(errJobs, resJobs){
				ALL.getAllCategories(function(errCategories, resCategories){
					HM.getHourlieDefault(10, 0, function(errHourlies, resHourlies) {
						if(req.session.user==null){
							res.render('block/font-end/home_page', {
								user : null,
								title:"Home page",
								resCategories : resCategories,
								resContests : resContests,
								resJobs : resJobs,
								resHourlies : resHourlies
							});
						}else{
							res.render('block/font-end/home_page', {
								user : req.session.user,
								title : "Home page",
								resCategories : resCategories,
								resContests : resContests,
								resJobs : resJobs,
								resHourlies : resHourlies
							});
						}
					});
				});
			});
		});
	});
}
