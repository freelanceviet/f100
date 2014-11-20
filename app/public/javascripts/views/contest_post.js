$(document).ready(function(){
	var CP = new ContestPost();
	var v_CP = new ContestBostValidator();
	// Load auto complete tag
	var sampleTags = CP.arrAttribute();
	$('#contest_skill').tagit({
		availableTags: sampleTags
	});
	// Load auto complete tag skill
	var sampleLocation = CP.arrLocation();
	$('#job_location').tagit({
		availableTags: sampleLocation
	});
	// Event change category to show sub category
	$('body').on('change', '#skill_category', function (e) {
		var se = $(this);
		var urlGet = "/getSubCategory?category_id="+se.val()+"";
		$.get(urlGet, function(data){
			$('.skill_category_sub').find('#skill_subcategory').remove();
			$('.skill_category_sub').append(data);
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
				var cu_title = $("#currency option:selected").attr('title');
				var cu_rate = parseInt($("#currency option:selected").attr('rate_usd'));
				var price = parseInt(ta.attr('data-price'));
				var text = ""+cu_title+""+(price*cu_rate);
				ta.text(text);
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
	$('body').on('click', '#rp-bt-action-form', function (e) {
		$('#rp-attributes-content-cg').empty();
		$('.au_skill').find('.tagit-label').each(function(){
			var html = '<input type="hidden"  class="contest_skill" name="contest_skill[]" value="'+$(this).text()+'" >';
			$('#rp-attributes-content-cg').append(html);
		});
		$('#lo-attributes-content-cg').empty();
		$('.au_location').find('.tagit-label').each(function(){
			var html = '<input type="hidden"  class="contest_location" name="contest_location[]" value="'+$(this).text()+'" >';
			$('#lo-attributes-content-cg').append(html);
		});
		$('#contest_currency_title_').val($('#contest_currency_title').text());
		var val_name_c = $('#currency option:selected').html();
		$('#contest_currency_name').val(val_name_c);
	});
	// Form post contest action
	$('body').on('click', '#rp-bt-action-form', function (e) {
		var num_file = $('.ffi_remove').length;
		$('#contest_post_f').val(num_file);
		$('#post_contest_form').ajaxForm({
			beforeSubmit : function(formData, jqForm, options){
				return v_CP.validateForm();
			},
			success	: function(responseText, status, xhr, $form){
				if(responseText=='not-login'){
					alert("Please login to continue!");
				}else{
					window.location.href = responseText;
				}
			},
			error : function(e){
				alert(e.responseText);
			}
		});
	});
	// Event change currency
	$('body').on('change', '#currency', function (e) {
		var tite_cu = $("#currency option:selected").attr('title');
		var rate_cu = $("#currency option:selected").attr('rate_usd');
		$('#contest_currency_title').html(tite_cu);
		$('#tygia_value').val(rate_cu);
		var price = tite_cu + (parseInt($('#budget_value').val())*rate_cu);
		$('#amount').val(price);
		var price_sum = (parseInt($('#price_sum_ponust').val()) + parseInt($('#budget_value').val())) * rate_cu
		$('#sum_moneny').html(price_sum);
		$('#sum_moneny').find('.untPk').html(tite_cu);
	});
	// Event click optional price
	$('body').on('click', '.chkbx_assisted', function (e) {
		var sum_optional = 0;
		$('.chkbx_assisted').each(function(){
			var ele = $(this);
			if(ele.is(':checked')){
				sum_optional = sum_optional + parseInt(ele.attr('data-price'));
			}
		});
		var all_price = parseInt($('#budget_value').val()) + sum_optional;
		$('#price_sum_ponust').val(sum_optional);
		
		var tite_cu = $("#currency option:selected").attr('title');
		var rate_cu = $("#currency option:selected").attr('rate_usd');
		var price = tite_cu + (all_price*rate_cu);
		$('#sum_moneny').html(price);
		
	});
	// Show slider for budget
	$(function() {
		$( "#slider-range-min" ).slider({
			range: "min",
			value: 100,
			min: 50,
			max: 10000,
			slide: function( event, ui ) {
				$('#budget_value').val(ui.value);
				var price = $('#contest_currency_title').text() + (parseInt(ui.value)*parseInt($('#tygia_value').val()));
				$( "#amount" ).val(price);
				var price_all = (parseInt(ui.value) + parseInt($('#price_sum_ponust').val()))*parseInt($('#tygia_value').val());
				var tite_cu = $("#currency option:selected").attr('title');
				$('#sum_moneny').html(tite_cu + price_all);
			}
		});
		$( "#amount" ).val( $('#contest_currency_title').text() + $( "#slider-range-min" ).slider( "value" ) );
	});
});
