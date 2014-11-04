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
	// Event click add submit category 
	$('body').on('click', '#bt_admin_category_submit', function (e) {
		$('#form_admin_category_add').ajaxForm({
			beforeSubmit : function(formData, jqForm, options){
				
			},
			success	: function(responseText, status, xhr, $form){
				$('#category-table').append(responseText);
				$('#form_category').css('display','none');
				$('#form_category').empty();
			},
			error : function(e){
				alert(e.responseText);
			}
		});
	});
	// Event click remove category 
	$('body').on('click', '.btn_delete_category', function (e) {
		var se = $(this);
		var getUrl = "/deleteCategory?id="+se.attr('data-id')+"";
		$.get(getUrl, function(data){
			se.parents('tr').remove();
		});
	});
});
