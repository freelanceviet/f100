// -----------------------------------------------------
// Mod		: Controllers
// Author	: Nguyen Huu Hai
// Day		: 04/12/2013
// Name		: reviewplace (Controller view place)  
// -----------------------------------------------------
function JobPost(){
	
}
// -----------------------------------------------------
// Autocompete show attribute
// -----------------------------------------------------
JobPost.prototype.arrAttribute=function(){
	var arr = new Array();
	$('.skill_name').each(function(){
		arr.push($(this).val());
	});
	$('.job_skill_hidden').remove();
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
				alert(response);
				$("#typeSubmitPlace").val(0);
			}, 
			error:function(e){
			}
		}).submit();
	}
}