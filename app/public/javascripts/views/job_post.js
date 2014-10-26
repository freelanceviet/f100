$(document).ready(function(){
	var JP = new JobPost();
	var V_JP = new JobBostValidator();
	// Load auto complete tag skill
	var sampleTags = JP.arrAttribute();
	$('#job_skill').tagit({
		availableTags: sampleTags
	});
	// Load auto complete tag skill
	var sampleLocation = JP.arrLocation();
	$('#job_location').tagit({
		availableTags: sampleLocation
	});
	// Event change category to show sub category
	$('body').on('change', '#skill_category', function (e) {
		var se = $(this);
		var urlGet = "/getSubCategory?category_id="+se.val()+"";
		$.get(urlGet, function(data){
			se.parents('p').find('#skill_subcategory').remove();
			se.parents('p').append(data);
		});
	});
	// Event change category to show sub category
	$('body').on('change', '#currency', function (e) {
		var se = $(this);
		var urlGet = "/getSubBudget?currency_id="+se.val()+"";
		$.get(urlGet, function(data){
			$('#budget').remove();
			$('.re_currency_d').remove();
			$('#currency_content').append(data);
			// Change optional value price
			$('.job_optional_price').each(function(){
				var ta = $(this);
				var cu_title = $('#cu_title_selected').val();
				var cu_rate = parseInt($('#cu_reteusd_selected').val());
				var price = parseInt(ta.attr('data-price'));
				var text = cu_title+(price*cu_rate);
				ta.html(text);
			});
			// Change title of min or max budget
			if($('.sum_title').length>0){
				$('.sum_title').html($('#cu_title_selected').val());
			}
		});
	});
	// Event change budget for currency range
	$('body').on('change', '#budget', function (e) {
		var se = $(this);
		if(se.val()=="custom"){
			var urlGet = "/getBudgetCustom?cu_title="+$('#cu_title_selected').val()+"&cu_reteusd="+$('#cu_reteusd_selected').val()+"";
			$.get(urlGet, function(data){
				$('#budget_custom').css('display','block');
				$('#budget_custom').html(data);
				$('#budget_from').val('');
			$('#budget_to').val('');
			});
		}else{
			$('#budget_custom').css('display','none');
			$('#budget_custom').empty();
			var from = $("#budget option:selected").attr('from');
			var to   = $("#budget option:selected").attr('to');
			$('#budget_from').val(from);
			$('#budget_to').val(to);
		}
	});
	// Event upload file
	$('#job_post_file').change(function() {
		JP.uploadImageForCommentPlace();
	});
	// Set input skill to form
	$('#rp-bt-action-form').click(function(){
		$('#rp-attributes-content-cg').empty();
		$('.au_skill').find('.tagit-label').each(function(){
			var html = '<input type="hidden"  class="job_skill" name="job_skill[]" value="'+$(this).text()+'" >';
			$('#rp-attributes-content-cg').append(html);
		});
		$('#lo-attributes-content-cg').empty();
		$('.au_location').find('.tagit-label').each(function(){
			var html = '<input type="hidden"  class="job_location" name="job_location[]" value="'+$(this).text()+'" >';
			$('#lo-attributes-content-cg').append(html);
		});
	});
	// Form post job action
	$('#rp-bt-action-form').click(function(){
		$('#post_job_form').ajaxForm({
			beforeSubmit : function(formData, jqForm, options){
				return V_JP.validateForm();
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
