/**
 * Progress Report Component (v0.1): progress_report.js
 *   -- a Bootstrap Progress Bar with an interactive range input
 *   -- AJAX save selected value using standard HMTL form.
 *
 *   Dependencies:  Bootstrap + JQuery + spinner
 *   MIT Open-source License (https://github.com/powderflask/bootstrap_extras/blob/master/LICENSE)
 */

module.exports = function() {
    var progress_panel = $('.progress-report');
    var progress = progress_panel.find('.progress');
    var progress_bar = progress.find('.progress-bar');
    var progress_form = progress_panel.find('.progress-form');
    var spinner = $().spinner();
    progress_form.append(spinner).hide( );
    // var spinner = progress_form.find('.spinner');

    var range_input = progress_form.find('.progress-input');
    range_input.on('input', function(event) {
        progress_bar.text(range_input.val() + "% Complete");
        progress_bar.css( "width", range_input.val()+"%");
    });

    progress.on('click', function (event) {
        event.preventDefault();
        progress_form.show();
        range_input.focus();
        range_input.blur(function (event) {
           progress_form.hide();
        });
    });
    progress_form.on('change', function (event) {
        event.preventDefault();
        save_progress();
        progress_form.hide();
    });

    function save_progress() {
        // console.log("save_progress is working!"); // sanity check

        var form_data = progress_form.serialize();
        //console.log(form_data);
        spinner.show();
        range_input.prop('disabled', true);

        console.log("Ajax Call here");
        spinner.hide();
        range_input.prop('disabled', false);

/*
        $.ajax({
            url : progress_form.attr('action'),
            type : "POST", // http method
            data : form_data, // data sent with the post request

            // handle a successful response
            success : function(json) {
                // console.log("JSON RESPONSE:", json); // Sanity check
                spinner.hide();
                range_input.prop('disabled', false);

                if (json.message) {
                    progress_form.before(json.message);
                }
            },

            // handle a non-successful response
            error : function(xhr,errmsg,err) {
                // Undo loading UI...
                spinner.hide();
                range_input.prop('disabled', false);
                progress_form.show();
                // Add an error messge.
                progress_form.after('<div class="alert alert-warning alert-dismissible" role="alert">' +
                                    '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                                        '<span aria-hidden="true">&times;</span>' +
                                    '</button>' +
                                    'Oops! We encountered an error processing your request: '+ errmsg +
                                    '<br>Refresh page and try again?' +
                                '</div>'); // add the error to the dom
                console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            }
        });
        */
    }
};
