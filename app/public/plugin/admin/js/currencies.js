$(document).ready(function(){
	// Event click add category
	$('body').on('click', '#event_add_currency', function (e) {
		var se = $(this);
		var getUrl = "/getFormCurrency";
		$.get(getUrl, function(data){
			$('#form_currency').css('display','block');
			$('#form_currency').html(data);
		});
	});
	// Event click add submit optional
	$('body').on('click', '#bt_admin_currency_submit', function (e) {
		$('#form_admin_currency_add').ajaxForm({
			beforeSubmit : function(formData, jqForm, options){
				
			},
			success	: function(responseText, status, xhr, $form){
				$('#currency-table').append(responseText);
				$('#form_currency').css('display','none');
				$('#form_currency').empty();
			},
			error : function(e){
				alert(e.responseText);
			}
		});
	});
	// Event click remove category 
	$('body').on('click', '.btn_delete_currency', function (e) {
		var se = $(this);
		var getUrl = "/deleteCurrency?id="+se.attr('data-id')+"";
		$.get(getUrl, function(data){
			se.parents('tr').remove();
		});
	});
});
