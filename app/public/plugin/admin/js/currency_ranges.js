$(document).ready(function(){
	// Event click add category
	$('body').on('click', '#event_add_currency_range', function (e) {
		var se = $(this);
		var getUrl = "/getFormCurrency_range";
		$.get(getUrl, function(data){
			$('#form_currency_range').css('display','block');
			$('#form_currency_range').html(data);
		});
	});
	
	// Event click add submit currency_range
	$('body').on('click', '#bt_admin_currency_range_submit', function (e) {
		$('#form_admin_currency_range_add').ajaxForm({
			beforeSubmit : function(formData, jqForm, options){
				
			},
			success	: function(responseText, status, xhr, $form){
				$('#currency_range-table').append(responseText);
				$('#form_currency_range').css('display','none');
				$('#form_currency_range').empty();
			},
			error : function(e){
				alert(e.responseText);
			}
		});
	});
	
	// Event click remove category 
	$('body').on('click', '.btn_delete_currency_range', function (e) {
		var se = $(this);
		var getUrl = "/deleteCurrency_range?id="+se.attr('data-id')+"";
		$.get(getUrl, function(data){
			se.parents('tr').remove();
		});
	});
});
