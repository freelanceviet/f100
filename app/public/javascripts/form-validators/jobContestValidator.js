function ContestBostValidator(){
	// build array maps of the form inputs & control groups
	this.formFields = [
						$('#project_name'),
						$('.contest_skill')
	                  ];
	
	this.validateProjectName = function(s){
		return s.length >= 10;
	}
	this.validateSkill = function(s)
	{
		return $('.contest_skill').length;
	}
	this.showErrors = function(e){
		for(var i=0;i<e.length;i++){
			alert(e[i]);
		}
	}
}
ContestBostValidator.prototype.validateForm=function(){
	var e = [];
	if (this.validateProjectName(this.formFields[0].val()) == false) {
		e.push('This field is required (project name).');
	}
	if (this.validateSkill(this.formFields[1].val()) == false) {
		e.push('Please select at least 1 skill.');
	}
	if (e.length) this.showErrors(e);
	
	return e.length === 0;
}