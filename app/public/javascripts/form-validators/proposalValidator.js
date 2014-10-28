function ProposalValidator(){
	// build array maps of the form inputs & control groups
	this.formFields = [$('#des_proposal')
	                  ];
	this.validateDescription = function(s){
		return s.length>=20;
	}
	
	this.showErrors = function(e){
		for(var i=0;i<e.length;i++){
			alert(e[i]);
		}
	}
}
ProposalValidator.prototype.validateForm=function(){
	// Add place to form
	var e = [];
	if (this.validateDescription(this.formFields[0].val()) == false) {
		e.push('Please Enter description');
	}
	
	if (e.length) this.showErrors(e);
	
	return e.length === 0;
}