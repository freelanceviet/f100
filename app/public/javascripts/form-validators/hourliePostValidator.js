//--------------------------------------
// Validate form post job
//--------------------------------------

function HourliePostValidator(){
	// build array maps of the form inputs & control groups
	this.formFields = [
						$('#project_name'),
						$('#job_description'),
						$('.free_file_item'),
						$('#hourlie_price')
	                  ];
	
	this.validateProjectName = function(s){
		return s.length >= 10;
	}
	this.validateDescription = function(s)
	{
		return s.length >= 30;
	}
	this.validateFile = function(s)
	{
		return $('.free_file_item').length;
	}
	this.validatePrice = function(s){
		return s >= 5;
	}
	this.showErrors = function(e){
		for(var i=0;i<e.length;i++){
			alert(e[i]);
		}
	}
}
HourliePostValidator.prototype.validateForm=function(){
	var e = [];
	if (this.validateProjectName(this.formFields[0].val()) == false) {
		e.push('This field is required (project name).');
	}
	if (this.validateDescription(this.formFields[1].val()) == false) {
		e.push('This filed not empty (description).');
	}
	if (this.validateFile(this.formFields[2].length) == false) {
		e.push('This field is required.');
	}
	if (this.validatePrice(this.formFields[3].val()) == false) {
		e.push('Price it not empty.');
	}
	
	if (e.length) this.showErrors(e);
	
	return e.length === 0;
}