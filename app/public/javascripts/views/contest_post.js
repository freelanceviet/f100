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
		if($('.login ').length==1){
			$('.login ').trigger('click');
		}else{
			CP.uploadImageForCommentPlace();
		}
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
					$('.login').trigger('click');
					$('#login-form').find('.titleMtn').css('display','block');
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
		var price = tite_cu + numeral((parseInt($('#budget_value').val())*rate_cu)).format('0,0');
		$('#amount').val(price);
		var price_sum = (parseInt($('#price_sum_ponust').val()) + parseInt($('#budget_value').val())) * rate_cu;
		$('#sum_moneny').html(price_sum+tite_cu);
		$('#tax_money').html(((price_sum*$('#contest_post_tax').val())/100)+tite_cu);
		$('#total_money').html(((price_sum*$('#contest_post_tax').val())/100)+price_sum+tite_cu)
		$('#sum_moneny').find('.untPk').html(tite_cu);
		
		$('.chkbx_assisted ').each(function(){
			var ta = $(this);
			var cu_title = $("#currency option:selected").attr('title');
			var cu_rate = parseFloat($("#currency option:selected").attr('rate_usd'));
			var price = parseInt(ta.attr('data-price'));
			var text = numeral(price*cu_rate).format('0,0')+" "+cu_title;
			ta.parents('.conPack').find('.job_optional_price').text(text);
		});
				
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
		var price = numeral(all_price*rate_cu).format('0,0')+tite_cu;
		$('#sum_moneny').html(price);
		$('#tax_money').html(numeral((all_price*$('#contest_post_tax').val())/100).format('0,0')+tite_cu);
		$('#total_money').html((numeral(((all_price*$('#contest_post_tax').val())/100)+all_price).format('0,0'))+tite_cu);
		
	});
	// Show slider for budget
	$("#im_money_budget").keyup(function(){
		var money = $(this).val();
		var tite_cu = $("#currency option:selected").attr('title');
		
		
		var price_optional = (parseInt(money)*parseFloat($('#contest_post_optinal').val()))/100;
		$('#price_optional_contest').val(price_optional);
		$('#price_ui_show_optinal').text(numeral(price_optional).format('0,0')+" "+tite_cu);
		
		$('#price_sum_ponust').val(price_optional);
		
		$('#budget_value').val(money);
		var price = numeral((parseInt(money)*parseInt($('#tygia_value').val()))).format('0,0') + $('#contest_currency_title').text();
		$( "#amount" ).val(price);
		var price_all = (parseInt(money) + parseInt($('#price_sum_ponust').val()))*parseInt($('#tygia_value').val());
		$('#sum_moneny').html(numeral(price_all).format('0,0')+tite_cu);
		$('#tax_money').html(numeral(((price_all*$('#contest_post_tax').val())/100)).format('0,0')+tite_cu);
		$('#total_money').html(numeral(((price_all*$('#contest_post_tax').val())/100)+price_all).format('0,0')+tite_cu);
		
		
	});
	//
	$('.ctnPricePk_').each(function(){
		var se = $(this);
		var price = se.text();
		cu_title = $("#currency option:selected").attr('title');
		se.text(numeral(price).format('0,0')+ " " +cu_title);
	});
	
	// constest_detail_brief
	var price_contest_brief = $('#constest_detail_brief').val();
	$('#constest_detail_brief').parents('li').find('b').html(numeral(price_contest_brief).format('0,0'));
	
});
