var Mogodb   = require('../mongodb/connection');
var ALL = require('../modules/public-manager');
var HM = require('../modules/hourlie-manager');
var IM = require('../modules/uploadimage-manager');
var moment   	= Mogodb.moment;

module.exports = function (app) {
	
	//--------------------------------------
	// Redirect to hourlie_ detail
	//--------------------------------------
	app.get('/hourliedetail', function (req, res) {
		res.render('block/font-end/hourlie_detail', {
			title : "Detail hourlie_"
		});
	});

}