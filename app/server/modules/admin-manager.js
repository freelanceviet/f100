var Mogodb   	  = require('../mongodb/connection');
var accounts	  = Mogodb.account;
var friends		  = Mogodb.friends;
var messages      = Mogodb.messages;
var user_status	  = Mogodb.user_status;
var crypto   	  = Mogodb.crypto;
var moment   	  = Mogodb.moment;
var friend_connec = Mogodb.friend_connec;
var places		  = Mogodb.places;
var images		  = Mogodb.images; 
var wall		  = Mogodb.wall;
var likes		  = Mogodb.likes;
var ObjectID	  = Mogodb.ObjectID;
var img_chat      = Mogodb.img_chat;
var room_map      = Mogodb.room_map;
var comment       = Mogodb.comment;
var citys         = Mogodb.citys;
var trips         = Mogodb.trips;
var tags          = Mogodb.tags;
// exports.ensureIndexUser = function(callback){
	// places.ensureIndex({ "coordinate": "2d" }, 
        // function(err, result) {        
            // callback(null,"ssssssssssssssssssssssssssssssssss"); 
    // });
// };
// get trips of tag and city
exports.getAllTripTagOfCity = function(code_city, tag_id, limit, skip, callback){
	trips.find({$and:[{"citys":code_city},{"tags":tag_id}]})
	.limit(parseInt(limit))
	.skip(parseInt(skip))
	.sort([['time_sort', 'desc']])
	.toArray(function(err, items) 
	{
		if(items){
			callback(null,items);
		}else{
			callback(null,null);
		}
	});
};
// get birth day or user
exports.getBirthDayOfUser = function(user_id, callback){
	accounts.findOne({_id:new ObjectID(user_id)},{day:1, month:1,year:1}, function(eAccountRe, oAccountRe) {
		if(oAccountRe){
			callback(null,oAccountRe);
		}else{
			callback(null,null);
		}
	});
};
// update sex of user
exports.updateSexUser = function(user_id, value , callback){
	accounts.update({_id:new ObjectID(user_id)}, {$set: {sex:value}}, {multi:true}, function(err,res) {
		callback(null,res);
	});
};
// update marriage of user
exports.updateMarriageUser = function(user_id, value , callback){
	accounts.update({_id:new ObjectID(user_id)}, {$set: {marriage:value}}, {multi:true}, function(err,res) {
		callback(null,res);
	});
};
// update phone of user
exports.updatePhoneOfUser = function(user_id, value , callback){
	accounts.update({_id:new ObjectID(user_id)}, {$set: {phone:value}}, {multi:true}, function(err,res) {
		callback(null,res);
	});
};
// update birth of user
exports.updateBirthUser = function(user_id,type, value , callback){
	if(type="day"){
		accounts.update({_id:new ObjectID(user_id)}, {$set: {day:value}}, {multi:true}, function(err,res) {
			callback(null,res);
		});
	}else if(type="month"){
		accounts.update({_id:new ObjectID(user_id)}, {$set: {month:value}}, {multi:true}, function(err,res) {
			callback(null,res);
		});
	}else if(type="year"){
		accounts.update({_id:new ObjectID(user_id)}, {$set: {year:value}}, {multi:true}, function(err,res) {
			callback(null,res);
		});
	}
};
// get tag of trip
exports.getTagInfo = function(tag_id, callback){
	tags.findOne({_id:new ObjectID(tag_id)}, function(err, res) {
		if(res){
			callback(null,res);
		}else{
			callback(null,null);
		}
	});
};
// get info of city
exports.getCity = function(code_city, callback){
	citys.findOne({code:code_city}, function(err, res) {
		if(res){
			callback(null,res);
		}else{
			callback(null,null);
		}
	});
};
// get all trips of city
exports.getAllTripOfCity = function(code_city, limit, skip, callback){
	trips.find({"citys":code_city})
	.limit(parseInt(limit))
	.skip(parseInt(skip))
	.sort([['time_sort', 'desc']])
	.toArray(
		function(e, res) {
		if (e) callback(e)
		else callback(null, res)
	});
};
// get all tags 
exports.getAllTagsTrip = function(callback){
	tags.find({})
	.toArray(
		function(e, res) {
		if (e) callback(e)
		else callback(null, res)
	});
};
// get all trips
exports.getAllTrips = function(limit, skip, callback){
	trips.find({})
	.limit(parseInt(limit))
	.skip(parseInt(skip))
	.sort([['time_sort', 'desc']])
	.toArray(
		function(e, res) {
		if (e) callback(e)
		else callback(null, res)
	});
};
// get all city
exports.getAllCitys = function(callback){
	citys.find({},{code:1,name:1,name_en:1,alias:1,image:1}).toArray(
		function(e, res) {
		if (e) callback(e)
		else callback(null, res)
	});
};
// get User for coordinate
exports.getAllFriendsCo = function(coordinate, limit, skip, arrId_friend,callback){
	var arr =  new Array();
	for(var i=0;i<arrId_friend.length;i++){
		arr.push(new ObjectID(arrId_friend[i].toString()));
	}
	accounts.find({coordinate: {$near:[parseFloat(coordinate[0]),parseFloat(coordinate[1])],$maxDistance :1},_id : { $in : arr }})
		.limit(parseInt(limit))
		.skip(parseInt(skip))
		.toArray(function(err, results) {
			if(results){
				callback(null,results);
			} else {
				callback(null,null);
			}
		});
};
// add new account
exports.addNewAccount = function(newData, callback){
	accounts.findOne({email:newData.email}, function(e, o) {
		if (o){
			callback('username-taken');
		}else{
			saltAndHash(newData.pass, function(hash){
				newData.pass = hash;
			// append date stamp when record was created //
				newData.date = moment().format('MMMM Do YYYY, h:mm:ss a');
				accounts.insert(newData, {safe: true}, callback);
			});
		}
	});
}
// auto login
exports.autoLogin = function(email,pass,callback)
{
	accounts.findOne({email:email},function(e,o){
		if(0){
			o.pass = pass ? callback(o):callback(null);
		}else{
			callback(null);
		}
	});
}

