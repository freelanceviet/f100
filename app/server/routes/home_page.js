var Mogodb   = require('../mongodb/connection');
var CM = require('../modules/contest-manager');
var JM = require('../modules/job-manager');

module.exports = function (app) {
	//--------------------------------------
	// router admin home page
	//--------------------------------------
	app.get('/', function (req, res) {
		CM.getContestDefault(8, 0, function(errContests, resContests) {
			JM.getJobDefault(20, 0, function(errJobs, resJobs){
				if(req.session.user==null){
					res.render('block/font-end/home_page', {
						user : null,
						title:"Home page",
						resContests : resContests,
						resJobs : resJobs
					});
				}else{
					res.render('block/font-end/home_page', {
						user : req.session.user,
						title : "Home page",
						resContests : resContests,
						resJobs : resJobs
					});
				}
			});
		});
	});
}
