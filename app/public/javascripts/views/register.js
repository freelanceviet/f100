$(document).ready(function(){
	var rp_val = new RegisterValidator();
	var fb_val = new FaceUpdateValidator();
	// Auto for location
	$(function() {
		var availableTags = new Array();
		$('.item_location').each(function(){
			availableTags.push($(this).val());
		});
		$( "#reg-location-tf" ).autocomplete({
			source: availableTags
		});
	});
	// Post form register
	$('#register_form').ajaxForm({
		beforeSubmit : function(formData, jqForm, options){
			return rp_val.validateForm();
		},
		success	: function(responseText, status, xhr, $form){
			if(responseText=="username-taken"){
				$().toastmessage('showErrorToast', "User name or Email exits!");
			}else{
				$('.login ').trigger('click');
			}
		},
		error : function(e){
            alert(e.responseText);
		}
	});
	// Post update form login with face book 
	$('#register_update_face_form').ajaxForm({
		beforeSubmit : function(formData, jqForm, options){
			return fb_val.validateForm();
		},
		success	: function(responseText, status, xhr, $form){
			if(responseText=="username-taken"){
				$().toastmessage('showErrorToast', "User name or Email exits!");
			}else{
				$().toastmessage('showSuccessToast', "Login and update successfull! Close to continue");
			}
		},
		error : function(e){
            alert(e.responseText);
		}
	});
});