//manualLogin
exports.manualLogin = function(email,pass,callback){
	accounts.findOne({email:email}, function(e,o){
		if (o == null){
			callback('user-not-found');
		}	else{
			validatePassword(pass, o.pass, function(err, res) {
				if (res){
					callback(null, o);
				}	else{
					callback('invalid-password');
				}
			});
		}
	});
}
//remove item on chats colection
exports.removeUserChatSocket = function(id,callback){
	user_status.remove({user_id:id},function(err, result) {
		callback(null,result);
	});
}
//
exports.getAllRecordsAccount = function(callback){
	accounts.find().toArray(
		function(e, res) {
		if (e) callback(e)
		else callback(null, res)
	});
};
//
exports.getAllRecordsOnlineStatus = function(callback)
{
	user_status.find().toArray(
		function(e, res) {
		if (e) callback(e)
		else callback(null, res)
	});
};
// ------------------------------------
// Get all record chat image
// document: 
// callback:
// ------------------------------------
exports.getAllChatIcon = function(callback){
	img_chat.find({})
	.toArray(function(err, items) {
		if(items){
			callback(null,items);
		}else{
			callback(null,null);
		}
	});
};
// ------------------------------------
// Get all record friend of id user
// document: id of user login
// callback: json list record of user id
// ------------------------------------
exports.getAllRecordFriendOfId = function(id_user,callback)
{
	friends.find({$and:[{user_id_se:''+id_user+''},{status:1}]})
	.toArray(function(err, items) 
	{
		if(items){
			callback(null,items);
		}else{
			callback(null,null);
		}
	});
};
// ------------------------------------
// Get info location of place
// document: 
// callback:
// ------------------------------------
exports.getAllInfoPlaceUser = function(arrIdFriend,callback){
	var arr_IdObject = new Array();
	for(var i=0;i<arrIdFriend.length;i++){
		arr_IdObject.push(new ObjectID(arrIdFriend[i]));
	}
	accounts.find({_id:{$in:arr_IdObject}},{coordinate:1,hm_vicinity:1,hm_city:1})
		.toArray( function(e, res) {
			callback(null,res);
	});
};
// ------------------------------------
// Get all user online of user id
// document: 
// callback: array list record of user id
// ------------------------------------
exports.getAllRecordsFriendOnline = function(arrIdFriend,callback){
	user_status.find({user_id:{$in:arrIdFriend}},{user_id:1})
		.toArray( function(e, res) {
			var arr =  new Array();
			for(var i=0;i<res.length;i++){
				arr.push(res[i].user_id.toString());
			}
			if(res){
				callback(null,arr);
			}else{
				callback(null,null);
			}
		});
};
// ------------------------------------
// Get all account waiting accept
// document: 
// callback: array list record of user id
// ------------------------------------
exports.getAllAccountWaitingAccept = function(id_user,callback)
{
	friends.find({$or:[{$and:[{user_id_se:''+id_user+''},{status:0}]}, {$and:[{user_id_se:''+id_user+''},{status:3}]}]})
	.sort([['addtime', 'desc']])
	.toArray(function(err, items) 
	{
		if(items){
			// update status filed of friends collection to 3 
			friends.update({$and:[{user_id_se: id_user},{status:0}]}, {$set: {status:3}}, {multi:true}, function(err) {
				
			});
			callback(null,items);
		}else{
			callback(null,null);
		}
	});
};

// ------------------------------------
// Get all message of account
// document: 
// callback: array list record of user id
// ------------------------------------
exports.getAllMessageOfAccount = function(id_user,callback)
{
	messages.find({$or:[{$and:[{user_id_se:''+id_user+''},{status:0}]}, {$and:[{user_id_se:''+id_user+''},{status:3}]}]})
	.sort([['addtime', 'desc']])
	.toArray(function(err, items) 
	{
		if(items){
			// update status filed of friends collection to 3 
			messages.update({$and:[{user_id_se: id_user},{status:0}]}, {$set: {status:3}}, {multi:true}, function(err) {
				
			});
			callback(null,items);
		}else{
			callback(null,null);
		}
	});
};

// ------------------------------------
// Get all message  chat of account
// document: 
// callback: array list record of user id
// ------------------------------------
exports.getAllMesChatOfAccount = function(id_user,callback){
	friend_connec.find({id_send:''+id_user+''})
	.sort([['time', 'desc']])
	.limit(20)
	.skip(0)
	.toArray(function(err, items) {
		if(items){
			callback(null,items);
		}else{
			callback(null,null);
		}
	});
};
// ------------------------------------
// Update status message chat 
// ------------------------------------
exports.updateMessageChatFriends = function(id_user,callback){
	friend_connec.update({$and:[{id_send: id_user},{status:0}]}, {$set: {status:3,flag:0}}, {multi:true}, function(err) {
		callback(null,null);		
	});
};

