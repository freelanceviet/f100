function JobBostValidator(){
	// build array maps of the form inputs & control groups
	this.formFields = [
						$('#project_name'),
						$('#job_skill'),
						$('#job_description'),
						$('#min_sum'),
						$('#max_sum')
	                  ];
	
	this.validateProjectName = function(s){
		return s.length >= 10;
	}
	this.validateSkill = function(s)
	{
		return $('.job_skill').length;
	}
	this.validateDescription = function(s)
	{
		return s.length >= 30;
	}
	this.validateMinSum = function(s)
	{
		return s.val() >= 10;
	}
	this.validateMaxSum = function(s)
	{
		return s.length >= 6;
	}
	this.showErrors = function(e){
		
	}
}
JobBostValidator.prototype.validateForm=function(){
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