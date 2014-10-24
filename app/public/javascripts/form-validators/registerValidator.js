function RegisterValidator(){
	// build array maps of the form inputs & control groups
	this.formFields = [$('#reg-first-name-tf'), 
	                   $('#reg-last-name-tf'), 
	                   $('#reg-email-tf'), 
	                   $('#reg-pass-tf')
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
	this.showErrors = function(e){
		for(var i=0;i<e.length;i++){
			alert(e[i]);
		}
	}
}
RegisterValidator.prototype.validateForm=function(){
	// Add place to form
	var e = [];
	if (this.validateFirstName(this.formFields[0].val()) == false) {
		e.push('Please Enter First Name');
	}
	if (this.validateLastName(this.formFields[1].val()) == false) {
		e.push('Please Enter Last Name');
	}
	if (this.validateEmail(this.formFields[2].val()) == false) {
		this.controlGroups[2].addClass('error'); e.push('Please Enter A Valid Email');
	}
	if (this.validatePassword(this.formFields[3].val()) == false) {
		e.push('Password Should Be At Least 6 Characters');
	}
	
	if (e.length) this.showErrors(e);
	
	return e.length === 0;
}