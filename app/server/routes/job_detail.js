var Mogodb   = require('../mongodb/connection');
var AM = require('../modules/home-page-manager');
module.exports = function (app) {
	//--------------------------------------
	// router admin home page
	//--------------------------------------
	app.get('/jobdetail', function (req, res) {
		res.render('block/font-end/job_detail', {
			title:"Jobs detail"
		});
	});
}
