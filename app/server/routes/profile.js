var Mogodb   = require('../mongodb/connection');
var ALL      = require('../modules/public-manager');
var PM       = require('../modules/profile-manager');
module.exports = function (app) {
	//--------------------------------------
	// router profile page
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
		if(req.session.user==null){
			ALL.getAllLocation(function(errLocation, resLocation){
				res.render('block/font-end/block/profile/register', {
					title:"Register form",
					resLocation: resLocation
				});
			});
		}else{
			res.redirect('/');
		}
	});
	//--------------------------------------
	// Store user
	//--------------------------------------
	app.post('/storeUser', function (req, res) {
		ALL.getItemLocation(req.param('reg-location-tf'),function(errLoItem, resLoItem){
			var document = {
				first_name 	: req.param('reg-first-name-tf'),
				last_name 	: req.param('reg-last-name-tf'),
				email    	: req.param('reg-email-tf'),
				pass	  	: req.param('reg-pass-tf'),
				loca_id	  	: ''+resLoItem._id+'',
				avatar		: '/images/default_avatar.jpg',
				type		: req.param('f_type')
			};
			PM.addNewAccount(document, function(errUser, resUser){
				res.send(resUser,200);
			});
		});
	});
	//--------------------------------------
	// Login Form
	//--------------------------------------
	app.get('/login', function (req, res) {
		if(req.session.user==null){
			ALL.getAllLocation(function(errLocation, resLocation){
				res.render('block/font-end/block/profile/login', {
					title:"Register form",
					resLocation: resLocation
				});
			});
		}else{
			res.redirect('/');
		}
	});
	//--------------------------------------
	// Login post form
	//--------------------------------------
	app.post('/login', function (req, res) {
		PM.manualLogin(req.param('lo-email-tf'), req.param('lo-pass-tf'), function(e, o){
			if (!o){
				res.send(e, 200);
			}else{
				req.session.user = o;
				res.send('xxx',200);
			} 
		});
	});
	app.get('/logout', function(req, res){
		req.session.destroy();
		res.redirect('/');
	});
}
