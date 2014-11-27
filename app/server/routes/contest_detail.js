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
							CM.getContestDefault(6, 0, function(errSimilarContest, resSimilarContest){
								CM.getListLikeContest(id_contest,21, 0, function(errListLike, resListLike){
									if(resContestItem){
										if(req.session.user == null) {
											res.render('block/font-end/contest_detail', {
												title : "List contests",
												user : null,
												resContestItem : resContestItem,
												resComments : resComments,
												resLocation : resLocation,
												css_selected : "timeline",
												resSimilarContest : resSimilarContest,
												resLikeTest : null,
												resListLike : resListLike
											});
										}else{
											CM.testLikeContestOfUser(id_contest,req.session.user._id, function(errLikeTest, resLikeTest){
												res.render('block/font-end/contest_detail', {
													title : "List contests",
													user : req.session.user,
													resContestItem : resContestItem,
													resComments : resComments,
													resLocation : resLocation,
													css_selected : "timeline",
													resSimilarContest : resSimilarContest,
													resLikeTest : resLikeTest,
													resListLike : resListLike
												});
											});
										}
									}else{
										res.send('url not correct!', 200);
									}
								});
							});
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
									css_selected : "brief",
									resLikeTest : null
								});
							}else{
								CM.testLikeContestOfUser(id_contest,req.session.user._id, function(errLikeTest, resLikeTest){
									res.render('block/font-end/contest_detail_brief', {
										title : "List contests",
										user : req.session.user,
										resContestItem : resContestItem,
										resLocation : resLocation,
										css_selected : "brief",
										resLikeTest : resLikeTest
									});
								});
							}
						}else{
							res.send('url not correct!', 200);
						}
					});
				}else if(req.query.tab=="proposal"){
					CM.getItemContest(id_contest, function(errContestItem, resContestItem){
						CM.getListProposalContest(id_contest, 12, 0, function(errProposalContest, resProposalContest){
							if(resContestItem){
								CM.countAllProposals(id_contest, function(errNumProposal, resNumProposal){
									if(req.session.user == null) {
										res.render('block/font-end/contest_detail_proposal', {
											title : "List contests",
											user : null,
											resContestItem : resContestItem,
											resProposalContest : resProposalContest,
											resLocation : resLocation,
											css_selected : "proposals",
											resNumProposal : resNumProposal,
											resLikeTest : null
										});
									}else{
										CM.testLikeContestOfUser(id_contest,req.session.user._id, function(errLikeTest, resLikeTest){
											res.render('block/font-end/contest_detail_proposal', {
												title : "List contests",
												user : req.session.user,
												resContestItem : resContestItem,
												resProposalContest : resProposalContest,
												resLocation : resLocation,
												css_selected : "proposals",
												resNumProposal : resNumProposal,
												resLikeTest : resLikeTest
											});
										});
									}
								});
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
					res.render('block/font-end/contest/item_comment', {
						resComments : resComment[0],
						user : req.session.user
					});
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
			var type_submit = req.param('contest_post_type_s');
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
				CM.countAllProposals(req.param('contest_id'), function(errNum, resNum){
					var document = {
						project_id : req.param('contest_id'),
						proposal_description : req.param('des_proposal'),
						file_up : file_all,
						user_info : user_info, 
						date_add : addDate.format('YYYY-MM-DD hh:mm:ss'),
						status: 0,
						date_spam : n,
						date_update : n,
						num : resNum
					};
					CM.insertProposal(document, function(errProposal, resProposal){
						res.send('success',200);
					});
				});
			}else{
				IM.uploadimage('proposals',req.files.files_proposal[0], function(errFile, resFile){
					res.render('block/font-end/block/jobs/file_contest_proposal', {
						resFile:resFile
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
	app.get('/updateStateProposal', function (req, res) {
		if(req.session.user != null) {
			var id_contest = req.query.id_contest;
			var id_proposal = req.query.id_proposal;
			var state = req.query.state;
			if(id_contest!=undefined && id_proposal!=undefined){
				CM.updateStateProposalModel(id_proposal, state, function(errProItem, resProItem){
					res.send('ok', 200);
				});
			}else{
				res.send('Not correct!', 200);
			}
		}else{
			res.send('Login to continue!', 200);
		}
	});
	
	//--------------------------------------
	// get update status of contest
	//--------------------------------------
	app.get('/updateStateConstestFontEnd', function (req, res) {
		if(req.session.user != null) {
			var id_contest = req.query.id_contest;
			var state = req.query.state;
			if(id_contest!=undefined && state!=undefined){
				CM.updateStatusContest(id_contest, state, function(errProItem, resProItem){
					res.send('ok', 200);
				});
			}else{
				res.send('Not correct!', 200);
			}
		}else{
			res.send('Login to continue!', 200);
		}
	});
	
	//--------------------------------------
	// Get proposal detail
	//--------------------------------------
	app.get('/proposal-detail', function (req, res) {
		var id_proposal = req.query.id;
		CM.getProposalId(id_proposal, function(errProItem, resProItem){
			var num_all = resProItem.file_up.length;
			var num_next = 0;
			var num_last = 0;
			if(num_all!=undefined){
				if(num_all>1){
					num_next = 1;
					num_last = num_all - 1;
				}
			}
			if(req.session.user == null) {
				res.render('block/font-end/contest/proposal', {
					resProItem:resProItem,
					user : null,
					num_all : num_all,
					num_next : num_next,
					num_last : num_last
				});
			}else{
				res.render('block/font-end/contest/proposal', {
					resProItem : resProItem,
					user : req.session.user,
					num_all : num_all,
					num_next : num_next,
					num_last : num_last
				});
			}
		});
	});
	//--------------------------------------
	// Get proposal detail
	//--------------------------------------
	app.post('/comment_proposal_post', function (req, res) {
		if(req.session.user) {
			var user = req.session.user;
			var id_proposal = req.param('id_proposal');
			var text = req.param('content_comment_proposal');
			var addDate = moment(new Date());
			var d = new Date();
			var n = d.getTime();
			if(text.length>0){
				var document = {
					user_info : {user_id : user._id, user_av : user.avatar, user_name_f : user.first_name, user_name_l : user.last_name},
					text : text,
					date_spam : n,
					date_update : addDate.format('YYYY-MM-DD hh:mm:ss')
				};
				CM.pushCommentForProposal(id_proposal, document,function(errProItem, resProItem){
					res.render('block/font-end/contest/item_comment_proposal', {
						resProItem : document
					});
				});
			}
		}else{
			res.send('Login to continue!', 200);
		}
	});
	
	//--------------------------------------
	// Get proposal detail
	//--------------------------------------
	app.get('/likeProposal', function (req, res) {
		if(req.session.user) {
			var user = req.session.user;
			var id_proposal = req.query.id_proposal;
			if(id_proposal!=undefined){
				var d = new Date();
				var n = d.getTime();
				var document = {
					user_id : user._id, 
					user_av : user.avatar, 
					user_name_f : user.first_name, 
					user_name_l : user.last_name,
					date_spam : n,
					date_update : n
				};
				CM.pushLikeForProposalID(id_proposal, document,function(errProItem, resProItem){
					res.send('ok', 200);
				});
			}else{
				res.send('Url not avalid!', 200);
			}
		}else{
			res.send('Login to continue!', 200);
		}
	});
	
	// Like contest
	app.get('/like-contest', function (req, res) {
		if(req.session.user) {
			var id_contest = req.query.id;
			var d = new Date();
			var n = d.getTime();
			if(id_contest!=undefined){
				var user = req.session.user;
				var document = {
					constest_id : id_contest,
					user_info : {user_id:user._id,user_av:user.avatar, user_name_f:user.first_name,user_name_l:user.last_name},
					date_spam : n,
					date_update : n
				};
				CM.addLikeContest(document,function(errItem, resItem){
					res.send('ok', 200);
				});
			}else{
				res.send('Url not correct!', 200);
			}
		}else{
			res.send('login to continue!', 200);
		}
	});
	// Get proposal 
	app.get('/get_file_proposal', function (req, res) {
		var id_proposal = req.query.id_proposal;
		var num = parseInt(req.query.num);
		CM.getProposalId(id_proposal, function(errProItem, resProItem){
			var num_all  = parseInt(resProItem.file_up.length);
			var num_next = 0;
			var num_last = 0;
			if(num==0){
				num_next  = 1;
				num_last = num_all - 1;
			}else if(num == (num_all-1)){
				num_next  = 0;
				num_last = num-1;
			}else{
				num_next  = num+1;
				num_last = num-1;
			}
			res.render('block/font-end/contest/file_proposal_view', {
				resProItem : resProItem,
				num_next : num_next,
				num_last : num_last,
				num : num
			});
		});
	});
	
}