var Mogodb   = require('../mongodb/connection');
var AM = require('../modules/home-page-manager');
module.exports = function (app) {
	//--------------------------------------
	// router admin home page
	//--------------------------------------
	app.get('/contestdetail', function (req, res) {
		res.render('block/font-end/contest_detail', {
			title:"List contests"
		});
	});
}
