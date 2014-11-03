var Mogodb   	  = require('../mongodb/connection');

var free_user    	      = Mogodb.free_user;
var ObjectID	          = Mogodb.ObjectID;
var crypto   	  		  = Mogodb.crypto;
var moment   	          = Mogodb.moment;

// ------------------------------------
// add new account
// note: 
// ------------------------------------
exports.getItemAccount = function(user_id, callback){
	free_user.findOne({_id:new ObjectID(user_id)}, function(eAccountRe, oAccountRe) {
		if(oAccountRe){
			callback(null,oAccountRe);
		}else{
			callback(null,null);
		}
	});
};

// ------------------------------------
// add new account
// note: 
// ------------------------------------
exports.addNewAccount = function(newData, callback){
	free_user.findOne({email:newData.email}, function(e, o) {
		if (o){
			callback('username-taken');
		}else{
			saltAndHash(newData.pass, function(hash){
				newData.pass = hash;
				newData.date = moment().format('MMMM Do YYYY, h:mm:ss a');
				free_user.insert(newData, {safe: true}, callback);
			});
		}
	});
}
// ------------------------------------
// add new account
// note: 
// ------------------------------------
exports.manualLogin = function(email,pass,callback){
	free_user.findOne({email:email}, function(e,o){
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