function LoginValidator(){
	// build array maps of the form inputs & control groups
	this.formFields = [$('#lo-email-tf'), 
	                   $('#lo-pass-tf')
	                  ];
	this.controlGroups = [$('#lo-email-cf'), 
	                   $('#lo-pass-cf')
	                  ];
	
	this.validateEmail = function(e){
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(e);
	}
	this.validatePassword = function(s)
	{
		return s.length >= 6;
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
LoginValidator.prototype.validateForm=function(){
	var errGroupOPtion = [];
	var coGroups = [];
	for (var i=0; i < this.controlGroups.length; i++) this.controlGroups[i].removeClass('error');
	if (this.validateEmail(this.formFields[0].val()) == false) {
		errGroupOPtion.push(this.formFields[0]); 
		coGroups.push(this.controlGroups[0]);
	}
	if (this.validatePassword(this.formFields[1].val()) == false) {
		errGroupOPtion.push(this.formFields[1]); 
		coGroups.push(this.controlGroups[1]);
	}
	if (errGroupOPtion.length) this.showErrors(errGroupOPtion, coGroups);
	
	return errGroupOPtion.length === 0;
}