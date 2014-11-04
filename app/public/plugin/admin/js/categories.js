$(document).ready(function(){
	// Event click add category
	$('body').on('click', '#event_add_category', function (e) {
		var se = $(this);
		var getUrl = "/getFormCategory";
		$.get(getUrl, function(data){
			$('#form_category').css('display','block');
			$('#form_category').html(data);
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
	// Event click add category sub
	$('body').on('click', '#event_add_category_sub', function (e) {
		var se = $(this);
		var getUrl = "/getFormCategorySub?id="+se.attr('data-id')+"";
		$.get(getUrl, function(data){
			$('#form_category_sub').css('display','block');
			$('#form_category_sub').html(data);
		});
	});
	// Event click add submit category sub 
	$('body').on('click', '#bt_admin_category_sub_submit', function (e) {
		$('#form_admin_category_sub_add').ajaxForm({
			beforeSubmit : function(formData, jqForm, options){
				
			},
			success	: function(responseText, status, xhr, $form){
				$('#category_sub-table').append(responseText);
				$('#form_category_sub').css('display','none');
				$('#form_category_sub').empty();
			},
			error : function(e){
				alert(e.responseText);
			}
		});
	});
	// Event click remove category sub
	$('body').on('click', '.btn_delete_category_sub', function (e) {
		var se = $(this);
		var getUrl = "/deleteCategorySub?id="+se.attr('data-id')+"&id_ca="+se.attr('data-id-ca')+"";
		$.get(getUrl, function(data){
			se.parents('tr').remove();
		});
	});
	
});
