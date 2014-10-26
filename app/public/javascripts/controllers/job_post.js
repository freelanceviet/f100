// -----------------------------------------------------
// Mod		: Controllers
// Author	: Nguyen Huu Hai
// Day		: 04/12/2013
// Name		: reviewplace (Controller view place)  
// -----------------------------------------------------
function JobPost(){
	
}
// -----------------------------------------------------
// Autocompete_ show attribute
// -----------------------------------------------------
JobPost.prototype.arrAttribute=function(){
	var arr = new Array();
	$('.skill_name').each(function(){
		arr.push($(this).val());
	});
	$('.job_skill_hidden').remove();
	return arr;
}
// -----------------------------------------------------
// Autocompete_ show location
// -----------------------------------------------------
JobPost.prototype.arrLocation=function(){
	var arr = new Array();
	$('.location_name').each(function(){
		arr.push($(this).val());
	});
	$('.job_location_hidden').remove();
	return arr;
}
//-----------------------------------------------------
// Upload file for post job
//-----------------------------------------------------
JobPost.prototype.uploadImageForCommentPlace=function(){
	if($('#job_post_file').get(0).files.length > 0){
		$("#typeSubmitPlace").val(1);
		$("#post_job_form").ajaxForm({
			beforeSubmit:function(formData, jqForm, options){
				
			}, 
			success:function(response, status, xhr, $form){
				$('.job_post_file_content').html(response);
				$("#typeSubmitPlace").val(0);
				$('#job_post_file').attr({ value: '' }); 
			}, 
			error:function(e){
			}
		}).submit();
	}
}