// ------------------------------------
// Get num of loi moi cua cac user khac
// note: chi lay nhung sataus co bang 0 thoi may chu
// callback: num of count
// ------------------------------------
exports.countAccountWaitingAccept = function(id_user,callback){
	friends.find({$and:[{user_id_se:''+id_user+''},{status:0}]}).count(
		function(err, result) {
			callback(null,result);
		}
	);
};

// ------------------------------------
// Get num of loi moi cua cac user khac
// note: chi lay nhung sataus co bang 0 thoi may chu
// callback: num of count
// ------------------------------------
exports.countMesageOfAcount = function(id_user,callback){
	messages.find({$and:[{user_id_se:''+id_user+''},{status:0}]}).count(
		function(err, result) {
			callback(null,result);
		}
	);
};

// ------------------------------------
// Update status and add item when accept
// document: 
// callback: 
// ------------------------------------
exports.updateAccountWaitingAccept = function(user_id_se,user_id_re,callback){
	friends.update({$and:[{user_id_se: user_id_se},{user_id_re:user_id_re}]}, {$set: {status:1}}, {multi:false}, function(err) {
		// create new document to user_id_re
		accounts.findOne({_id:new ObjectID(user_id_se)}, function(eAccountRe, oAccountRe) {
			var addDate = moment(new Date());
			var document = {
				"user_id_se" : ""+user_id_re+"",
				"user_id_re" : ""+user_id_se+"",
				"fullname" : oAccountRe.last_name+' '+oAccountRe.first_name,
				"imglink" : oAccountRe.avatar,
				"addtime" : addDate.format('YYYY-MM-DD hh:mm:ss'),
				"status" : 1
			};
			friends.insert(document, function(errDocument, resDocument){
				var document_mes = {
					"user_id_se" : ""+user_id_re+"",
					"user_id_re" : ""+user_id_se+"",
					"fullname" : oAccountRe.last_name+' '+oAccountRe.first_name,
					"imglink" : oAccountRe.avatar,
					"addtime" : addDate.format('YYYY-MM-DD hh:mm:ss'),
					"type":1,
					"message":"Đã chấp nhận yêu cầu của bạn. Viết lên dòng thời gian của "+oAccountRe.last_name+' '+oAccountRe.first_name,
					"icon":"OpnXm-HZHKy.gif",
					"status" : 0
				};
				messages.insert(document_mes, function(errdocument_mes, resdocument_mes){
					callback(null,resdocument_mes);
				});
			});
		});		
	});
}

// ------------------------------------
// Get list friends auto complete
// document: no
// callback: arr result
// ------------------------------------
exports.getDataFriendAuto = function(key,callback){
	var temp = key;
	var arrPlacesVsFriends = new Array();
	places.find({'place_name_':{'$regex': ''+temp+'','$options':'ig'}})
	.limit(8)
	.skip(0)
	.toArray( function(errPlace, resPlace) {
		if(resPlace.length){
			if(resPlace.length<8){
				var num = resPlace.length;
				for(var i=0;i<num;i++){
					arrPlacesVsFriends.push(resPlace[i]);
				}
				var sub_sea = 8-num;
				accounts.find({'search_name':{'$regex': ''+temp+'','$options':'ig'}},{"_id":1,"first_name":1,"last_name":1,"avatar":1,"hm_vicinity":1,"hm_city":1,"day":1,"month":1,"year":1,"hm_vicinity":1,"hm_city":1})
				.limit(sub_sea)
				.skip(0)
				.toArray( function(errUser, resUser) {
					if(resUser){
						for(var j=0;j<resUser.length;j++){
							arrPlacesVsFriends.push(resUser[j]);
							if(j==resUser.length-1){
								callback(null,arrPlacesVsFriends);
							}
						}
					}else{
						callback(null,arrPlacesVsFriends);
					}
				});
			}else{
				callback(null,resPlace);
			}
		}else{
			accounts.find({'search_name':{'$regex': ''+temp+'','$options':'ig'}},{"_id":1,"first_name":1,"last_name":1,"avatar":1,"hm_vicinity":1,"hm_city":1,"day":1,"month":1,"year":1,"hm_vicinity":1,"hm_city":1})
			.limit(8)
			.skip(0)
			.toArray( function(e, res) {
				if(res){
					console.log('y');
					callback(null,res);
				}else{
					callback(null,null);
				}
			});
		}
	});
};
// ------------------------------------
// Get all friend of _id user
// document: 
// callback: arr result
// ------------------------------------

exports.insertDocumentFriendKetban = function(id_se, id_re ,callback){
	accounts.findOne({_id:new ObjectID(id_re)}, function(err, res) {
			var addDate = moment(new Date());
			var document = {
			  "user_id_se" : ""+id_se+"",
			  "user_id_re" : ""+id_re+"",
			  "fullname"   : res.first_name+" "+res.last_name,
			  "imglink"    : res.avatar,
			  "addtime"    : addDate.format('YYYY-MM-DD hh:mm:ss'),
			  "status"     : 0
			};
			friends.insert(document, function(errDocument, resDocument){
				callback(null,resDocument);
			});
	});
};

// ------------------------------------
// Get all info of a account
// document: 
// callback: document
// ------------------------------------
exports.infoUser = function(_id, callback)
{
	accounts.findOne({_id:new ObjectID(_id)}, function(err,res){
		if (res){
			callback(null,res);
		}else{
			callback(null,null);
		}
	});
}



// ------------------------------------
// Get all friend of _id user
// document: 
// callback: arr result
// ------------------------------------

