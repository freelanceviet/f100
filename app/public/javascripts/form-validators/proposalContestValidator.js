function ProposalContestValidator(){
	// build array maps of the form inputs & control groups
	this.formFields = [$('#des_proposal')
	                  ];
	this.validateDescription = function(s){
		return s.length>=20;
	}
	
	this.showErrors = function(e){
		if(e.length>0){
			for(var i=0;i<e.length;i++){
				e[i].addClass('post_co_err');
			}
		}
	}
}
ProposalContestValidator.prototype.validateForm=function(){
	// Add place to form
	var errInput = [];
	if (this.validateDescription(this.formFields[0].val()) == false) {
		errInput.push(this.formFields[0]);
	}
	
	if (errInput.length) this.showErrors(errInput);
	
	return errInput.length === 0;
}