$(document).ready(function () {
    $('#form_login').ajaxForm({
        dataType: 'json',
        beforeSubmit: validate,
        success: showResponse
    });
    $('#form_register').ajaxForm({
        dataType: 'json',
        beforeSubmit: validate,
        success: showResponse
    });

    //Validate form
    function validate(formData, jqForm, options) {
        for (var i = 0; i < formData.length; i++) {
            if (!formData[i].value) {
                alert(formData[i].value);
                return false;
            }
        }
        alert('Both fields contain values.');
    }
    //action form when form succefful
    function showResponse(data) {
        alert(data);
    }
});