exports.getAllFriend_id = function(id_user,callback){
	friends.find({$and:[{user_id_se:''+id_user+''},{status:1}]})
	.limit(9)
	.skip(0)
	.toArray( function(e, res) {
		if(res){
			callback(null,res);
		}else{
			callback(null,null);
		}
	});
};

exports.getAllFriendCurrent = function(user,num,arr,callback){
	var arrPlace = new Array();
	for(var i=0;i<arr.length;i++){
		arrPlace.push(new ObjectID(arr[i]));
	}
	if(num<=1000){
		var arrUser = new Array();
		var arrTemp1 = new Array();
		var arrTemp2 = new Array();
		var arrTemp3 = new Array();
		accounts.find({$and:[{hm_vicinity:''+user.hm_vicinity+''},{'_id': { $nin: arrPlace}}]},{first_name:1,last_name:1,hm_vicinity:1,hm_city:1,avatar:1})
		.limit(10)
		.skip(0)
		.toArray( function(e, res) {
			for(var i=0;i<res.length;i++){
				arrUser.push(res[i]);
			}
			arrTemp1 = arrUser;
			if(arrUser.length==10){
				callback(null,arrUser);
			}else{
				accounts.find({$and:[{hm_city:''+user.hm_city+''},{'_id': { $nin: arrPlace}}]},{first_name:1,last_name:1,hm_vicinity:1,hm_city:1,avatar:1})
				.limit(10)
				.skip(0)
				.toArray( function(eTP,resTP) {
					for(var i=0;i<resTP.length;i++){
						var temp = 0;
						for(var j=0;j<arrTemp1.length;j++){
							if(arrTemp1[j].email==resTP[i].email){
								temp = 1;
							}
						}
						if(temp==0){
							arrUser.push(resTP[i]);
						}
					}
					arrTemp2 = arrUser;
					if(arrUser.length==10){
						callback(null,arrUser);
					}else{
						accounts.find({$and:[{hm_country:''+user.hm_country+''},{'_id': { $nin: arrPlace}}]},{first_name:1,last_name:1,hm_vicinity:1,hm_city:1,avatar:1})
						.limit(10)
						.skip(0)
						.toArray( function(eCo, resCo) {
							for(var i=0;i<resCo.length;i++){
								var temp = 0;
								for(var j=0;j<arrTemp2.length;j++){
									if(arrTemp2[j].email==resCo[i].email){
										temp = 1;
									}
								}
								if(temp==0){
									arrUser.push(resCo[i]);
								}
							}
							callback(null,arrUser);
						});
					}
				});
			}
		});
	}else{
		callback(null,null);
	}
};

// ------------------------------------
// Count all friends of user
// document: 
// callback: arr result
// ------------------------------------
exports.countAllFriends = function(id_user,callback){
	friends.find({$and:[{user_id_se:''+id_user+''},{status:1}]}).count(
		function(err, result) {
			callback(null,result);
		}
	);
};

// ------------------------------------
// Test exits account is friends
// document: 
// callback: status or null
// ------------------------------------
exports.testExitsIsFriends = function(id_now, id_friend, callback){
	friends.findOne({$and:[{user_id_se:''+id_now+''},{user_id_re:id_friend}]}, function(err,res){
		if (res){
			callback(null,res.status);
		}else{
			callback(null,null);
		}
	});
	
}
exports.testExitsIsFriendsWaiting = function(id_now, id_friend, callback){
	friends.findOne({$and:[{user_id_re:''+id_now+''},{user_id_se:id_friend}]}, function(err,res){
		if (res){
			callback(null,res.status);
		}else{
			callback(null,null);
		}
	});
	
}

