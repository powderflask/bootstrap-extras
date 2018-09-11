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
            return $.apply(this, markup.spinner).hide().
                     html(this.options.spin_text).
                     prop('title', this.options.spin_text);
        },

        _getDisableTargets : function() {
            if (!this.options.disable_on_spin)
                return $();

            // If the spinner element is a form or a submit button on a form...
            var isForm = this.element.is('form, :submit'),
                form = this.element.closest('form');
            if (isForm && form.length > 0)
                return form.find(':input');   //  ...disable all inputs on the form.
            // Not a form, so disable the element and any inputs contained within it.
            return this.element.find(':input').addBack();
        },

        // Initialize widget instance (e.g. element creation, apply theming, bind events etc.)
        _create: function () {
            // console.log('Appending', widgetName, 'instance to', this.element, ':');
            this._getDataOptions();
            this.spinner = this._template();
            // console.log(this.spinner);
            this.element.append(this.spinner);
            this.original_title = this.element.attr('title') || "";
            this.targets = this._getDisableTargets();
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

        // Disable spinner 'targets' -- form elements and anchors related to the spinner element
        disable_targets: function(disabled) {
            disabled = disabled || false;   // default is to disable the targets -- pass true to enable them.
            // Simply add or remove the disabled class - ain't bootstrap awesome!
            var op = disabled ? 'addClass' : 'removeClass';
            this.targets[op]('disabled');
            // ... and disable/enable any form inputs related to the spinner element
            this.targets.prop('disabled', disabled);

        },
        // Show, Hide, and Toggle the spinner.
        hide: function(event) {
            this.element.attr('title', this.original_title);
            this.disable_targets(false);
            this.spinner.hide();
            this._trigger( 'hidden' , event);
        },
        show: function(event) {
            this.spinner.show();
            this.element.attr('title', this.options.spin_text);
            this.disable_targets(true);
            this._trigger( 'shown' , event);
        },
        toggle : function(event) {
            if (this.spinner.is(":visible")) this.hide(event); else this.show(event);
        }
    });

    $(selectors.append).spinner();

})( jQuery, window, document );