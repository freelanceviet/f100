// var crypto 		= require('crypto');
// var MongoDB 	= require('mongodb').Db;
// var Server 		= require('mongodb').Server;
// var moment 		= require('moment');
// var ObjectID	= require('mongodb').ObjectID;

// var dbPort 		= 27017;
// var dbHost 		= 'localhost';
// var dbName 		= 'location';

// /* establish the database connection  */

// var db = new MongoDB(dbName, new Server(dbHost, dbPort, {auto_reconnect: true}), {w: 1});
// db.open(function(e, d){
	// if (e) {
		// //console.log(e);
	// } else{
		// console.log('connected to database :: ' + dbName);
	// }
// });

var crypto      = require('crypto');
var MongoDB  	= require('mongodb').Db;
var Server      = require('mongodb').Server;
var moment      = require('moment');
var moment      = require('moment');
var ObjectID 	= require('mongodb').ObjectID;

var dbPort                 = 10063; //27017;
var dbHost                 = 'oceanic.mongohq.com';//'localhost';
var dbName                 = 'location';
var mongo_db_username = 'userdb';
var mongo_db_password = 'userdb';


// establish the database connection 
// cai nay copy qua ben em, cai nay moi connect duoc db online, cai hien hanh cua em ko connect duoc dau ok ?
// copy het luon hay sao
// copy xong chay o local xem no connect duoc ko  
var db = new MongoDB(dbName, new Server(dbHost, dbPort, {auto_reconnect: true}), {w: 1});
db.open(function(e, p_client){
        if (e) {
                console.log(e);
        }        else{
            p_client.authenticate(mongo_db_username,mongo_db_password,{},function(err,success){
                if (err) {
                    console.warn("MONGO ERROR: unauthorized "+ err.message);

                } else {
                    console.log("MONGO Authorized");
                            console.log('connected to database :: ' + dbName);
                }
            });
        }
});

module.exports = {
	crypto:crypto,
	free_categories:db.collection('free_categories'),
	free_skill:db.collection('free_skill'),
	free_currency:db.collection('free_currency'),
	free_currency_range:db.collection('free_currency_range'),
	free_optional:db.collection('free_optional'),
	free_location:db.collection('free_location'),
	free_user:db.collection('free_user'),
	free_jobs:db.collection('free_jobs'),
	free_contests:db.collection('free_contests'),
	free_comments:db.collection('free_comments'),
	free_proposals:db.collection('free_proposals'),
	ObjectID:ObjectID,
	moment:moment
}

