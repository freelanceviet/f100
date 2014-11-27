$(document).ready(function(){
	// Event hover proposal
	$('.img_poup_left').mouseenter(function() {
		$('.ipl-nav').fadeIn('slow');
		$('.ipl_option').fadeIn('slow');
		$('.fullScreenAvailable').fadeIn('slow');
	}).mouseleave(function(){
		$('.ipl-nav').fadeOut('slow');
		$('.ipl_option').fadeOut('slow');
		$('.fullScreenAvailable').fadeOut('slow');
	});
	// Event click back and next proposal
	$('body').on('click', '.event_click_show_proposal_nx', function (e) {
		e.preventDefault();
		var urlGet = $(this).attr('ajaxify');
		$.get(urlGet, function(data){
			$('.img_poup_left').html(data);
		});
	});
});
