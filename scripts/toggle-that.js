/**
 * Toggle That (v0.1): toggle-that.js
 *   -- toggle a collection of elements from a set of controls
 *
 *   Dependencies:  Bootstrap + JQuery
 *   MIT Open-source License (https://github.com/powderflask/bootstrap_extras/blob/master/LICENSE)
 */
require( './jquery-ui-widget');
require( './jquery-ui-widget-extensions');

;(function( $, window, document, undefined ) {

    var widgetName = 'bse.toggle_that',
        widgetClass = 'bse-toggle-that',
        selectors = widgetClass.buildNamesMap(['control', 'target'], '.');

    $.widget( widgetName, {

        // Options to be used as defaults
        options: {
            init_toggle: true,   // false to NOT toggle elements during initialization

            // event callbacks (ajax events added during create)
            toggled: null
        },

        // Events handled by this widget
        _configureEventHandlers : function() {
            this.control.click(this.toggle.bind(this));
        },

        // Initialize widget instance (e.g. element creation, apply theming, bind events etc.)
        _create: function () {
            // console.log('Create ', widgetName, 'instance for', this.element);
            this._getDataOptions();
            this.control = this.element.find(selectors.control);
            this.target = this.element.find(selectors.target);
            this._configureEventHandlers();
            if (this.options.init_toggle)
                this.toggle();
         },

        // Destroy plugin instance  and clean up modifications the widget has made to the DOM
        _destroy: function () {
            // console.log('Destroy:', this);
            this.control.off('click');
        },

        // Public methods
        toggle: function(event) {
           this.target.toggle();
           this._trigger( 'toggled' , event);
        }
    });

    $(selectors[widgetClass]).toggle_that();

})( jQuery, window, document );