// ------------------------------------
// Test exits account is accounts collection
// document: 
// callback: status or null
// ------------------------------------
exports.testExitsAccountFaceBook = function(idFace, callback){
	accounts.findOne({face_id:idFace}, function(err, res) {
		if(res){
			callback(null,res);
		}else{
			callback(null,null);
		}
	});
}
// ------------------------------------
// Insert document account face to collection
// document: 
// callback: document
// ------------------------------------
exports.insertAccountFace = function(document, callback){
	accounts.insert(document, function(errDocument, resDocument){
		if(resDocument){
			callback(null,resDocument[0]);
		}else{
			callback(null, null);
		}
	});
}
// ------------------------------------
// Get num of message not view
// note: chi lay nhung sataus bang 0 nghe chu em
// callback: num of count
// ------------------------------------
exports.countMesChatOfAcount = function(id_user,callback){
	friend_connec.find({$and:[{id_send:''+id_user+''},{status:0}]}).count(
		function(err, result) {
			callback(null,result);
		}
	);
};
// ------------------------------------
// get List message not view
// note: 
// callback: array
// ------------------------------------
exports.getListMesChatOfAccount = function(id_user,callback){
	friend_connec.find({$and:[{id_rece:''+id_user+''},{status:0}]})
	.toArray( function(e, res) {
		if(res){
			callback(null,res);
		}else{
			callback(null,null);
		}
	});	
};
// ------------------------------------
// get List place of account created
// note: 
// callback: array
// ------------------------------------
exports.getListPlaceOfAccountCreated = function(id_user, limit, skip, callback){
	places.find({user_id:''+id_user+''})
	.limit(limit)
	.skip(skip)
	.sort([['time_sort', 'desc']])
	.toArray( function(e, res) {
		if(res){
			callback(null,res);
		}else{
			callback(null,null);
		}
	});	
};
// ------------------------------------
// count place of user created
// note: 
// callback: array
// ------------------------------------
exports.countPlaceCreated = function(id_user, callback){
	places.find({user_id:''+id_user+''}).count(
		function(err, result) {
			callback(null,result);
		}
	);
};
// ------------------------------------
// Update message chat
// note: 
// callback: true or false
// ------------------------------------
exports.updateMessageChat = function(id_send, id_rece, content,callback){
	var addDate = moment(new Date());
	friend_connec.update({$and:[{id_send:id_send},{id_rece:id_rece}]}, {$set: {content: content, time:addDate.format('YYYY-MM-DD hh:mm:ss'), status:1}}, {w:1}, function(err) {
		friend_connec.update({$and:[{id_send:id_rece},{id_rece:id_send}]}, {$set: {content: content, time:addDate.format('YYYY-MM-DD hh:mm:ss'), status:1}}, {w:1}, function(err_) {
			callback('ok');
		});					
	});
};
// ------------------------------------
// Update message chat click event
// note: 
// callback: true or false
// ------------------------------------
exports.updateMessageChatClick = function(id_send, id_rece, callback){
	var addDate = moment(new Date());
	friend_connec.update({$and:[{id_send:id_rece},{id_rece:id_send}]}, {$set: {time:addDate.format('YYYY-MM-DD hh:mm:ss'), status:1}}, {w:1}, function(err) {
		friend_connec.update({$and:[{id_send:id_send},{id_rece:id_rece}]}, {$set: {time:addDate.format('YYYY-MM-DD hh:mm:ss'), status:1}}, {w:1}, function(err_) {
			callback('ok');
		});					
	});
};
// ------------------------------------
// Get status of list friends
// note: 
// callback:
// ------------------------------------
exports.getAllFriendStatus = function(_id,id_user,arr,callback){
	if(arr){
		var arrStatus =  new Array();
		var arrIdUser = new Array();
		var objectSum = {};
		friends.find({user_id_se:''+_id+''},{"user_id_re":1,"status":1})
		.toArray( function(e, res) {
			if(res){
				for(var i=0;i<arr.length;i++){
					var flag=0;
					var status = null;
					var id_get = ""
					for(var j=0;j<res.length;j++){
						if(arr[i].user_id_re==res[j].user_id_re){
							flag = 1;
							status = res[j].status;
							id_get = res[j].user_id_re;
							break;
						}
					}
					if(flag==1){
						arrStatus.push(id_get);
						arrIdUser.push(status);
					}
				}
				objectSum = {
					"arr_1":arrStatus,
					"arr_2":arrIdUser
				};
				callback(null,objectSum);
			}else{
				callback(null,null);
			}
		});
	}
};
exports.getAllFriendStatusSearchFriend = function(_id,arr,callback){
	if(arr){
		var arrStatus =  new Array();
		var arrIdUser = new Array();
		var objectSum = {};
		friends.find({user_id_se:''+_id+''},{"user_id_re":1,"status":1})
		.toArray( function(e, res) {
			if(res){
				for(var i=0;i<arr.length;i++){
					var flag=0;
					var status = null;
					var id_get = ""
					for(var j=0;j<res.length;j++){
						if(arr[i]._id==res[j].user_id_re){
							flag = 1;
							status = res[j].status;
							id_get = res[j].user_id_re;
							break;
						}
					}
					if(flag==1){
						arrStatus.push(id_get);
						arrIdUser.push(status);
					}
				}
				objectSum = {
					"arr_1":arrStatus,
					"arr_2":arrIdUser
				};
				callback(null,objectSum);
			}else{
				callback(null,null);
			}
		});
	}
};
// ------------------------------------
// Get status of list friends
// note: 
// callback:
// ------------------------------------
exports.getAllFriendStatus03 = function(id_user,callback){
	friends.find({$or:[{$and:[{user_id_re:''+id_user+''},{status:0}]}, {$and:[{user_id_re:''+id_user+''},{status:3}]}]},{user_id_se:1,status:1})
	.sort([['addtime', 'desc']])
	.toArray(function(err, items){
		if(items){
			callback(null,items);
		}else{
			callback(null,null);
		}
	});
};
// ------------------------------------
// Get list promotion
// note: 
// callback: arr list place
// ------------------------------------
exports.getListPromotion = function(arrInput, limit, skip, callback){
	var addDate 	= moment(new Date());
	var toDay   	= new Date(""+addDate.format('YYYY-MM-DD')+"");
	var HM_Lat 		= arrInput['HM_Lat'];
	var HM_Lon 		= arrInput['HM_Lon'];
	var HM_Country 	= arrInput['HM_Country'];
	var HM_City 	= arrInput['HM_City'];
	var HM_Vicinity = arrInput['HM_Vicinity'];
	var distance    = parseFloat(100/1000);
	//
	places.find({$and:[{$and:[{coordinate: {$within: {$center:[[parseFloat(HM_Lon),parseFloat(HM_Lat)],distance]}},"promotion.from": {$lt: toDay}}]},{"promotion.to": {$gte: toDay}}]},{image:1,name_place:1,place_name_:1,promotion:1})
		.limit(limit)
		.skip(skip)
		.toArray( function(erritems, items) {
			/////
			var sumDo = new Array();
			var sumdo1 = new Array();
			var sumdo2 = new Array();

			if(items){
				for(var i=0;i<items.length;i++){
					sumDo.push(items[i]);
				}
				sumDo1 = sumDo;
				if(sumDo.length==limit){
					callback(null,sumDo);
				}else{
					places.find({$and:[{$and:[{$and:[{country_short:''+HM_Country+''},{city:''+HM_City+''}]},{"promotion.from": {$lt: toDay}}]},{"promotion.to": {$gte: toDay}}]})
					.sort([['time_sort', 'desc']])
					.limit(parseInt(limit))
					.skip(parseInt(skip))
					.toArray(function(errLevel2, resLevel2)
					{
						for(var i=0;i<resLevel2.length;i++){
							var temp = 0;
							for(var j=0;j<sumDo1.length;j++){
								if(resLevel2[i].time_sort == sumDo1[j].time_sort){
									temp = 1;
								}
							}
							if(temp==0){
								sumDo.push(resLevel2[i]);
							}
						}
						sumDo2 = sumDo;
						if(sumDo.length==limit){
							callback(null,sumDo);
						}else{
							places.find({$and:[{$and:[{country_short:''+HM_Country+''},{"promotion.from": {$lt: toDay}}]},{"promotion.to": {$gte: toDay}}]})
							.sort([['time_sort', 'desc']])
							.limit(parseInt(limit))
							.skip(parseInt(skip))
							.toArray(function(errLevel3, resLevel3)
							{
								for(var i=0;i<resLevel3.length;i++){
									var temp = 0;
									for(var j=0;j<sumDo2.length;j++){
										if(resLevel3[i].time_sort==sumDo2[j].time_sort){
											temp = 1;
										}
									}
									if(temp==0){
										sumDo.push(resLevel3[i]);
									}
								}
								callback(null,sumDo);
							});
						}
					});
				}
			}else{
				callback(null,null);
			}
			/////
		});
};

