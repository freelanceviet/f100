function PaymentValidator(){
	// build array maps of the form inputs & control groups
	this.formFields = [$('#form_type_payment-tf')
	                  ];
	this.formTexts = [$('#form_type_payment-cf')
	                  ];
	this.validatePayment = function(s){
		return s.length>0;
	}
	
	this.showErrors = function(errGroupOPtion, controlGroups){
		$('input').removeClass('ipErr');
		$('.errSup').css('display','none');
		for(var i=0;i<errGroupOPtion.length;i++){
			errGroupOPtion[i].addClass('ipErr');
			controlGroups[i].css('display','block');
		}
	}
}
PaymentValidator.prototype.validateForm=function(){
	// Add place to form
	var errInput = [];
	var errText = [];
	if (this.validatePayment(this.formFields[0].val()) == false) {
		errInput.push(this.formFields[0]);
		errText.push(this.formTexts[0]);
	}
	
	if (errInput.length) this.showErrors(errInput, errText);
	
	return errInput.length === 0;
}