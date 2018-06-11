/**
 * AJAX Save This Component (v0.1): ajax_save.js
 *   -- simple form sumbit via ajax.
 *
 *   Dependencies:  Bootstrap + JQuery + spinner
 *   MIT Open-source License (https://github.com/powderflask/bootstrap_extras/blob/master/LICENSE)
 */
require( './spinner');
require( './jquery-ui-widget');
require( './jquery-ui-widget-extensions');
require( './util' );

;(function( $, window, document, undefined ) {

    var widgetName = 'bse.ajax_save',
        widgetClass = 'bse-ajax-save',
        selectors = widgetClass.buildNamesMap(['this'], '.');

    $.widget( widgetName, {

        // Options to be used as defaults
        options: {
            action: false,
            method: 'POST',

            // event callbacks (ajax event callbacks also trigger)
            saveForm: null   // called just before save request made - return false to prevent default action
        },

        // Configure the widget controls (edit icon and form elements)
        _configureControls : function() {
            this.form = this.element;
            this.form.spinner( { disable_on_spin: true } );
            this.spinner = this.form.spinner('instance');
            this.options.action = this.options.action || this.form.attr('action');
        },

        // Events handled by this widget
        _configureEventHandlers : function() {
            var self = this;

            this.element.submit( function (event) {
                event.preventDefault();
                self._saveForm(event);
            });
        },

        // Initialize widget instance (e.g. element creation, apply theming, bind events etc.)
        _create: function () {
            // console.log("Create ", widgetName, " instance for", this.element);
            this._ajaxConfig();
            this._getDataOptions();
            this._configureControls();
            this._configureEventHandlers();
        },

        // Destroy plugin instance  and clean up modifications the widget has made to the DOM
        _destroy: function () {
            // console.log("Destroy: ", this.element);
            this.element.off('submit');
            // TO DO: put form back from whence it came?
        },

        _saveForm: function ( event ) {
            // allow user to augment or override default save logic
            var go = this._trigger( 'saveForm', event, { form_data: this.form.serialize() });
            if ( go && this.options.action ) {
                this._ajaxSubmitForm(this.form, this.options);
            }
        }
    });

    $(selectors['this']).ajax_save();

})( jQuery, window, document );

