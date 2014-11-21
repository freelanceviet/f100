function RegisterValidator(){
	// build array maps of the form inputs & control groups
	this.formFields = [$('#reg-first-name-tf'), 
	                   $('#reg-last-name-tf'),  
	                   $('#reg-email-tf'), 
	                   $('#reg-pass-tf'),
					   $('#reg-user-name-su-tf')
	                  ];
	this.formTexts = [$('#reg-first-name-cf'), 
	                   $('#reg-last-name-cf'),  
	                   $('#reg-email-cf'), 
	                   $('#reg-pass-cf'),
					   $('#reg-user-name-su-cf')
	                  ];
	this.validateFirstName = function(s){
		return s.length>=2;
	}
	this.validateLastName = function(s){
		return s.length>=3;
	}
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
			alert(i);
			errGroupOPtion[i].addClass('ipErr');
			controlGroups[i].css('display','block');
		}
	}
}
RegisterValidator.prototype.validateForm=function(){
	// Add place to form
	var errInput = [];
	var errText = [];
	if (this.validateFirstName(this.formFields[0].val()) == false) {
		errInput.push(this.formFields[0]);
		errText.push(this.formTexts[0]);
	}
	if (this.validateLastName(this.formFields[1].val()) == false) {
		errInput.push(this.formFields[1]);
		errText.push(this.formTexts[1]);
	}
	if (this.validateEmail(this.formFields[2].val()) == false) {
		errInput.push(this.formFields[2]);
		errText.push(this.formTexts[2]);
	}
	if (this.validatePassword(this.formFields[3].val()) == false) {
		errInput.push(this.formFields[3]);
		errText.push(this.formTexts[3]);
	}
	if (this.validateUserName(this.formFields[4].val()) == false) {
		alert(this.formFields[4].val());
		errInput.push(this.formFields[4]);
		errText.push(this.formTexts[4]);
	}
	
	if (errInput.length) this.showErrors(errInput, errText);
	
	return errInput.length === 0;
}