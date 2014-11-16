$(document).ready(function(){
	// Event click add category
	$('body').on('change', '.change_status_option_contest', function (e) {
		var se = $(this);
		var getUrl = "/change_status_contest?id="+se.parents('form').find('.id_contest').val()+"&status="+se.val()+"";
		$.get(getUrl, function(data){
			if(data=="success"){
				if(se.val()==1){
					se.parents('tr').find('button').removeClass('btn-default');
					se.parents('tr').find('button').addClass('btn-info');
				}
			}
		});
	});
});
