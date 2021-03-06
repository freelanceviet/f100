var Mogodb   = require('../mongodb/connection');

var ALL = require('../modules/public-manager');
var JM = require('../modules/job-manager');
var IM = require('../modules/uploadimage-manager');
var moment   	= Mogodb.moment;

module.exports = function (app) {
	//--------------------------------------
	// router admin home page
	//--------------------------------------
	app.get('/jobdetail', function (req, res) {
		var id_job = req.query.id;
		if(id_job!=undefined){
			JM.getItemJob(id_job, function(errJobs, resJobs){
				if(id_job){
					if(req.session.user==null){
						res.render('block/font-end/job_detail', {
							title : "Jobs detail",
							user : null,
							resJobs : resJobs
						});
					}else{
						res.render('block/font-end/job_detail', {
							title : "Jobs detail",
							user : req.session.user,
							resJobs : resJobs
						});
					}
				}else{
					res.send('Error! Not find url!', 200);
				}
			});
		}else{
			res.send('Error! Not find url!', 200);
		}
	});
	//--------------------------------------
	// router admin home page
	//--------------------------------------
	app.post('/storeProposal', function (req, res) {
		if(req.session.user){
			var type_submit = req.param('contest_post_type');
			if(type_submit==0){
				// File up load for contest
				var file_all = new Array();
				var num_file = req.param('contest_post_f');
				if(num_file>0){
					if(num_file==1){
						var do_file = {
							public_id: req.param('public_id')[0],
							format: req.param('format')[0],
							created_at: req.param('created_at')[0],
							bytes: req.param('bytes')[0],
							type: req.param('type')[0]
						};
						file_all.push(do_file);
					}else{
						for(var i=0;i<num_file;i++){
							var do_file = {
								public_id: req.param('public_id')[0][i],
								format: req.param('format')[0][i],
								created_at: req.param('created_at')[0][i],
								bytes: req.param('bytes')[0][i],
								type: req.param('type')[0][i]
							};
							file_all.push(do_file);
						}
					}
				}
				// Item price
				var price_all = new Array();
				var num_price = req.param('contest_post_r');
				for(var i=0; i<num_price;i++){
					if(req.param('form_proposal_item_name')){
						var do_price;
						if(num_price>1){
							do_price = {
								item_name : req.param('form_proposal_item_name')[0][i],
								item_price : req.param('form_proposal_item_value')[0][i]
							};
						}else{
							do_price = {
								item_name : req.param('form_proposal_item_name')[0][0],
								item_price : req.param('form_proposal_item_value')[0][0]
							};
						}
						price_all.push(do_price);
					}
				}
				//
				var id_job = req.param('job_id');
				// Date for contest
				var addDate = moment(new Date());
				var d = new Date();
				var n = d.getTime();
				// Info user
				var user_info = {
					user_id : ""+req.session.user._id+"",
					user_av : req.session.user.avatar,
					user_name_f : req.session.user.first_name,
					user_name_l : req.session.user.last_name
				};
				// Document for proposal
				var document = {
					project_id : req.param('job_id'),
					proposal_description : req.param('des_proposal'),
					file_up : file_all,
					price_item : price_all,
					user_info : user_info, 
					price_main : req.param('proposal_price'),
					date_add : addDate.format('YYYY-MM-DD hh:mm:ss'),
					date_spam : n,
					date_update : n,
				};
				JM.insertProposal(document, function(errProposal, resProposal){
					res.send('success',200);
				});
			}else{
				IM.uploadimage('proposals',req.files.files_proposal[0], function(errFile, resFile){
					res.render('block/font-end/block/jobs/file', {
						resFile : resFile
					});
				});
			}
		}else{
			res.send('not-login',200);
		}
	});
	
	//--------------------------------------
	// router admin home page
	//--------------------------------------
	app.get('/proposal', function (req, res) {
		var id_job = req.query.id;
		JM.getProposalJob(id_job, 10, 0, function(errProposals, resProposals){
			res.render('block/font-end/job_proposal', {
				title : 'Job proposal manager',
				resProposals : resProposals
			});
		});
	});
}
