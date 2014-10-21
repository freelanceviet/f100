$(document).ready(function(){
	// Auto for location
	$(function() {
		var availableTags = new Array();
		$('.item_location').each(function(){
			availableTags.push($(this).val());
		});
		$( "#f_location" ).autocomplete({
			source: availableTags
		});
	});
	// Post form register
	$('#register_form').ajaxForm({
		beforeSubmit : function(formData, jqForm, options){
			//return rp_val.validateForm();
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
