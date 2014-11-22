$(document).ready(function(){
	// tab
	$(function() {
		$( "#tabs" ).tabs();
	});
	// Event change image avatar of user
	$('body').on('change', '#photoimg-profile-avatar', function (e) {
		if($('#photoimg-profile-avatar').get(0).files.length > 0){
			$("#edit-event-profile-avatar").ajaxForm({
				beforeSubmit:function(formData, jqForm, options){
					//
				}, 
				success:function(response, status, xhr, $form){
					if(response){
						$('.f_img').find('img').attr('src',response);
					}else{
						alert('Not change image!');
					}
				}, 
				error:function(e){
				}
			}).submit();
		}
	});
	// Event click edit sumary profile 
	$('body').on('click', '.iep_sumary', function (e) {
		
	});
});
