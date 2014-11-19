var Mogodb   = require('../mongodb/connection');
var CM = require('../modules/contest-manager');
var IM = require('../modules/uploadimage-manager');
var ALL = require('../modules/public-manager');
var moment   	= Mogodb.moment;
module.exports = function (app) {
	//--------------------------------------
	// router admin home page
	//--------------------------------------
	app.get('/contestdetail', function (req, res) {
		if(req.query.id!=undefined && req.query.value!=undefined && req.query.tab!=undefined){
			var id_contest = req.query.id;
			ALL.getAllLocation(function(errLocation, resLocation){
				if(req.query.tab=="timeline"){
					CM.getItemContest(id_contest, function(errContestItem, resContestItem){
						CM.getListCommentContest(id_contest, 20, 0, function(errComments, resComments){
							if(resContestItem){
								if(req.session.user == null) {
									res.render('block/font-end/contest_detail', {
										title : "List contests",
										user : null,
										resContestItem : resContestItem,
										resComments : resComments,
										resLocation : resLocation,
										css_selected : "timeline"
									});
								}else{
									res.render('block/font-end/contest_detail', {
										title : "List contests",
										user : req.session.user,
										resContestItem : resContestItem,
										resComments : resComments,
										resLocation : resLocation,
										css_selected : "timeline"
									});
								}
							}else{
								res.send('url not correct!', 200);
							}
						});
					});
				}else if(req.query.tab=="brief"){
					CM.getItemContest(id_contest, function(errContestItem, resContestItem){
						if(resContestItem){
							if(req.session.user == null) {
								res.render('block/font-end/contest_detail_brief', {
									title : "List contests",
									user : null,
									resContestItem : resContestItem,
									resLocation : resLocation,
									css_selected : "brief"
								});
							}else{
								res.render('block/font-end/contest_detail_brief', {
									title : "List contests",
									user : req.session.user,
									resContestItem : resContestItem,
									resLocation : resLocation,
									css_selected : "brief"
								});
							}
						}else{
							res.send('url not correct!', 200);
						}
					});
				}else if(req.query.tab=="proposal"){
					CM.getItemContest(id_contest, function(errContestItem, resContestItem){
						CM.getListProposalContest(id_contest, 20, 0, function(errProposalContest, resProposalContest){
							if(resContestItem){
								if(req.session.user == null) {
									res.render('block/font-end/contest_detail_proposal', {
										title : "List contests",
										user : null,
										resContestItem : resContestItem,
										resProposalContest : resProposalContest,
										resLocation : resLocation,
										css_selected : "proposal"
									});
								}else{
									res.render('block/font-end/contest_detail_proposal', {
										title : "List contests",
										user : req.session.user,
										resContestItem : resContestItem,
										resProposalContest : resProposalContest,
										resLocation : resLocation,
										css_selected : "proposal"
									});
								}
							}else{
								res.send('url not correct!', 200);
							}
						});
					});
				}else{
					res.send('url not correct!', 200);
				}
			});
		}else{
			res.send('url not correct!', 200);
		}
	});
	// Change status image of contest
	app.post('/change_avatar_contest_image', function(req, res){
		if(req.session.user==null){
		}else{
			var id_contest = req.param('id_contest');
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
				CM.updateAvatarContest(id_contest, docImage, function(errContest, resContest){
					var image = '/upload/profile_avatar?type=resize&width=130&height=130&name='+docImage.public_id+'.'+docImage.format+'';
					res.send(image, 200);
				});
			});
		}
	});
	// Change status image for banner
	app.post('/change_banner_contest_image', function(req, res){
		if(req.session.user==null){
			res.send('Login to continue!',200);
		}else{
			var id_contest = req.param('id_contest');
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
				CM.updateBannerContest(id_contest, docImage, function(errContest, resContest){
					var image = '/upload/profile_avatar?type=resize&width=1024&height=300&name='+docImage.public_id+'.'+docImage.format+'';
					res.send(image, 200);
				});
			});
		}
	});
	// Form comment contest and upload image for form comment contest
	app.post('/post_comment_contest', function(req, res){
		if(req.session.user==null){
			res.send('Login to continue!',200);
		}else{
			var id_contest = req.param('id_contest');
			var type = req.param('contest_post_type');
			if(type==0){
				// Begin save comment contest
				var addDate = moment(new Date());
				var time_add = addDate.format('YYYY-MM-DD hh:mm:ss');
				
				var d = new Date();
				var n = d.getTime();
				// File up load
				var file_all = new Array();
				var num_file = req.param('id_file');
				if(num_file>0){
					if(num_file==1){
						var do_file = {
							public_id: req.param('public_id')[0],
							format: req.param('format')[0],
							created_at: req.param('created_at')[0],
							bytes: req.param('bytes')[0],
							type: 'contests'
						};
						file_all.push(do_file);
					}else{
						for(var i=0;i<num_file;i++){
							var do_file = {
								public_id: req.param('public_id')[0][i],
								format: req.param('format')[0][i],
								created_at: req.param('created_at')[0][i],
								bytes: req.param('bytes')[0][i],
								type: 'contests'
							};
							file_all.push(do_file);
						}
					}
				}
				var documentWall = {
					"time_add" : time_add,
					"type" : 0,//contest comment
					"driver"  : 1,
					"id_object" : req.param('id_contest'),
					"user_id" : req.session.user._id,
					"user_image" : req.session.user.avatar,
					"user_fullname" : req.session.user.last_name+" "+req.session.user.first_name,
					"comment" : req.param('f_comment_contest'),
					"time_sort" : n,
					"file" : file_all 
				};
				CM.insertCommentContest(documentWall, function(errComment, resComment){
					res.send('resComment', 200);
				});
				// End save
			}else{
				IM.uploadimage('contests',req.files.ac_img[0], function(errImage, dataImage){
					res.render('block/font-end/block/contests/contest_image_comment', {
						dataImage:dataImage
					});
				});
			}
		}
	});
	//--------------------------------------
	// router admin home page
	//--------------------------------------
	app.get('/getFormProposal', function (req, res) {
		var id_contest = req.query.id;
		res.render('block/font-end/block/contests/contest_proposal', {
			id_contest:id_contest
		});
	});
	
	//--------------------------------------
	// router add proposal for comment
	//--------------------------------------
	app.post('/storeContestProposal', function (req, res) {
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
				//
				var id_job = req.param('contest_id');
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
					project_id : req.param('contest_id'),
					proposal_description : req.param('des_proposal'),
					file_up : file_all,
					user_info : user_info, 
					date_add : addDate.format('YYYY-MM-DD hh:mm:ss'),
					date_spam : n,
					date_update : n,
				};
				CM.insertProposal(document, function(errProposal, resProposal){
					res.send('success',200);
				});
			}else{
				IM.uploadimage('proposals',req.files.files_proposal[0], function(errFile, resFile){
					res.render('block/font-end/block/jobs/file', {
						resFile:resFile
					});
				});
			}
		}else{
			res.send('not-login',200);
		}
	});
}