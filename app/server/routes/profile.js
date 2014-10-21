var Mogodb   = require('../mongodb/connection');
var ALL      = require('../modules/public-manager');
var PM       = require('../modules/profile-manager');
module.exports = function (app) {
	//--------------------------------------
	// router admin home page
	//--------------------------------------
	app.get('/profile', function (req, res) {
		res.render('block/font-end/profile', {
			title:"List jobs"
		});
	});
	//--------------------------------------
	// Register Form
	//--------------------------------------
	app.get('/register', function (req, res) {
		ALL.getAllLocation(function(errLocation, resLocation){
			res.render('block/font-end/block/profile/register', {
				title:"Register form",
				resLocation: resLocation
			});
		});
	});
	//--------------------------------------
	// Register Form
	//--------------------------------------
	app.post('/storeUser', function (req, res) {
		ALL.getItemLocation(req.param('f_location'),function(errLoItem, resLoItem){
			var document = {
				first_name 	: req.param('f_firstname'),
				last_name 	: req.param('f_lastname'),
				email    	: req.param('f_email'),
				pass	  	: req.param('f_password'),
				loca_id	  	: ''+resLoItem._id+'',
				type		: req.param('f_type')
			};
			PM.addUser(document, function(errUser, resUser){
				console.log(resUser);
			});
		});
		res.send('xxx',200);
	});
	//--------------------------------------
	// Register Form
	//--------------------------------------
	app.get('/login', function (req, res) {
		ALL.getAllLocation(function(errLocation, resLocation){
			res.render('block/font-end/block/profile/login', {
				title:"Register form",
				resLocation: resLocation
			});
		});
	});
}
