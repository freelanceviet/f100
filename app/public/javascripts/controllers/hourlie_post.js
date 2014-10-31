// -----------------------------------------------------
// Mod		: Controllers
// Author	: Nguyen Huu Hai
// Day		: 04/12/2013
// Name		: reviewplace (Controller view place)  
// -----------------------------------------------------
function HourliePost(){
	
}
// -----------------------------------------------------
// Autocompete show attribute
// -----------------------------------------------------
HourliePost.prototype.arrAttribute=function(){
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
HourliePost.prototype.arrLocation=function(){
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
HourliePost.prototype.uploadImageForCommentPlace=function(){
	if($('#hourlie_post_file').get(0).files.length > 0){
		$("#hourlie_post_type").val(1);
		$("#post_hourlie_form").ajaxForm({
			beforeSubmit:function(formData, jqForm, options){
				
			}, 
			success:function(response, status, xhr, $form){
				$('.hourlie_post_file_content').html(response);
				$("#hourlie_post_type").val(0);
			}, 
			error:function(e){
			}
		}).submit();
	}
}