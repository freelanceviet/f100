var Mogodb		= require('../mongodb/connection');
var fs          = require("fs");
var ObjectID	= Mogodb.ObjectID;
var easyimg     = require('easyimage');
// add new account
exports.uploadimage = function(type,image, callback){
	var arr =  new Array();
	if(image.path == undefined){
		for(var i=0; i < image.length; i++){
			//--------------------------------
			// Define parameter
			//--------------------------------
			var tmp_path;		// Path of image in client
			var imgName;		// Image name after rename
			var target_path;	// Path of image in server
			var is,os;			// Input & output stream

			// Get the temporary location of the file
			tmp_path = image[i].path;

			// Set where the file should actually exists - in this case it is in the "images" directory
			imgName = new ObjectID() + image[i].name.substr(image[i].name.indexOf('.'),image[i].name.length);
			var num_f = imgName.split('.').length-1;
			var name_f = "";
			if(imgName.split('.').length>2){
				name_f = imgName.split('.')[0]+'.'+imgName.split('.')[1];
			}else{
				name_f = imgName.split('.')[0];
			}
			target_path =  './app/public/upload/'+type+'/' + imgName;

			// Move the file from the temporary location to the intended location
			is = fs.createReadStream(tmp_path);
			os = fs.createWriteStream(target_path);
			is.pipe(os);
			var d = new Date();
			var n = d.getTime();
			var document = {
				public_id: name_f,
				format: imgName.split('.')[num_f],
				created_at: n,
				bytes: image[i].size,
				type: type
			};
			arr.push(document);
		}
		
	}else {
		//--------------------------------
			// Define parameter
			//--------------------------------
			var tmp_path;		// Path of image in client
			var imgName;		// Image name after rename
			var target_path;	// Path of image in server
			var is,os;			// Input & output stream

			// Get the temporary location of the file
			tmp_path = image.path;
			// Set where the file should actually exists - in this case it is in the "images" directory
			imgName = new ObjectID() + image.name.substr(image.name.indexOf('.'),image.name.length);
			target_path =  './app/public/upload/'+type+'/' + imgName;
			
			var num_f = imgName.split('.').length-1;
			var name_f = "";
			if(imgName.split('.').length>2){
				name_f = imgName.split('.')[0]+'.'+imgName.split('.')[1];
			}else{
				name_f = imgName.split('.')[0];
			}
			
			// Move the file from the temporary location to the intended location
			is = fs.createReadStream(tmp_path);
			os = fs.createWriteStream(target_path);
			is.pipe(os);
			
			is.on('end',function() {
				fs.unlinkSync(tmp_path,function(err){
				});
			});
			
			var d = new Date();
			var n = d.getTime();
			var document = {
				public_id: name_f,
				format: imgName.split('.')[num_f],
				created_at: n,
				bytes: image.size,
				type: type
			};
			arr.push(document);
	}
	callback(null,arr);
};
