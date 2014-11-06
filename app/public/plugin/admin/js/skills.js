$(document).ready(function(){
	// Event click add category
	$('body').on('click', '#event_add_skill', function (e) {
		var se = $(this);
		var getUrl = "/getFormSkill";
		$.get(getUrl, function(data){
			$('#form_skill').css('display','block');
			$('#form_skill').html(data);
		});
	});
	// Event click add submit skill
	$('body').on('click', '#bt_admin_skill_submit', function (e) {
		$('#form_admin_skill_add').ajaxForm({
			beforeSubmit : function(formData, jqForm, options){
				
			},
			success	: function(responseText, status, xhr, $form){
				$('#skill-table').append(responseText);
				$('#form_skill').css('display','none');
				$('#form_skill').empty();
			},
			error : function(e){
				alert(e.responseText);
			}
		});
	});
	// Event click remove category 
	$('body').on('click', '.btn_delete_skill', function (e) {
		var se = $(this);
		var getUrl = "/deleteSkill?id="+se.attr('data-id')+"";
		$.get(getUrl, function(data){
			se.parents('tr').remove();
		});
	});
	// Event change category of form add
	$('body').on('change', '.event_category_change', function (e) {
		var se = $(this);
		var getUrl = "/getSubCategory?id="+se.val()+"";
		$.get(getUrl, function(data){
			$('#fg_category_sub').html(data);
		});
	});
	
});