// ------------------------------------
// Get list place new
// note: 
// callback: arr list place
// ------------------------------------
exports.getListPlaceNew = function(arrInput, limit, skip, callback){
	var addDate 	= moment(new Date());
	var toDay   	= new Date(""+addDate.format('YYYY-MM-DD')+"");
	var HM_Lat 		= arrInput['HM_Lat'];
	var HM_Lon 		= arrInput['HM_Lon'];
	var HM_Country 	= arrInput['HM_Country'];
	var HM_City 	= arrInput['HM_City'];
	var HM_Vicinity = arrInput['HM_Vicinity'];
	var distance    = parseFloat(1000/1000);
	//
	places.find({ coordinate :{ $near : [ parseFloat(HM_Lon) , parseFloat(HM_Lat)] , $maxDistance : distance} },{address:1,image:1,name_place:1,place_name_:1,time_sort:1} )
		.limit(limit)
		.skip(skip)
		.sort(['time_sort', 'desc'])
		.toArray( function(errItems, items) {
			////
			var sumDo = new Array();
			var sumdo1 = new Array();
			var sumdo2 = new Array();
			
			if(items){
				for(var i=0;i<items.length;i++){
					sumDo.push(items[i]);
				}
				sumDo1 = sumDo;
				if(sumDo.length==limit){
					callback(null,sumDo);
				}else{
					places.find({$and:[{country_short:''+HM_Country+''},{city:''+HM_City+''}]},{address:1,image:1,name_place:1,place_name_:1,time_sort:1})
					.sort([['time_sort', 'desc']])
					.limit(parseInt(limit))
					.skip(parseInt(skip))
					.toArray(function(errLevel2, resLevel2)
					{
						for(var i=0;i<resLevel2.length;i++){
							var temp = 0;
							for(var j=0;j<sumDo1.length;j++){
								if(resLevel2[i].time_sort == sumDo1[j].time_sort){
									temp = 1;
								}
							}
							if(temp==0){
								sumDo.push(resLevel2[i]);
							}
						}
						sumDo2 = sumDo;
						if(sumDo.length==limit){
							callback(null,sumDo);
						}else{
							places.find({country_short:''+HM_Country+''},{address:1,image:1,name_place:1,place_name_:1,time_sort:1})
							.sort([['time_sort', 'desc']])
							.limit(parseInt(limit))
							.skip(parseInt(skip))
							.toArray(function(errLevel3, resLevel3)
							{
								for(var i=0;i<resLevel3.length;i++){
									var temp = 0;
									for(var j=0;j<sumDo2.length;j++){
										if(resLevel3[i].time_sort==sumDo2[j].time_sort){
											temp = 1;
										}
									}
									if(temp==0){
										sumDo.push(resLevel3[i]);
									}
								}
								callback(null,sumDo);
							});
						}
					});
				}
			}else{
				callback(null,null);
			}
			////
		});
};

// ------------------------------------
// Get list image of place
// note: 
// callback: arr list image of place
// ------------------------------------
exports.getListImagePlace = function(id, limit, skip, callback){
	var LimitParse = parseInt(limit);
	var SkipParse  = parseInt(skip);
	images.find({user_id:id})
		.limit(LimitParse)
		.skip(SkipParse)
		.sort([['time_sort', 'desc']])
		.toArray( function(e, res) {
			if(res){
				callback(null,res);
			}else{
				callback(null,null);
			}
		});
};

