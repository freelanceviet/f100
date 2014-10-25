var Mogodb   = require('../mongodb/connection');
var AM = require('../modules/admin-manager');
module.exports = function (app) {
	//--------------------------------------
	// router admin home page
	//--------------------------------------
	app.get('/admin-home', function (req, res) {
		res.render('block/admin/home', {
			title:"Trip setting"
		}); 
	});
}
