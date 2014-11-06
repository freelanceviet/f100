$(document).ready(function(){
	// Event click add category
	$('body').on('click', '#event_add_location', function (e) {
		var se = $(this);
		var getUrl = "/getFormLocation";
		$.get(getUrl, function(data){
			$('#form_location').css('display','block');
			$('#form_location').html(data);
		});
	});
	// Event click add submit location
	$('body').on('click', '#bt_admin_location_submit', function (e) {
		$('#form_admin_location_add').ajaxForm({
			beforeSubmit : function(formData, jqForm, options){
				
			},
			success	: function(responseText, status, xhr, $form){
				$('#location-table').append(responseText);
				$('#form_location').css('display','none');
				$('#form_location').empty();
			},
			error : function(e){
				alert(e.responseText);
			}
		});
	});
	// Event click remove category 
	$('body').on('click', '.btn_delete_location', function (e) {
		var se = $(this);
		var getUrl = "/deleteLocation?id="+se.attr('data-id')+"";
		$.get(getUrl, function(data){
			se.parents('tr').remove();
		});
	});
	// Event change category of form add
	$('body').on('change', '.event_category_change', function (e) {
		var se = $(this);
		var getUrl = "/getSubCategory?id="+se.val()+"";
		$.get(getUrl, function(data){
			$('#fg_category_sub').html(data);
		});
	});
	
});
