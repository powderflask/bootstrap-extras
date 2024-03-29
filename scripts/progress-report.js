/**
 * Progress Report Component (v0.1): progress-report.js
 *   -- a Bootstrap Progress Bar with an interactive range input
 *   -- AJAX save selected value using standard HMTL form.
 *
 *   Dependencies:  Bootstrap + JQuery + spinner
 *   MIT Open-source License (https://github.com/powderflask/bootstrap_extras/blob/master/LICENSE)
 */
require( './jquery-ui-widget');
require( './jquery-ui-widget-extensions');
require('./ajax-save-form');
require( './spinner');
require( './util' );

;(function( $, window, document, undefined ) {

    var widgetName = 'bse.progress_report',
        widgetClass = 'bse-progress-report',
        classes = widgetClass.buildNamesMap(['panel', 'form', 'value']),
        selectors = widgetClass.buildNamesMap([], '.'),

        markup = {
            panel : ['<div>', {'class': classes.panel}],
            form : ['<form>', {'class': classes.form}],
            input : ['<input>', {type:'range', 'class': widgetClass, name:classes.value, required:''}]
        };

    $.widget( widgetName, {

        // Options to be used as defaults
        options: {
            min: 0,             // absolute min for progress bar (empty value)
            max: 100,           // absolute max for progress bar (right-hand value)
            lower_bound: 0,     // smallest valid progress value (min <= lower_bound <= upper_bound)
            upper_bound: 100,   // largest valid progress value (lower_bound <= upper_bound <= max)
            action: false,
            method: 'POST',

            // event callbacks (ajax event callbacks also trigger)
            saveForm: null   // called when range_input is changed, before saving - return false to prevent default action
        },

        // Template node for the widget
        _template : function() {
            this.progress = this.element.clone();
            this.progress_bar = this.progress.find('.progress-bar');
            this.value = this.progress_bar.attr('aria-valuenow');
            this.range_input = $.apply(this, markup.input);  // $(...markup.input)
            this.form = $.apply(this, markup.form).append(this.range_input);
            this.panel = $.apply(this, markup.panel).append(this.progress).append(this.form);

            // Configure optional Ajax save with callback to hide form on successful requests.
            this.form.ajax_save_form( $.extend(this.options, {ajax_success:this.form.hide.bind(this.form)}) );
            this.range_input.attr('min', this.options.min).attr('max', this.options.max);
            this.range_input.val(this.value);

            return this.panel;
        },

        // Events handled by this widget
        _configureEventHandlers : function() {
            var self = this,
                spinner = self.form.spinner('instance');  // ouch - tight coupling to ajax-save here.

            this.range_input.on('input', function(event) {
                // constrain value between lower and upper bound
                self.value = Math.max(self.range_input.val() || self.options.min, self.options.lower_bound);
                self.value = Math.min(self.value, self.options.upper_bound);
                self.range_input.val(self.value);
                self.progress_bar.text(self.value + '% Complete');
                self.progress_bar.css( 'width', self.value+'%');
                spinner.position( {top: '-1em', left:(self.value-1)+'%'} );
            });

            this.progress.on('click', function (event) {
                event.preventDefault();
                self.form.show();
                self.range_input.focus();
                self.range_input.blur(function (event) {
                   self.form.hide();
                });
            });

            this.form.on('change', function (event) {
                event.preventDefault();
                self.form.submit();
                self.form.hide();
            });
        },

        // Initialize widget instance (e.g. element creation, apply theming, bind events etc.)
        _create: function () {
            // console.log("Create ", widgetName, " instance for", this.element);
            this._ajaxConfig();
            this._getDataOptions();
            this.element.after(this._template());
            this.element.hide();
            this._configureEventHandlers();
        },

        // Destroy plugin instance  and clean up modifications the widget has made to the DOM
        _destroy: function () {
            console.log("Destroy: ", this.panel);
            this.panel.remove();
            this.element.show();
        }
    });

    $(selectors[widgetClass]).progress_report();

})( jQuery, window, document );