// ------------------------------------
// Get activities of friends
// Note: 
// Callback: json
// ------------------------------------
exports.getWallUserFriends = function(arrIdFriend, limit, skip, callback){
	var limitParse = parseInt(limit);
	var skipParse  = parseInt(skip);
	wall.find({user_id:{$in:arrIdFriend}})
		.limit(limitParse)
		.skip(skipParse)
		.sort([['time_sort', 'desc']])
		.toArray( function(e, res) {
			if(res){
				callback(null,res);
			}else{
				callback(null,null);
			}
		});
};
// ------------------------------------
// Update place of user
// note:
// callback:
// ------------------------------------
exports.updateLocalUser = function(_id, lon, lat, hm_country, hm_city, hm_vicinity, callback){
	accounts.update({_id:new ObjectID(_id.toString())}, {$set: {coordinate:[lon,lat],hm_country:hm_country,hm_city:hm_city,hm_vicinity:hm_vicinity}}, {multi:true}, function(err, res) {
		if(res){
			callback(null,null);
		}else{
			callback(null,null);
		}
	});
};
// ------------------------------------
// Get number image of account 
// note:
// callback: num of count
// ------------------------------------
exports.countImageOfUser = function(id_user,callback){
	images.find({user_id:''+id_user+''}).count(
		function(err, result) {
			callback(null,result);
		}
	);
};

// ------------------------------------
// Get number image of activities
// note:
// callback: num of count
// ------------------------------------
exports.countImageOfActivi = function(id_ac,callback){
	images.find({id:''+id_ac+''}).count(
		function(err, result) {
			callback(null,result);
		}
	);
};
exports.countImageOfUserAlbum = function(id_user,callback){
	images.find({user_id:''+id_user+''}).count(
		function(err, result) {
			callback(null,result);
		}
	);
};

