$(document).ready(function(){
	var PV = new ProposalValidator();
	// Add item proposal
	$('body').on('click', '#add_item_span_proposal', function (e) {
		var html = $('.item_pro_default').find('table').html();
		$('.ip_list_item').append(html);
	});
	// Delete item proposal
	$('body').on('click', '.free_delete_item_proposal', function (e) {
		$(this).parents('tr').remove();
	});
	// Event upload file for proposal
	$('body').on('change', '#files_proposal_attach', function (e) {
		if($('#files_proposal_attach').get(0).files.length > 0){
			$("#contest_post_type").val(1);
			$("#form_post_proposal").ajaxForm({
				beforeSubmit:function(formData, jqForm, options){
					return PV.validateForm();
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
				return PV.validateForm();
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
});
