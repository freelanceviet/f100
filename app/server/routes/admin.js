var Mogodb   = require('../mongodb/connection');
var AM = require('../modules/admin-manager');
module.exports = function (app) {
	
	//--------------------------------------
	// Router admin_ home page
	//--------------------------------------
	app.get('/admin-home', function (req, res) {
		res.render('block/admin/home', {
			title:"Admin"
		}); 
	});
	
	//--------------------------------------
	// Router categories
	//--------------------------------------
	app.get('/category', function (req, res) {
		res.render('block/admin/categories', {
			title:"Categories"
		}); 
	});
}
