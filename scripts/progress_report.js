/**
 * Progress Report Component (v0.1): progress_report.js
 *   -- a Bootstrap Progress Bar with an interactive range input
 *   -- AJAX save selected value using standard HMTL form.
 *
 *   Dependencies:  Bootstrap + JQuery + spinner
 *   MIT Open-source License (https://github.com/powderflask/bootstrap_extras/blob/master/LICENSE)
 */
require( './spinner');
require( './jquery-ui-widget');
require( './jquery-ui-widget-extensions');
require( './util' );

;(function( $, window, document, undefined ) {

    var widgetName = 'bse.progress_report',
        widgetClass = 'bse-progress-report',
        classes = widgetClass.buildNamesMap(['panel', 'form', 'value']),
        selectors = widgetClass.buildNamesMap(['wrap'], '.'),

        markup = {
            panel : ['<div>', {'class': classes.panel}],
            form : ['<form>', {'class': classes.form}],
            input : ['<input>', {type:'range', 'class': widgetClass, name:classes.value, required:''}]
        };

    $.widget( widgetName, {

        // Options to be used as defaults
        options: {
            min: 0,
            max: 100,
            url: false,
            type: 'POST',

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
            // add a spinner that also enables / disables the form control
            this.form.spinner({
                disable_on_spin: true,
                'hidden': function() {this.range_input.blur()}.bind(this)
            });
            this.spinner = this.form.spinner('instance');
            // configure range_input
            this.range_input.attr('min', this.options.min).attr('max', this.options.max);
            this.range_input.val(this.value);

            return this.panel;
        },

        // Events handled by this widget
        _configureEventHandlers : function() {
            var self = this;

            this.range_input.on('input', function(event) {
                self.value = self.range_input.val() || 0;
                self.progress_bar.text(self.value + '% Complete');
                self.progress_bar.css( 'width', self.value+'%');
                self.spinner.position( {top: '-1em', left:(self.value-1)+'%'} );
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
                self._saveForm(event);
                self.form.hide();
            });
        },

        // Initialize widget instance (e.g. element creation, apply theming, bind events etc.)
        _create: function () {
            // console.log("Create ", widgetName, " instance for", this.element);
            this._getDataOptions();
            this._ajaxConfig();
            this.element.after(this._template());
            this.element.hide();
            this._configureEventHandlers();
        },

        // Destroy plugin instance  and clean up modifications the widget has made to the DOM
        _destroy: function () {
            console.log("Destroy: ", this.panel);
            this.panel.remove();
            this.element.show();
        },

        // Progress bar was moved, potentially save this change.
        _saveForm: function ( event ) {
            // allow user to augment or override default save logic
            var go = this._trigger( 'saveForm', event, { form_data: this.form.serialize(),
                                                     progress: this.value });
            if ( go && this.options.url ) {
                this._ajaxSubmitForm(this.options);
            }
        }
    });

    $(selectors.wrap).progress_report();

})( jQuery, window, document );

