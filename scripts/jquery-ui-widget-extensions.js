/**
 * Extensions for jQuery UI Widget Factory
 *    - _getDataOptions:  load options from data-option attributes in element's markup
 *    - _ajaxConfig
 *
 *   MIT Open-source License (https://github.com/powderflask/bootstrap_extras/blob/master/LICENSE)
 */

require( './jquery-ui-widget');
require( './util');

(function( $, window, document, undefined ) {

    const ajax_error_template =
        '<div class="alert alert-warning alert-dismissible" role="alert">' +
            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
            '</button>' +
            'Oops! We encountered an error processing your request: {textStatus}' +
            '<br>Refresh page and try again?' +
        '</div>';

    var WidgetExtensionsMixin = {
        // Load any data- attribute options from the element's tag
        _getDataOptions : function() {
            var data_opts = this.element.data();
            opts = this.options;
            Object.keys(data_opts).forEach(function(key) {
                if (key in opts) {
                    opts[key] = data_opts[key];
                }
            });
        },

       /*
         * Standardized jQuery.ajax calls with default behaviours + triggers for BSE widgets
         *   E.g., this.ajax_submit_form({ optional_ajax_settings_or_overrides })
         *   Adds an optional callback and trigger for each local Ajax Event.
         */

        // Add ajax trigger events to this widget's options
        _ajaxConfig : function() {
             // Events triggered by ajax calls, used to extend widget options
            const ajax_event_options= {
                ajax_beforeSend: null,
                ajax_success: null,
                ajax_error: null,
                ajax_complete: null
            };
            $.extend(this.options, ajax_event_options);
        },


        // Submit this.form by ajax, with an optional this.spinner to display while loading
        _ajaxSubmitForm : function(settings) {
            console.assert(this.form, "BSE ajax_submit_form Error: this.form must be set on widget.");
            var form_data = this.form.serialize() || "",
                extra_data = settings.data || "",
                action = settings.action || form.attr('action'),
                method = settings.method || form.attr('method') || 'POST';
            console.assert(action, "BSE ajax_submit_form Error: a form action option must be supplied.");

            var self = this;
            args = {
                url: action,
                method: method,
                data: form_data + extra_data,

                // Ajax events
                beforeSend: function () {
                    if (self.spinner) self.spinner.show();
                    if (settings.beforeSend) settings.beforeSend();
                    self._trigger('ajax_beforeSend', null, {form_data: form_data, args: arguments});
                },
                success: function (json, textStatus, xhr) {
                    if (json.message) self.form.before(json.message);
                    if (settings.success) settings.success();
                    self._trigger('ajax_sucess', null, {args: arguments});
                },
                error: function (xhr, textStatus, errorThrown) {
                    self.form.after($(ajax_error_template.formatUnicorn({textStatus: textStatus})));
                    console.log(xhr.status + ": " + xhr.responseText);
                    console.log(errorThrown);
                    if (settings.error) settings.error();
                    self._trigger('ajax_error', null, {args: arguments});
                },
                complete: function (xhr, textStatus) {
                    if (self.spinner) self.spinner.hide();
                    if (settings.complete) settings.complete();
                    self._trigger('ajax_complete', null, {args: arguments});
                }
            };

            $.ajax(args);

        }
    };

    if ('Widget' in $) {
        Object.assign($.Widget.prototype, WidgetExtensionsMixin);
    }
})(jQuery, window, document);
