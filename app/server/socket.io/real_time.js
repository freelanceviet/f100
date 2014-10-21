var Mogodb   = require('../mongodb/connection');
var seq_mod  = require('../modules/sequence-manager');
var chat_mod = require('../modules/chat-manager');
var AM = require('../modules/account-manager');
var userStatus    = Mogodb.user_status;
var accounts = Mogodb.account;
var ObjectID = require('mongodb').ObjectID;
var moment   = Mogodb.moment;
//
//
module.exports = function (app,server) {
	var io = require('socket.io').listen(server);
	io.configure(function () { 
		io.set("transports", ["xhr-polling"]); 
		io.set("polling duration", 10); 
	});
	io.sockets.on('connection', function (socket) {
		// Connect room place
		socket.on('connect_room', function (data) {
			if(data.my){
				socket.join(""+data.my+"");
				userStatus.findOne({user_id:data.my}, function(e,o){
					if (o == null){
						if(data.my){
							var document = { user_id:data.my};
							userStatus.insert(document, { safe: true }, function (err, records) {
								var userid = records[0]['user_id']
								userStatus.update({ user_id: userid },{ $push: { scores: socket.id } },function(err){});
								socket.broadcast.emit('loginClient', data.my);
							});
						}
					}else{
						if(data.my){
							userStatus.update({ user_id: data.my},{ $push: { scores: socket.id } },function(err){});
						}
					}
				});
			}
			socket.broadcast.to(""+data.my+"").emit('updatechat','SERVER');
		});
		// Connect to room map
		socket.on('connect_room_map', function (data) {
			if(data.my){
				socket.join(""+data.my[0]+"");
			}
			socket.broadcast.to(""+data.my[0]+"").emit('updateCoordinate',[data.my[1],data.my[2]]);
		});
		// join room now
		socket.on('join_room_map_created', function (data) {
			socket.join("53f8c831dfb7c8ac0f000001dd");
		});
		// send room created
		socket.on('connect_room_map_created', function (data) {
			socket.join("53f8c831dfb7c8ac0f000001dd");
			socket.broadcast.to("53f8c831dfb7c8ac0f000001dd").emit('created_room_update',data.my[0]);
		});
		// send message chat place
		socket.on('sendMessagePlace', function (data) {
			socket.broadcast.to(data.my[0]).emit('updateMessageChatPlace',[data.my[1],data.my[2]]);
		});
		// send_message_room_map
		socket.on('send_message_room_map', function (data) {
			if(data.my){
				socket.join(""+data.my[0]+"");
			}
			socket.broadcast.to(""+data.my[0]+"").emit('updateMessageRoomChat',[data.my[1],data.my[2]]);
		});
		// send message to account if account dang login
		socket.on('connect_accout_room', function (data) {
			var newRoom = data.my[0].user_id_se;
			socket.join(data.my[0].user_id_se);
			socket.broadcast.to(""+newRoom+"").emit('send_message_header',data.my[0]);
			socket.leave(newRoom);
		});
		socket.on('connect_accout_room_kb_re', function (data) {
			var newRoom = data.my;
			socket.join(data.my);
			socket.broadcast.to(""+newRoom+"").emit('send_message_header_kb',data.my);
			socket.leave(newRoom);
		});
		// send chat to all socket connected to room
		socket.on('sendChat', function (data) {
			var d = new Date();
			var n = d.getTime();
			var newRoom = data.my[1];
			var text = data.my[0];
			var user_id = data.my[2];
			// Insert message chat 
			seq_mod.getNextSequence('chatseq',function(result){
				var id_seq_chat = result.seq;
				var addDate = moment(new Date());
				var document = {id_chat:id_seq_chat,
								message:text,
								id_user_send:user_id,
								id_user_rece:newRoom,
								add_date_time:addDate.format('YYYY-MM-DD hh:mm:ss'),
								status:0,
								time_review:null,
								"time_sort" : n,
							};
				chat_mod.insertMessageChat(document,function(err,result){
					// Socket_IO real time
					socket.join(newRoom);
					var arr = new Array();
					arr[0] = text;
					arr[1] = newRoom;
					arr[2] = user_id;
					arr[3] = data.my[3];
					socket.broadcast.to(""+newRoom+"").emit('updatechat',arr);
					socket.leave(newRoom);
				});
			});
	    });
		// send comment of place
		socket.on('sendComment', function (data) {
			socket.broadcast.to(""+data.my[1]+"").emit('updatecommentplace',data.my[0]);
		});
		// send order of place
		socket.on('sendOrder', function (data) {
			chat_mod.getOrder(data.my[0],function(err,result){
				socket.broadcast.to(""+data.my[1]+"").emit('updateorderplace',result);
			});
		});
		// Send order of place food
		socket.on('sendOrderFood', function (data) {
			socket.broadcast.to(""+data.my[2]+"").emit('updateordefood',data);
		});
		// send comment of place
		socket.on('sendNewsFeed', function (data) {
			socket.broadcast.emit('updateSendNewsFeed',data.my);
		});
		// send like place
		socket.on('sendLikePlace', function (data) {
			socket.broadcast.emit('updateSendLikePlace',data.my);
		});
		// event user logout
		socket.on('loGout', function (data) {
			var id_logout = data.my;
			socket.broadcast.emit('logoutClient', id_logout);
			socket.broadcast.to(""+id_logout+"").emit('leaveAllRoom',id_logout);
		});
		// event user login
		socket.on('loGin', function (data) {
			var id_login = data.my;
			socket.broadcast.emit('loginClient', id_login);
		});
		//
		socket.on('itemClientDestroySocket',function(data){
		   socket.disconnect();
		});
		// send message chat view (da xem tin nhan)
		socket.on('socket_view_mes_chat', function (data) {
			var addDate = moment(new Date());
			var arr = new Array();
			arr[0] = data.my[1];
			arr[1] = addDate.format('hh:mm');
			socket.broadcast.to(""+data.my[0]+"").emit('update_mes_chat_view',arr);
		});
		// disconnect 
		socket.on('disconnect', function (){
			chat_mod.removeSocketId(socket.id,function(err,res){
				if(res!=1){
					socket.broadcast.emit('logoutClient', res);
				}
			});
		});
	});
}