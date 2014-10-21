$(document).ready(function(){
	var CP = new ContestPost();
	// -----------------------------------------------------
	// Load auto complete tag
	// -----------------------------------------------------
	var sampleTags = CP.arrAttribute();
	$('#contest_skill').tagit({
		availableTags: sampleTags
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
			});
		}else{
			$('#budget_custom').css('display','none');
			$('#budget_custom').empty();
		}
	});
	// Event upload file
	$('#contest_post_file').change(function() {
		CP.uploadImageForCommentPlace();
	});
	// Set input skill to form
	$('#rp-bt-action-form').click(function(){
		$('#rp-attributes-content-cg').empty();
		$('.tagit-label').each(function(){
			var html = '<input type="hidden"  class="job_skill" name="job_skill[]" value="'+$(this).text()+'" >';
			$('#rp-attributes-content-cg').append(html);
		});
	});
	// Form post job action
	$('#post_contest_form').ajaxForm({
		beforeSubmit : function(formData, jqForm, options){
			//return rp_val.validateForm();
		},
		success	: function(responseText, status, xhr, $form){
			alert(responseText);
		},
		error : function(e){
            alert(e.responseText);
		}
	});
	// Show slider for budget
	$(function() {
		$( "#slider-range-min" ).slider({
			range: "min",
			value: 37,
			min: 1,
			max: 700,
			slide: function( event, ui ) {
				$( "#amount" ).val( "$" + ui.value );
			}
		});
		$( "#amount" ).val( "$" + $( "#slider-range-min" ).slider( "value" ) );
	});
});
