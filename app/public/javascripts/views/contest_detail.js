$(document).ready(function(){
	var V_JP = new ContestBostValidator();
	// Event change image avatar
	$('body').on('change', '#photoimg-contest-avatar', function (e) {
		if($('#photoimg-contest-avatar').get(0).files.length > 0){
			$("#edit-event-contest-avatar").ajaxForm({
				beforeSubmit:function(formData, jqForm, options){
					//
				}, 
				success:function(response, status, xhr, $form){
					if(response){
						$('.avatar-content').find('img').attr('src',response);
					}else{
						alert('Not change image!');
					}
				}, 
				error:function(e){
				}
			}).submit();
		}
	});
	// Event change image banner
	$('body').on('change', '#photoimg-contest-banner', function (e) {
		if($('#photoimg-contest-banner').get(0).files.length > 0){
			$("#edit-event-contest-banner").ajaxForm({
				beforeSubmit:function(formData, jqForm, options){
					//
				}, 
				success:function(response, status, xhr, $form){
					if(response){
						$('.banner_contest_jq').attr('src', response);
					}else{
						alert('Can not up load image!');
					}
				}, 
				error:function(e){
				}
			}).submit();
		}
	});
	
	// Event up load image for comment contest
	$('body').on('change', '#photoimg-contest-comment', function (e) {
		if($('#photoimg-contest-comment').get(0).files.length > 0){
			$('#contest_post_type').val(1);
			$("#post-comment-contest").ajaxForm({
				beforeSubmit:function(formData, jqForm, options){
					//
				}, 
				success:function(response, status, xhr, $form){
					$('#contest_post_type').val(0);
					$('.pcc_image_content').append(response);
				}, 
				error:function(e){
				}
			}).submit();
		}
	});
	// Form submit comment contest
	$('body').on('click', '#bt_submit_contest', function (e) {
		var num_file = $('.tic-item-img').length;
		$('#id_file').val(num_file);
		$('#post-comment-contest').ajaxForm({
			beforeSubmit : function(formData, jqForm, options){
				return V_JP.validatePostCommentAction();
			},
			success	: function(responseText, status, xhr, $form){
				alert(responseText);
			},
			error : function(e){
				alert(e.responseText);
			}
		});
	});
	// Event like comment contest
	$('body').on('click', '.event_like_comment_contest', function (e) {
		var se = $(this);
		var urlGet = "/likeCommentContest?id="+se.attr('data-id')+"&type="+se.attr('data-type')+"";
		$.get(urlGet, function(data){
			alert(data);
		});
	});
	// Event click show comment input
	$('body').on('click', '.event_enter_comment_contest', function (e) {
		$(this).parents('.l2c_item').find('.option_comment_contest').toggle();
	});
	// Event click send message comment of comment contest
	$('body').on('click', '.bt_submit_comment_sub', function (e) {
		var se =  $(this).parents('.l2c_item');
		var text = se.find('textarea').val();
		if(text){
			se.find('.form_comment_sub').ajaxForm({
				beforeSubmit : function(formData, jqForm, options){
					alert('len luon');
				},
				success	: function(responseText, status, xhr, $form){
					alert(responseText);
				},
				error : function(e){
					alert(e.responseText);
				}
			});
		}else{
			alert('Please enter content!');
		}
	});
});
