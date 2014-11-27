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
						$('.inavaCompet').find('img').attr('src',response);
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
				console.log(data);
				if(data.skill_text!=undefined){
					$('#skill_123').val(data.skill_text);
				}
				if(data.slogan!=undefined){
					$('#slogan_123').val(data.slogan);
				}
				if(data.summary!=undefined){
					$('#summary_123').val(data.summary);
				}
				$('#first_name_pr_edit').val(data.first_name);
				$('#last_name_pr_edit').val(data.last_name);
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
				location.reload();
			},
			error : function(e){
				alert(e.responseText);
			}
		}); 
	});
	// Event click show infor profile tab menu 
	$('body').on('click', '.event_click_show_info_profile', function (e) {
		var se = $(this);
		var urlGet = 'getInfoUserProfilePro?id='+se.attr('data-id')+'&type='+se.attr('data-type')+'';
		$('a').removeClass('ac_itmNav');
		se.addClass('ac_itmNav');
		$('li').removeClass('actBgNav');
		se.parents('li').addClass('actBgNav');
		$.get(urlGet, function(data){
			$('.col_lfUsDts').empty();
			$('.col_lfUsDts').prepend(data);
		});
		e.preventDefault();
	});
});
