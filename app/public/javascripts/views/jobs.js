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
});
