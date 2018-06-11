/*!
 * jQuery UI Widget-factory plugin boilerplate (for 1.9+)
 * Author: @addyosmani
 * Further changes: @peolanha
 * https://addyosmani.com/resources/essentialjsdesignpatterns/book/#jquerypluginpatterns
 * Licensed under the MIT license
 */
require( './jquery-ui-widget');
require( './jquery-ui-widget-extensions');
require( './util');

;(function( $, window, document, undefined ) {

    var widgetName = 'bse.widgetname',
        widgetClass = 'bse-widget',
        classes = widgetClass.buildNamesMap(['className']),
        selectors = widgetClass.buildNamesMap(['action'], '.'),

        markup = {
            item: ['<div>', {'class': widgetClass}]
        };

    $.widget( widgetName, {

        // Options to be used as defaults
        options: {
            someValue: null,

            // event callbacks (ajax events added during create)
            event_callback: null,
            event_override: null,
        },

        // Template node for the widget
        _template : function() {
            return $.apply(this, markup.item);
        },

        // Events handled by this widget
        _configureEventHandlers : function() {
            console.log('Configure Event Handlers for:', this);
        },

        // Initialize widget instance (e.g. element creation, apply theming, bind events etc.)
        _create: function () {
            console.log('Create ', widgetName, 'instance for', this.element);
            this._ajaxConfig();    // if widget will use _ajax extensions
            this._getDataOptions(); // if widget recognizes data-* options in markup
            this.item = this._template();

            // Access the element on which the widget was called via this.element
            // Access widget options via this.options
            this._configureEventHandlers();

            // Provide default behaviour that can be overridden by supplying callback option
            this.options.event_override = this.defaultAction.bind(this);
        },

        // Destroy plugin instance  and clean up modifications the widget has made to the DOM
        _destroy: function () {
            console.log('Destroy:', this);
        },

        _privateMethod: function ( event ) {
            //_trigger dispatches callbacks the plugin user can subscribe to
            this._trigger( 'event_override', event, {
                key: value
            });
        },

        defaultAction: function ( event ) {
            console.log('Defaut action callback was triggered.');
        },

        // Respond to any changes the user makes to the option method
        _setOption: function ( key, value ) {
            switch ( key ) {
                case 'someValue':
                    // this.options.someValue = doSomethingWith( value );
                    break;
                default:
                    // this.options[ key ] = value;
                    break;
            }
            this._super( '_setOption', key, value );
        }
    });

})( jQuery, window, document );