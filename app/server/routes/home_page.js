var Mogodb   = require('../mongodb/connection');
var AM = require('../modules/home-page-manager');
module.exports = function (app) {
	//--------------------------------------
	// router admin home page
	//--------------------------------------
	app.get('/', function (req, res) {
		if(req.session.user==null){
			res.render('block/font-end/home_page', {
				user : null,
				title:"Home page"
			});
		}else{
			res.render('block/font-end/home_page', {
				user : req.session.user,
				title : "Home page"
			});
		}
	});
}
