$(document).ready(function(){
	$('.list_contest_item').each(function(){
		var se = $(this);
		var price_tran = numeral(se.attr('data-price')).format('0,0') + " " + se.attr('data-type');
		se.html(price_tran);
	});
	// Event click remove file
	$('body').on('click', '.delete_icon', function (e) {
		$(this).parents('li').remove();
	});
	convert_time();
	setInterval(function () {
		convert_time();
	}, 60000);
});

// Convert time to text
function convert_time(){
	var endTime = new Date();
	$('.time_curent').each(function(){
		var se = $(this);
		var startTime = new Date(parseFloat(se.attr('time'))); 
		var difference = endTime.getTime() - startTime.getTime();
		var resultInMinutes = Math.round(difference / 60000);
		if(parseInt(resultInMinutes/60)==0){
			se.text(resultInMinutes+" minutes ago");
		}else if(parseInt(resultInMinutes/60)>0 && parseInt(resultInMinutes/60)<24){
			se.text(parseInt(resultInMinutes/60)+" hours ago");
		}else{
			var da = parseInt(resultInMinutes/2400);
			if(da<=10){
				se.text(da+" days ago");
			}else{
				var da = se.attr('title').substring(0,10);
				se.text(da);
			}
		}
	});
}