// ------------------------------------
// Get activities of friends
// Note: 
// Callback:
// ------------------------------------
exports.getAllLikeActivitiWallArrIdAc = function(arrActiviti,callback){
	var arr =  new Array();
	for(var i=0;i<arrActiviti.length;i++){
		arr.push(arrActiviti[i]._id.toString());
	}
	likes.find({$and:[{'object': { $in: arr}},{type:4}]})
	.toArray(function(errXX, resXX){
		if(resXX){
			callback(null,resXX);
		}else{
			callback(null,null);
		}
	});
};
// ------------------------------------
// Get item place 
// Note: 
// Callback:
// ------------------------------------
exports.getItemPlaceInfoUser = function(_id,callback){
	places.findOne({_id:new ObjectID(_id)}, {"_id":1,"name_place":1,"place_name_":1,"address":1}, function(ePlaceItem, oPlaceItem) {
		if(oPlaceItem){
			callback(null,oPlaceItem);
		}else{
			callback(null,null);
		}
	});
};
// ------------------------------------
// Get item place 
// Note: 
// Callback:
// ------------------------------------
exports.getItemPlaceIdSomeFiled = function(_id,callback){
	places.findOne({_id:new ObjectID(_id)}, {"_id":1,"name_place":1,"place_name_":1}, function(ePlaceItem, oPlaceItem) {
		if(oPlaceItem){
			callback(null,oPlaceItem);
		}else{
			callback(null,null);
		}
	});
};
//updatePlaceForAc
exports.updatePlaceForAc = function(id,items,callback){
	wall.update({_id:new ObjectID(id)}, {$push: {list_place:items}}, {multi:true}, function(err,res) {
		callback(null,res);
	});
};
// updateImageForAc
exports.updateImageForAc = function(id, items, num, callback){
	images.insert(items, function(errDocument, resDocument){
		var item_img = {
			"id_user" : ""+resDocument[0].user_id+"",
			"id_image" : ""+resDocument[0]._id+"",
			"version" : resDocument[0].version,
			"public_id" : resDocument[0].public_id,
			"format" : resDocument[0].format,
			"num":resDocument[0].num
		};
		if(num<4){
			wall.update({_id:new ObjectID(id)}, {$push: {list_image:item_img}}, {multi:true}, function(err,res) {
				callback(null,res);
			});
		}
	});
};
// Get all friends general
exports.friendGeneral = function(id, _id, callback){
	friends.find({$and:[{user_id_se:''+_id+''},{status:1}]},{user_id_re:1})
	.toArray(function(err, items){
		if(items){
			var arr = new Array();
			for(var i=0;i<items.length;i++){
				arr.push(items[i].user_id_re);
			}
			friends.find({$and:[{user_id_se:''+id+''},{user_id_se:{$in:arr}},{status:1}]})
			.toArray(function(errUser, resUser){
				if(resUser){
					callback(null, resUser);
				}else{
					callback(null, null);
				}
			});
		}else{
			callback(null,null);
		}
	});
};
// find one activiti 
exports.findOneActivi = function(id, callback){
	wall.findOne({_id:new ObjectID(id)}, function(errAc, resAc) {
		if(resAc){
			callback(null,resAc);
		}else{
			callback(null,null);
		}
	});
};
// update promotion
exports.insertPromotion = function(_id,document, callback)
{
	places.update({_id:new ObjectID(_id)}, {$set: {promotion:document}}, {multi:true}, function(err, res) {
		if(res){
			callback(null,res);
		}else{
			callback(null,null);
		}
	});
};
// update eduction
exports.setInfoForUserEduction1 = function(_id, document, callback){
	accounts.update({_id:new ObjectID(_id)}, {$set: {education1:document}}, {multi:true}, function(err, res) {
		if(res){
			callback(null,res);
		}else{
			callback(null,null);
		}
	});
}; 
exports.setInfoForUserEduction2 = function(_id, document, callback){
	accounts.update({_id:new ObjectID(_id)}, {$set: {education2:document}}, {multi:true}, function(err, res) {
		if(res){
			callback(null,res);
		}else{
			callback(null,null);
		}
	});
}; 
exports.setInfoForUserEduction3 = function(_id, document, callback){
	accounts.update({_id:new ObjectID(_id)}, {$set: {education3:document}}, {multi:true}, function(err, res) {
		if(res){
			callback(null,res);
		}else{
			callback(null,null);
		}
	});
};
exports.setInfoForUserEduction4 = function(_id, document, callback){
	accounts.update({_id:new ObjectID(_id)}, {$set: {education4:document}}, {multi:true}, function(err, res) {
		if(res){
			callback(null,res);
		}else{
			callback(null,null);
		}
	});
};
// update image of account
exports.updateAvatarAccount = function(_id,image, callback){
	accounts.update({_id:new ObjectID(_id)}, {$set: {avatar:image}}, {multi:true}, function(err) {
		callback(null,null);
	});
};
// update image of friends
exports.updateAvatarFriends = function(_id,image, callback){
	friends.update({user_id_re:_id}, {$set: {imglink:image}}, {multi:true}, function(err) {
		callback(null,null);
	});
};
// update image of friend connec
exports.updateAvatarFriend_Connec = function(_id,image, callback){
	friend_connec.update({id_rece:_id}, {$set: {img_user:image}}, {multi:true}, function(err) {
		callback(null,null);
	});
};
// update image of wall
exports.updateAvatarWall = function(_id,image, callback){
	wall.update({user_id:_id}, {$set: {user_image:image}}, {multi:true}, function(err) {
		callback(null,null);
	});
};
// update image of comment
exports.updateUserInfoComment = function(user, callback){
	comment.update({userInfo:""+user._id+""}, {$set: {'userInfo.1':user.avatar}}, {multi:true}, function(err) {
		callback(null,null);
	});
};
// update number image of account
exports.updateNumberCoverAccount = function(_id,num, image_box, callback){
	accounts.update({_id:new ObjectID(_id)}, {$set: {num_image_cover:num,image_box:image_box}}, {multi:true}, function(err) {
		callback(null,null);
	});
};
// update image cover of account
exports.updateCoverImage = function(_id,image,css,css_box,callback){
	accounts.update({_id:new ObjectID(_id)}, {$set: {banner:image,css:css,css_box:css_box}}, {multi:true}, function(err) {
		callback(null,null);
	});
};
// Get max number image of account 
exports.getMaxNumberImageAvatar = function(_id,avatar,callback){
	images.find({$and:[{id:_id},{type:10}]})
		.limit(1)
		.skip(0)
		.sort([['num', 'desc']])
		.toArray(function(e, res) {
			if(res){
				if(avatar!="../images/default-image/avatar-defulat.jpg"){
					if(res[0]!=undefined){
						callback(null,res[0].num);
					}else{
						callback(null,null);
					}
				}else{
					callback(null,null);
				}
			}else{
				callback(null,null);
			}
		});
};
// Insert room tracking map
exports.insertRoomMap = function(document, callback){
	room_map.findOne({user_id:document.user_id}, function(errRoom, resRoom) {
		if(resRoom){
			callback(null,null);
		}else{
			room_map.insert(document, function(errDocument, resDocument){
				callback(null,resDocument);
			});
		}
	});
};
// Find all room created
exports.getAllRoomCreated = function(callback){
	room_map.find().toArray(
		function(e, res) {
		if (e) callback(e)
		else callback(null, res)
	});
};
// Insert user join room
exports.insertUserJoinRoom = function(user_id_create,document, callback){
	room_map.findOne({user_id:user_id_create}, function(errRoom, resRoom) {
		var temp = 0;
		if(resRoom.user_join!=undefined){
			for(var i=0;i<resRoom.user_join.length;i++){
				if(resRoom.user_join[i].j_user_id == document.j_user_id){
					temp = 1;
				}
			}
		}
		if(temp==0){
			room_map.update({_id:new ObjectID(resRoom._id.toString())}, {$push: {user_join:document}}, {multi:true}, function(err,res) {
				room_map.findOne({user_id:user_id_create}, function(errRoom1, resRoom1) {
					callback(null,resRoom1);
				});
			});
		}else{
			callback(null,resRoom);
		}
	});
};
// get info user for join room map
exports.getUserJoinMap = function(_id, callback){
	accounts.findOne({_id:new ObjectID(_id)},{avatar:1, first_name:1, last_name:1,coordinate:1}, function(eAccountRe, oAccountRe) {
		callback(null,oAccountRe);
	});
};
// find item room created
exports.getItemRoomMap = function(_id, callback){
	room_map.findOne({_id:new ObjectID(_id)}, function(eAccountRe, oAccountRe) {
		callback(null,oAccountRe);
	});
};
//
var generateSalt = function()
{
	var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
	var salt = '';
	for (var i = 0; i < 10; i++) {
		var p = Math.floor(Math.random() * set.length);
		salt += set[p];
	}
	return salt;
}

var md5 = function(str) {
	return crypto.createHash('md5').update(str).digest('hex');
}

var saltAndHash = function(pass, callback)
{
	var salt = generateSalt();
	callback(salt + md5(pass + salt));
}

var validatePassword = function(plainPass, hashedPass, callback)
{
	var salt = hashedPass.substr(0, 10);
	var validHash = salt + md5(plainPass + salt);
	callback(null, hashedPass === validHash);
}

var getObjectId = function(id)
{
	return accounts.db.bson_serializer.ObjectID.createFromHexString(id)
}