/**
 * AJAX Loading Spinner (v0.1): spinner.js
 *   -- a JQuery plugin spinner to signal asyn request in-progress
 *   -- show / hide spinner can optionally control enable/disable widget's element
 *
 *   Dependencies:  Bootstrap + JQuery
 *   MIT Open-source License (https://github.com/powderflask/bootstrap_extras/blob/master/LICENSE)
 */

require( './jquery-ui-widget');
require( './jquery-ui-widget-extensions');

;(function( $, window, document, undefined ) {

    var widgetName = 'bse.spinner',
        widgetClass = 'bse-spinner',
        selectors = {
            'append' : '.'+widgetClass+'-append'
        },
        markup = {
            spinner: ['<span>', {'class': widgetClass}]
        };

    $.widget( widgetName, {

        // Options to be used as defaults
        options: {
            spin_text: 'Saving...',  // title and accessibility text for spinner
            disable_on_spin: false,  // set to true to disable all :inputs in the parent element when spinner shows

            // event callbacks
            hidden: null,   // triggers when spinner is hidden
            shown: null     // triggers when spinner is shown
        },

        // Template node for the widget
        _template : function() {
            return $.apply(this, markup.spinner).hide().html(this.options.spin_text);
        },

        // Initialize widget instance (e.g. element creation, apply theming, bind events etc.)
        _create: function () {
            // console.log('Appending', widgetName, 'instance to', this.element, ':');
            this._getDataOptions();
            this.spinner = this._template();
            // console.log(this.spinner);
            this.element.append(this.spinner);
            this.original_title = this.element.attr('title') || "";
            this.targets = this.options.disable_on_spin?this.element.find(':input'):$();
        },

        // Destroy plugin instance  and clean up modifications the widget has made to the DOM
        _destroy: function () {
            // console.log('Destroy:', this);
            this.spinner.remove();
        },

        // Position the spinner from its relative location
        position: function(relative_pos) {
            this.spinner.css(relative_pos);
        },

        // Show, Hide, and Toggle the spinner.
        hide: function(event) {
            this.element.attr('title', this.original_title);
            this.targets.prop('disabled', false);
            this.spinner.hide();
            this._trigger( 'hidden' , event);
        },
        show: function(event) {
            this.spinner.show();
            this.element.attr('title', this.options.spin_text);
            this.targets.prop('disabled', true);
            this._trigger( 'shown' , event);
        },
        toggle : function(event) {
            if (this.spinner.is(":visible")) this.hide(event); else this.show(event);
        }
    });

    $(selectors.append).spinner();

})( jQuery, window, document );