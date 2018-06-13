/**
 * Move To Component (v0.1): move-this.js
 *   -- toggle display value with edit form for the value
 *   -- optionally, AJAX save edited form.
 *
 *   Dependencies:  Bootstrap + JQuery
 *   MIT Open-source License (https://github.com/powderflask/bootstrap_extras/blob/master/LICENSE)
 */

require( './jquery-ui-widget');
require( './jquery-ui-widget-extensions');

;(function( $, window, document, undefined ) {

    var widgetName = 'bse.move_this',
        widgetClass = 'bse-move-this',
        selectors = widgetClass.buildNamesMap([], '.');

    $.widget( widgetName, {
        // Options to be used as defaults
        options: {
            target: null  // selector for move target, may also be supplied via markup data- attribute
        },

        // Initialize widget instance (e.g. element creation, apply theming, bind events etc.)
        _create: function () {
            // console.log('Create ', widgetName, 'instance for', this.element);
            this._getDataOptions(); // if widget recognizes data-* options in markup

            console.assert(this.options.target, "BSE move_this Error: a target selector must be supplied");
            $(this.options.target).append(this.element);
        }
    });

    $(selectors[widgetClass]).move_this();

})( jQuery, window, document );