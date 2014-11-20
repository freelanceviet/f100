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
// -----------------------------------------------------
// Autocompete_ show location
// -----------------------------------------------------
ContestPost.prototype.arrLocation=function(){
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
ContestPost.prototype.uploadImageForCommentPlace=function(){
	if($('#contest_post_file').get(0).files.length > 0){
		$("#contest_post_type").val(1);
		$("#post_contest_form").ajaxForm({
			beforeSubmit:function(formData, jqForm, options){
				$('.itu_default').parent().remove();
			}, 
			success:function(response, status, xhr, $form){
				$('.lstThumbUp').append(response);
				$("#contest_post_type").val(0);
			}, 
			error:function(e){
			}
		}).submit();
	}
}