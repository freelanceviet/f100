var Mogodb   = require('../mongodb/connection');
var ALL      = require('../modules/public-manager');
var PM       = require('../modules/profile-manager');
var IM = require('../modules/uploadimage-manager');
var moment   	= Mogodb.moment;
module.exports = function (app) {
	//--------------------------------------
	// Router profile page
	//--------------------------------------
	app.get('/profile', function (req, res) {
		var id_user = '544b00bf0ee563480a000001';
		PM.getItemAccount(id_user, function(errUser, resUser){
			ALL.getAllLocation(function(errLocation, resLocation){
				if(req.session.user==null){
					res.render('block/font-end/profile', {
						title : "List jobs",
						user : null,
						resUser : resUser,
						resLocation : resLocation
					});
				}else{
					res.render('block/font-end/profile', {
						title : "List jobs",
						user : req.session.user,
						resUser : resUser,
						resLocation : resLocation
					});
				}
			});
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
			if(resLoItem){
				var loc = resLoItem._id;
			}
			var document = {
				first_name 	: req.param('reg-first-name-tf'),
				last_name 	: req.param('reg-last-name-tf'),
				username	: req.param('reg-user-name-su-tf').toLowerCase(),
				email    	: req.param('reg-email-tf').toLowerCase(),
				pass	  	: req.param('reg-pass-tf'),
				loca_id	  	: loc,
				avatar		: '/images/default_avatar.jpg',
				type		: req.param('f_type')
			};
			PM.addNewAccount(document, function(errUser, resUser){
				if(errUser==null){
					res.send(resUser,200);
				}else{
					res.send(errUser, 200);
				}
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
	//--------------------------------------
	// Action logout
	//--------------------------------------
	app.get('/logout', function(req, res){
		req.session.destroy();
		res.redirect('/');
	});
	//--------------------------------------
	// Update image avatar of user
	//--------------------------------------
	app.post('/change_avatar_profile_user', function (req, res) {
		if(req.session.user==null){
			res.send('Please login to continue!', 200);
		}else{
			var id_profile = req.param('id_profile');
			IM.uploadimage('profile_avatar',req.files.photos, function(errresult, result){
				var addDate = moment(new Date());
				var d = new Date();
				var n = d.getTime();
				var docImage = {
					bytes: result[0].bytes,
					created_at: addDate.format('YYYY-MM-DD hh:mm:ss'),
					format: result[0].format,
					public_id: result[0].public_id,
					time_sort : n
				};
				PM.updateAvatarContest(id_profile, docImage, function(errContest, resContest){
					var image = '/upload/profile_avatar?type=resize&width=130&height=130&name='+docImage.public_id+'.'+docImage.format+'';
					res.send(image, 200);
				});
			});
		}
	});
	//--------------------------------------
	// Login with facebook_
	//--------------------------------------
	app.post('/login_with_facebook', function(req, res){
		var sex = 0;
		if(req.body.gender=="male"){
			sex = 1;
		}else{
			sex = 0;
		}
		// test exits account facebook_ on collection
		PM.testExitsAccountFaceBook(req.body.id,function(errFaceTest,resFaceTest){			
			if(resFaceTest){
				req.session.user = resFaceTest;
				res.send('exits', 200);
			}else{
				var document = {
					first_name 	: req.body.first_name,
					last_name 	: req.body.last_name,
					face_id     : req.body.id,
					username	: '',
					email    	: '',
					avatar		: "https://graph.facebook.com/"+req.body.id+"/picture?type=large",
					type		: ''
				};
				PM.addNewAccount(document, function(errUser,resUser){
					if(resUser){
						req.session.user = resUser;
						res.send('show-dialog-info', 200);
					}else{
						res.send('error', 200);
					}
				});
			}
		});
	});
	//--------------------------------------
	// Update info login with face book
	//--------------------------------------
	app.post('/storeUserUpdateFacebook', function(req, res){
		if(req.session.user){
			var document = {
				username	: req.param('reg-user-name-tf').toLowerCase(),
				email    	: req.param('reg-email-tf').toLowerCase(),
				pass	  	: req.param('reg-pass-tf'),
				loca_id	  	: null,
				type		: req.param('f_type')
			};
			var user = req.session.user;
			PM.updateUserWithFace(user[0]._id, document, function(errUser, resUser){
				if(errUser==null){
					res.send(resUser,200);
				}else{
					res.send(errUser, 200);
				}
			});
		}else{
			res.send('Login to continue!', 200);
		}
	});
}
