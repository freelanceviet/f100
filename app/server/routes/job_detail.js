var Mogodb   = require('../mongodb/connection');

var ALL = require('../modules/public-manager');
var JM = require('../modules/job-manager');

module.exports = function (app) {
	//--------------------------------------
	// router admin home page
	//--------------------------------------
	app.get('/jobdetail', function (req, res) {
		var id_job = req.query.id;
		if(id_job!=undefined){
			JM.getItemJob(id_job, function(errJobs, resJobs){
				if(id_job){
					if(req.session.user==null){
						res.render('block/font-end/job_detail', {
							title : "Jobs detail",
							user : null,
							resJobs : resJobs
						});
					}else{
						res.render('block/font-end/job_detail', {
							title : "Jobs detail",
							user : req.session.user,
							resJobs : resJobs
						});
					}
				}else{
					res.send('Error! Not find url!', 200);
				}
			});
		}else{
			res.send('Error! Not find url!', 200);
		}
	});
}
