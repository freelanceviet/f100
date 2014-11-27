$(document).ready(function(){
	// Event click select payments
	var V_PM = new PaymentValidator();
	$('body').on('click', '.event_click_payment', function (e) {
		$('#form_type_payment-tf').val($(this).val());
	});
	// Event click submit form
	$('body').on('click', '#bt_form_submit_payment', function (e) {
		$('#payment-select').ajaxForm({
			beforeSubmit : function(formData, jqForm, options){
				//return V_PM.validateForm();
			},
			success	: function(responseText, status, xhr, $form){
				if($('#form_type_payment-tf').val() == 'cod'){
					window.location = responseText;
				}else{
					alert('2 hinh thuc kia');
				}
			},
			error : function(e){
				alert(e.responseText);
			}
		});
	});
	// Format money for 
	var price_payment = $('.ctnPricePk').text();
	$('.ctnPricePk').html(numeral(price_payment).format('0,0')+" đ");
	
});
