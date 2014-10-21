var Mogodb   = require('../mongodb/connection');
var AM = require('../modules/home-page-manager');
module.exports = function (app) {
	//--------------------------------------
	// router admin home page
	//--------------------------------------
	app.get('/', function (req, res) {
		res.render('block/font-end/home_page', {
			title:"Home page"
		});
	});
}
