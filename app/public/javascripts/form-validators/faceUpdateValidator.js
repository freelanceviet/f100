function FaceUpdateValidator(){
	// build array maps of the form inputs & control groups
	this.formFields = [$('#reg-email-tf'),
	                   $('#reg-pass-tf'),
					   $('#reg-user-name-tf')
	                  ];
	this.formTexts = [$('#reg-email-cf'),
	                   $('#reg-pass-cf'),
					   $('#reg-user-name-cf')
	                  ];
	
	this.validateEmail = function(e){
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(e);
	}
	this.validatePassword = function(s)
	{
		return s.length >= 6;
	}
	this.validateUserName = function(s){
		return s.length>=3;
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
FaceUpdateValidator.prototype.validateForm=function(){
	// Add place to form
	var errInput = [];
	var errText = [];
	if (this.validateEmail(this.formFields[0].val()) == false) {
		errInput.push(this.formFields[0]);
		errText.push(this.formTexts[0]);
	}
	if (this.validatePassword(this.formFields[1].val()) == false) {
		errInput.push(this.formFields[1]);
		errText.push(this.formTexts[1]);
	}
	if (this.validateUserName(this.formFields[2].val()) == false) {
		errInput.push(this.formFields[2]);
		errText.push(this.formTexts[2]);
	}
	
	if (errInput.length) this.showErrors(errInput, errText);
	
	return errInput.length === 0;
}