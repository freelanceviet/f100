$(document).ready(function(){
	var rp_val = new RegisterValidator();
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
				alert("User name or Email exits!");
			}else{
				$('.login ').trigger('click');
			}
		},
		error : function(e){
            alert(e.responseText);
		}
	});
});
