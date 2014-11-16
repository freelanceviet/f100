// Event click category
$('.event_click_search_job').click(function(){
	if($(this).attr('data-text') == "category"){
		$('#input_job_'+$(this).attr('data-text')+'').val($(this).attr('data-id'));
	}else if($(this).attr('data-text') == "location"){
		if($(this).val()!=0 && $(this).val()!=1){
			$('#input_job_'+$(this).attr('data-text')+'').val($(this).val());
		}else{
			$('#input_job_'+$(this).attr('data-text')+'').val('');
		}
	}else if($(this).attr('data-text') == "status"){
		if($(this).val()){
			$('#input_job_'+$(this).attr('data-text')+'').val($(this).val());
		}else{
			$('#input_job_'+$(this).attr('data-text')+'').val('');
		}
	}else if($(this).attr('data-text') == "page"){
		$('#input_job_'+$(this).attr('data-text')+'').val($(this).attr('data-id'));
	}else if($(this).attr('data-text') == "jobtype"){
		if($(this).val()=="any"){
			$('#input_job_type').val('');
		}else if($(this).val()=="fixed"){
			$('#input_job_type').val('jobtype');
			$('#input_job_type').attr('data-type','fixed');
			$( "#slider-range-fixed" ).slider({disabled: false});
			$( "#slider-range-per-hour" ).slider({disabled: true});
		}else{
			$('#input_job_type').val('jobtype');
			$('#input_job_type').attr('data-type','perhour');
			$( "#slider-range-fixed" ).slider({disabled: true});
			$( "#slider-range-per-hour" ).slider({disabled: false});
		}
	}
	var i = 0;
	var url = "";
	$('.sort_job').each(function(){
		var se = $(this);
		if(i==0 && se.val()){
			i=1;
			if(se.val()=="jobtype"){
				if(se.attr('data-type')=='fixed'){
					url = url +'?'+se.attr('data-text')+'=fixed&type_value=['+$('#jobtype_fixed_min').val()+','+$('#jobtype_fixed_max').val()+']';
				}else{
					url = url +'?'+se.attr('data-text')+'=perhour&type_value=['+$('#jobtype_perhour_min').val()+','+$('#jobtype_perhour_max').val()+']';
				}
			}else
			{
				url = url +'?'+se.attr('data-text')+'='+se.val();
			}
		}else{
			if(se.val()){
				if(se.val()=="jobtype"){
					if(se.attr('data-type')=='fixed'){
						url = url +'&'+se.attr('data-text')+'=fixed&type_value=['+$('#jobtype_fixed_min').val()+','+$('#jobtype_fixed_max').val()+']';
					}else{
						url = url +'&'+se.attr('data-text')+'=perhour&type_value=['+$('#jobtype_perhour_min').val()+','+$('#jobtype_perhour_max').val()+']';
					}
				}else{
					url = url +'&'+se.attr('data-text')+'='+se.val();
				}
			}
		}
	});
	var urlGet = "/job-database"+url+"&type=get";
	var urlPut = "/job-database"+url+"";
	history.pushState({page:'/job-database'}, '/job-database', '/job-database');
	$.get(urlGet, function(data){
		$('#list_job_search').html(data);
		history.pushState({page:urlPut}, urlPut, urlPut);
	});
});

// Slider for fixed job type
$(function() {
	$( "#slider-range-fixed" ).slider({
		range: true,
		min: 0,
		max: 500,
		disabled: true,
		values: [ 75, 300 ],
		slide: function( event, ui ) {
			$( "#amount-fixed" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
			$('#jobtype_fixed_min').val(ui.values[ 0 ]);
			$('#jobtype_fixed_max').val(ui.values[ 1 ]);
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
		disabled: true,
		values: [ 75, 300 ],
		slide: function( event, ui ) {
			$( "#amount-per-hour" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
			$('#jobtype_perhour_min').val(ui.values[ 0 ]);
			$('#jobtype_perhour_max').val(ui.values[ 1 ]);
		}
	});
	$( "#amount-per-hour" ).val( "$" + $( "#slider-range-per-hour" ).slider( "values", 0 ) +" - $" + $( "#slider-range-per-hour" ).slider( "values", 1 ) );
});
