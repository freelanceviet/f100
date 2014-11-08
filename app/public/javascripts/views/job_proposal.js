$(document).ready(function(){
	// Event change status of proposal job
	$('body').on('change', '.change_status_proposal_job', function (e) {
		var dialog = $( "#dialog-form" ).dialog({
			autoOpen: false,
			height: 300,
			width: 350,
			modal: true,
			close: function() {
				form[ 0 ].reset();
				allFields.removeClass( "ui-state-error" );
			}
		});
		dialog.dialog( "open" );
	});
});
