$(document).ready(function(){
	var lv = new LoginValidator();
	// Login form 
	$('#login-form').ajaxForm({
		beforeSubmit : function(formData, jqForm, options){
			return lv.validateForm();
		},
		success	: function(responseText, status, xhr, $form){
			if(responseText=="user-not-found"){
				$().toastmessage('showErrorToast', "User not found");
			}else if(responseText=="invalid-password"){
				$().toastmessage('showErrorToast', "Invalid-password");
			}else{
				if (status == 'success') window.location.href = '/';
			}
		},
		error : function(e){
            alert(e.responseText);
		}
	}); 
	//
});
// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
	FB.api('/me', function(response) {
		document.getElementById('status').innerHTML = 'Thanks for logging in, ' + response.name + '!';
	});
}
// 
function statusChangeCallback(response) {
	// The response object is returned with a status field that lets the
	// app know the current login status of the person.
	// Full docs on the response object can be found in the documentation
	// for FB.getLoginStatus().
	if (response.status === 'connected') {
		// Logged into your app and Facebook.
		login_with_f_connected(response)
	} else if (response.status === 'not_authorized') {
		// The person is logged into Facebook, but not your app.
		document.getElementById('status').innerHTML = 'Please log ' + 'into this app.';
	} else {
		//top.location=window.location="http://www.facebook.com/dialog/oauth/?scope=read_stream,publish_stream,friends_photos,friends_activities&client_id=497471193688530&redirect_uri=http://apps.facebook.com/filtered_feed/&response_type=code";
		login_with_f_not_connect(response);
	}
}
// Login with face book connected
function login_with_f_connected(response){
	$.ajax({
		url: '/login_with_facebook',
		type: 'POST',
		data: {id:response.id,name:response.name,first_name:response.first_name,last_name:response.last_name,gender:response.gender},
		beforeSend: function() { 
			
		},
		success: function(data){
			window.location.href = '/';
		},
		error: function(jqXHR){
			console.log(jqXHR.responseText+' :: '+jqXHR.statusText);
		}
	});
}
// Login with face book not connect
function login_with_f_not_connect(response){
	FB.login(function(response) {
		if (response.authResponse) {
			FB.api('/me', function(response) {
				$.ajax({
					url: '/login_with_facebook',
					type: 'POST',
					data: {id:response.id,name:response.name,first_name:response.first_name,last_name:response.last_name,gender:response.gender,lat:lat,lon:lon,name_short_country:name_short_country,city_name:city_name,vicinity_name:vicinity_name},
					beforeSend: function() { 
						
					},
					success: function(data){
						window.location.href = '/';
					},
					error: function(jqXHR){
						console.log(jqXHR.responseText+' :: '+jqXHR.statusText);
					}
				});
			});
		} else {
			console.log('User cancelled login or did not fully authorize.', "addpoint.js line 730");
		}
	}, {
		scope: 'email,user_photos'
	});
}
// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
	FB.getLoginStatus(function(response) {
		statusChangeCallback(response);
	});
}

window.fbAsyncInit = function() {
	FB.init({
		appId      : '497471193688530',
		cookie     : true,  // enable cookies to allow the server to access 
		xfbml      : true,  // parse social plugins on this page
		version    : 'v2.1' // use version 2.1
	});
};
	
// Load the SDK asynchronously
(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
