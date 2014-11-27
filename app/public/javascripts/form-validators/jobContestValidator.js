function ContestBostValidator(){
	// build array maps of the form inputs & control groups
	this.formFields = [
						$('#project_name'),
						$('#job_description')
	                  ];
	
	this.validatePostComment = function(s){
		return s.length >= 10;
	}
	this.validateProjectName = function(s){
		return s.length >= 10;
	}
	this.validateDescription = function(s){
		return s.length >= 10;
	}
	this.showErrors = function(errGroupOPtion){
		$('input').removeClass('post_co_err');
		$('ul').removeClass('post_co_err');
		if(errGroupOPtion.length>0){
			$(window).scrollTop(0);
			for(var i=0;i<errGroupOPtion.length;i++){
				if(errGroupOPtion[i] != ".contest_skill"){
					errGroupOPtion[i].addClass('post_co_err');
				}else{
					$('.au_skill').find('.tagit').addClass('post_co_err');
				}
			}
		}
	}
	this.showErrorPostCommentContest = function(errGroupOPtion){
		if(errGroupOPtion.length>0){
			$('.enterTit').css('display','block');
		}
	}
}
// Post contest
ContestBostValidator.prototype.validateForm=function(){
	var errGroupOPtion = [];
	if (this.validateProjectName(this.formFields[0].val()) == false) {
		errGroupOPtion.push(this.formFields[0]);
	}
	if (this.validateDescription(this.formFields[1].val()) == false) {
		errGroupOPtion.push(this.formFields[1]);
	}
	if (errGroupOPtion.length) this.showErrors(errGroupOPtion);
	
	return errGroupOPtion.length === 0;
}
// Post comment for contest
ContestBostValidator.prototype.validatePostCommentAction = function(){
	var e = [];
	if (this.validatePostComment($('#f_comment_contest').val()) == false) {
		e.push('err');
	}
	
	if (e.length) this.showErrorPostCommentContest(e);
	
	return e.length === 0;
}