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
				if (status == 'success') 
					$('.navLogReg').html(responseText);
					$('#cboxClose').trigger('click');
					$('.submission_bt').attr('href','#inlineProposal');
					testReloadPage();
			}
		},
		error : function(e){
            alert(e.responseText);
		}
	}); 
	//
});
// Test reload page
function testReloadPage(){
	var type = $('#url_reload_page').val();
	if(type=='yes'){
		location.reload(true);
	}
}
// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
	FB.api('/me', function(response) {
		document.getElementById('status').innerHTML = 'Thanks for logging in, ' + response.name + '!';
	});
}
// 
function statusChangeCallback(response) {
	if (response.status === 'connected') {
		login_with_f_connected()
	} else if (response.status === 'not_authorized') {
		document.getElementById('status').innerHTML = 'Please log ' + 'into this app.';
	} else {
		login_with_f_not_connect();
	}
}
// Login with face book connected
function login_with_f_connected(){
	FB.api('/me?fields=id,name,feed{message},first_name,last_name,birthday', function(response) {
		$.ajax({
			url: '/login_with_facebook',
			type: 'POST',
			data: {id:response.id,name:response.name,first_name:response.first_name,last_name:response.last_name,gender:response.gender},
			beforeSend: function() { 
			},
			success: function(data){
				$('.navLogReg').html(data);
				var type_face = $('#face_login_action_type').val();
				if(type_face=="exits"){
					$('.show_box_welcome_login').trigger('click');
					$('.box_welcome_info').find('h2').html(response.last_name+" "+ response.first_name);
					$('#cboxClose').css('display', 'none');
					setTimeout(function(){
						$('#cboxClose').trigger('click');
						$('#cboxClose').css('display', 'block');
					}, 1000);
					$('.submission_bt').attr('href','#inlineProposal');
					testReloadPage();
				}else if(type_face=="show-dialog-info"){
					$('.show_box_bonus_info_user').trigger('click');
					$('.submission_bt').attr('href','#inlineProposal');
					testReloadPage();
				}else{
					alert("Not connect internet now! Please try again later!");
				}
			},
			error: function(jqXHR){
				console.log(jqXHR.responseText+' :: '+jqXHR.statusText);
			}
		});
	});
}
// Login with face book not connect
function login_with_f_not_connect(response){
	FB.login(function(response) {
		FB.api('/me?fields=id,name,feed{message},first_name,last_name,birthday', function(response) {
			$.ajax({
				url: '/login_with_facebook',
				type: 'POST',
				data: {id:response.id,name:response.name,first_name:response.first_name,last_name:response.last_name,gender:response.gender},
				beforeSend: function() { 
					
				},
				success: function(data){
					$('.navLogReg').html(data);
					var type_face = $('#face_login_action_type').val();
					if(type_face=="exits"){
						$('.show_box_welcome_login').trigger('click');
						$('#cboxClose').css('display', 'none');
						setTimeout(function(){
							$('#cboxClose').trigger('click');
							$('#cboxClose').css('display', 'block');
						}, 1000);
						$('.submission_bt').attr('href','#inlineProposal');
						testReloadPage();
					}else if(type_face=="show-dialog-info"){
						$('.show_box_bonus_info_user').trigger('click');
						$('.submission_bt').attr('href','#inlineProposal');
						testReloadPage();
					}else{
						alert("Not connect internet now! Please try again later!");
					}
				},
				error: function(jqXHR){
					console.log(jqXHR.responseText+' :: '+jqXHR.statusText);
				}
			});
		});
	}, {
		scope: 'email,user_photos'
	});
}
// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
	$('.sf_loading').css('display','block');
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
