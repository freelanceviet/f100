$(document).ready(function(){
	$('.list_contest_item').each(function(){
		var se = $(this);
		var price_tran = numeral(se.attr('data-price')).format('0,0') + " " + se.attr('data-type');
		se.html(price_tran);
	});
});
