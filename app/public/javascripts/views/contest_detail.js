$(document).ready(function(){
	var V_JP = new ContestBostValidator();
	var PCV = new ProposalContestValidator();
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
					$('.pcc_image_content').css('display','block')
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
				$('.col_rtCompet').append(responseText);
				$('#f_comment_contest').val('');
				$('.option_ac').css('display','none');
				$('.pcc_image_content').empty();
				$('.pcc_image_content').css('display','none');
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
			se.remove();
		});
	});
	// Event click show comment input
	$('body').on('click', '.event_enter_comment_contest', function (e) {
		$(this).parents('.l2c_item').find('.option_comment_contest').toggle();
	});
	// Event click send message comment of comment contest
	$('body').on('click', '.bt_submit_comment_sub', function (e) {
		var se =  $(this).parents('.areaPstCmt');
		var se_sub = $(this).parents('.mainCmtPst');
		var text = se.find('textarea').val();
		se.find('.form_comment_sub').ajaxForm({
			beforeSubmit : function(formData, jqForm, options){
				
			},
			success	: function(responseText, status, xhr, $form){
				se_sub.append(responseText);
			},
			error : function(e){
				alert(e.responseText);
			}
		});
	});
	//
	$('.herCmtPst').on('keyup', function(e) {
		var temp = $(this);
		var se  = $(this).parents('.areaPstCmt');
		if (e.which == 13) {
			if(se.find('textarea').val().trim()!=""){
				se.find('.bt_submit_comment_sub').trigger('click');
				temp.val('');
			}
		}
	});
	// Event click add proposal for 
	$('body').on('click', '.submitssion', function (e) {
		var se = $(this);
		var urlGet = "/getFormProposal?id="+se.attr('data-id')+"";
		$.get(urlGet, function(data){
			$('.post_form_proposal').html(data);
		});
	});
	// Event upload file for proposal
	$('body').on('change', '#files_proposal_attach', function (e) {
		if($('#files_proposal_attach').get(0).files.length > 0){
			$("#contest_post_type").val(1);
			$("#form_post_proposal").ajaxForm({
				beforeSubmit:function(formData, jqForm, options){
					
				}, 
				success:function(response, status, xhr, $form){
					$('.job_proposal_file_content').html(response);
					$("#contest_post_type").val(0);
				}, 
				error:function(e){
				}
			}).submit();
		}
	});
	// Event click submit form
	$('body').on('click', '#bt_submit_form_proposal', function (e) {
		var num_file = $('.ffi_remove').length;
		var num_item = $('.ip_list_item').find('.item_price_pro').length;
		$('#contest_post_f').val(num_file);
		$('#contest_post_r').val(num_item);
		$('#form_post_proposal').ajaxForm({
			beforeSubmit : function(formData, jqForm, options){
				//return PCV.validateForm();
			},
			success	: function(responseText, status, xhr, $form){
				if(responseText=='not-login'){
					alert("Please login to continue!");
				}else{
					alert("Post Success!");
				}
			},
			error : function(e){
				alert(e.responseText);
			}
		});
	});
	// Hight light tab selected
	$('#tab_'+$("#tab_selected").val()+'').addClass('activeTline');
	// Event click show option post status
	$('body').on('click', '#f_comment_contest', function (e) {
		$('.option_ac').css('display','block');
	});
	
});
