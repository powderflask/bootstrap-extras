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
            this.options = $.extend({}, ajax_event_options, this.options);
        },


        // Submit this.form by ajax, with an optional this.spinner to display while loading
        _ajaxSubmitForm : function(form, settings) {
            var args = Object.create(settings),
                form_data = form.serialize() || "",
                extra_data = settings.data || "";
            args.data = form_data + extra_data;
            args.method = settings.method || form.attr('method') || 'POST';
            args.url = settings.action || settings.url || form.attr('action');
            console.assert(args.url, "BSE ajaxSubmitForm Error: a url or form action option must be supplied.");

            this._ajaxRequest(form, args);
        },

        // Make a DELETE ajax request for this.element, with an optional this.spinner to display while loading
        _ajaxDelete : function(target, settings) {
            var args = Object.create(settings);
            args.method = settings.method || 'DELETE';
            args.url = settings.url || settings.action;
            console.assert(args.url, "BSE ajaxDelete Error: a url must be supplied.");

            this._ajaxRequest(target, args);
        },

        _ajaxRequest: function(target, args) {
            var self = this,
                ajax_events = {
                    beforeSend: function () {
                        if (self.spinner) self.spinner.show();
                        self._trigger('ajax_beforeSend', null, {args: args});
                    },
                    success: function (json, textStatus, xhr) {
                        if (json.message) target.after(json.message);
                        self._trigger('ajax_success', null, {args: arguments});
                    },
                    error: function (xhr, textStatus, errorThrown) {
                        target.after($(ajax_error_template.formatUnicorn({textStatus: textStatus})));
                        console.log(xhr.status + ": " + xhr.responseText);
                        console.log(errorThrown);
                        self._trigger('ajax_error', null, {args: args, xhr_args: arguments});
                    },
                    complete: function (xhr, textStatus) {
                        if (self.spinner) self.spinner.hide();
                        self._trigger('ajax_complete', null, {args: args, xhr_args: arguments});
                    }
                };

            $.ajax($.extend(ajax_events, args));
        }
    };

    if ('Widget' in $) {
        Object.assign($.Widget.prototype, WidgetExtensionsMixin);
    }
})(jQuery, window, document);
