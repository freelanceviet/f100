$(document).ready(function(){
	// Slider for fixed job type
	$(function() {
		$( "#slider-range-fixed" ).slider({
			range: true,
			min: 0,
			max: 500,
			values: [ 75, 300 ],
			slide: function( event, ui ) {
				$( "#amount-fixed" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
			}
		});
		$( "#amount-fixed" ).val( "$" + $( "#slider-range-fixed" ).slider( "values", 0 ) +" - $" + $( "#slider-range-fixed" ).slider( "values", 1 ) );
	});
	// Slider for per hour job type
	$(function() {
		$( "#slider-range-per-hour" ).slider({
			range: true,
			min: 0,
			max: 500,
			values: [ 75, 300 ],
			slide: function( event, ui ) {
				$( "#amount-per-hour" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
			}
		});
		$( "#amount-per-hour" ).val( "$" + $( "#slider-range-per-hour" ).slider( "values", 0 ) +" - $" + $( "#slider-range-per-hour" ).slider( "values", 1 ) );
	});
	// Event click category
	$('body').on('click', '.event_click_search_job', function (e) {
		if($(this).attr('data-text') == "category"){
			$('#input_job_'+$(this).attr('data-text')+'').val($(this).attr('data-id'));
		}else if($(this).attr('data-text') == "location"){
			if($(this).val()!=0 && $(this).val()!=1){
				$('#input_job_'+$(this).attr('data-text')+'').val($(this).val());
			}else{
				$('#input_job_'+$(this).attr('data-text')+'').val();
			}
		}else if($(this).attr('data-text') == "status"){
			if($(this).val()){
				$('#input_job_'+$(this).attr('data-text')+'').val($(this).val());
			}else{
				$('#input_job_'+$(this).attr('data-text')+'').val('');
			}
		}
		var i = 0;
		var url = "";
		$('.sort_job').each(function(){
			var se = $(this);
			if(i==0 && se.val()){
				i=1;
				url = url +'?'+se.attr('data-text')+'='+se.val();
			}else{
				if(se.val()){
					url = url +'&'+se.attr('data-text')+'='+se.val();
				}
			}
		});
		var urlGet = "/job-database"+url+"&type=get";
		var urlPut = "/job-database"+url+"";
		$.get(urlGet, function(data){
			$('#list_job_search').html(data);
			history.pushState({page:urlPut}, urlPut, urlPut);
		});
	});
});
