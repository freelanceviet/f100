$(document).ready(function(){
	// Event click add category
	$('body').on('click', '#event_add_optional', function (e) {
		var se = $(this);
		var getUrl = "/getFormOptional";
		$.get(getUrl, function(data){
			$('#form_optional').css('display','block');
			$('#form_optional').html(data);
		});
	});
	// Event click add submit optional
	$('body').on('click', '#bt_admin_optional_submit', function (e) {
		$('#form_admin_optional_add').ajaxForm({
			beforeSubmit : function(formData, jqForm, options){
				
			},
			success	: function(responseText, status, xhr, $form){
				$('#optional-table').append(responseText);
				$('#form_optional').css('display','none');
				$('#form_optional').empty();
			},
			error : function(e){
				alert(e.responseText);
			}
		});
	});
	// Event click remove category 
	$('body').on('click', '.btn_delete_optional', function (e) {
		var se = $(this);
		var getUrl = "/deleteOptional?id="+se.attr('data-id')+"";
		$.get(getUrl, function(data){
			se.parents('tr').remove();
		});
	});
});
