function LoginValidator(){
	// build array maps of the form inputs & control groups
	this.formFields = [$('#lo-email-tf'), 
	                   $('#lo-pass-tf')
	                  ];
	this.controlGroups = [$('#lo-email-cg'), 
		                  $('#lo-pass-cg')
			             ];
	
	this.validateEmail = function(e){
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(e);
	}
	this.validatePassword = function(s)
	{
		return s.length >= 6;
	}
	this.showErrors = function(e){
		for(var i=0;i<e.length;i++){
			alert(e[i]);
		}
	}
}
LoginValidator.prototype.validateForm=function(){
	var e = [];
	for (var i=0; i < this.controlGroups.length; i++) this.controlGroups[i].removeClass('error');
	if (this.validateEmail(this.formFields[0].val()) == false) {
		this.controlGroups[0].addClass('error'); e.push('Please Enter A Valid Email');
	}
	if (this.validatePassword(this.formFields[1].val()) == false) {
		this.controlGroups[1].addClass('error');
		e.push('Password Should Be At Least 6 Characters');
	}
	if (e.length) this.showErrors(e);
	
	return e.length === 0;
}