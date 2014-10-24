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
			alert(responseText);
			//$(location).attr('href',responseText);
		},
		error : function(e){
            alert(e.responseText);
		}
	});
});
