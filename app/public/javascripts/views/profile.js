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
	$('body').on('click', '.ctnIn', function (e) {
		var se = $(this);
		if(se.attr('data-type')=="edit"){
			var urlGet = "/getInfoUser?id="+$('#user_id_profile').val()+"";
			$.get(urlGet, function(data){
				if(data.skill_text!=undefined){
					$('#skill_123').val(data.skill_text);
				}
				if(data.slogan!=undefined){
					$('#slogan_123').val(data.slogan);
				}
				if(data.summary!=undefined){
					$('#summary_123').val(data.summary);
				}
			});
		}
	});
	// Event click submit for edit user profile
	$('body').on('click', '#bt_submit_form_edit_user', function (e) {
		var se = $(this);
		se.parents('form').ajaxForm({
			beforeSubmit : function(formData, jqForm, options){
				
			},
			success	: function(responseText, status, xhr, $form){
				alert(responseText);
			},
			error : function(e){
				alert(e.responseText);
			}
		}); 
	});
});
