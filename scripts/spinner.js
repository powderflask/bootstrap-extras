/**
 * AJAX Loading Spinner (v0.1): spinner.js
 *   -- a JQuery plugin spinner to signal asyn request in-progress
 *
 *   Dependencies:  Bootstrap + JQuery
 *   MIT Open-source License (https://github.com/powderflask/bootstrap_extras/blob/master/LICENSE)
 */
module.exports = function ( $ ) {

    $.fn.spinner = function( action, text ) {
        text = text || 'Saving…';
        var spinner = $('<span class="spinner" style="display:none">'+text+'</span>');
        if (action=='append') {
            this.append(spinner);
        }
        else {
            return spinner;
        }
        return this;
    };

    $('.spinner-append').spinner('append');

};

