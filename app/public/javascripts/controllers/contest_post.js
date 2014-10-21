// -----------------------------------------------------
// Mod		: Controllers
// Author	: Nguyen Huu Hai
// Day		: 04/12/2013
// Name		: reviewplace (Controller view place)  
// -----------------------------------------------------
function ContestPost(){
	
}
// -----------------------------------------------------
// Autocompete show attribute
// -----------------------------------------------------
ContestPost.prototype.arrAttribute=function(){
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
ContestPost.prototype.uploadImageForCommentPlace=function(){
	if($('#contest_post_file').get(0).files.length > 0){
		$("#typeSubmitPlace").val(1);
		$("#post_contest_form").ajaxForm({
			beforeSubmit:function(formData, jqForm, options){
				alert('vao khong troi');
			}, 
			success:function(response, status, xhr, $form){
				$("#typeSubmitPlace").val(0);
			}, 
			error:function(e){
			}
		}).submit();
	}
}