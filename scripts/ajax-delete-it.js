/**
 * AJAX Delete It Component (v0.1): ajax-delete-it.js
 *   -- simple delete request via ajax.
 *
 *   Dependencies:  Bootstrap + JQuery + spinner
 *   MIT Open-source License (https://github.com/powderflask/bootstrap_extras/blob/master/LICENSE)
 */
require( './spinner');
require( './jquery-ui-widget');
require( './jquery-ui-widget-extensions');
require( './util' );

;(function( $, window, document, undefined ) {

    var widgetName = 'bse.ajax_delete_it',
        widgetClass = 'bse-ajax-delete',
        selectors = widgetClass.buildNamesMap(['it', 'control'], '.');

    $.widget( widgetName, {

        // Options to be used as defaults
        options: {
            url: false,      // required option, can be set with data-url attribute on element
            method: 'DELETE',
            confirmation_message: "Confirm delete?  This action can NOT be undone.",  // set to false to disable confirmation

            // event callbacks (ajax event callbacks also trigger)
            deleteIt: null,  // called just before delete request is made - return false to prevent default action
            deletedIt: null  // called after successful delete request has completed.
        },

        // Configure the widget control and target
        _configureControls : function() {
            this.control = this.element.find(selectors.control);
            this.options.url = this.options.url || this.control.attr('href');
            this.control.spinner({ disable_on_spin: true } );
            this.spinner = this.control.spinner('instance');
        },

        // Events handled by this widget
        _configureEventHandlers : function() {
            var self = this;

            this.control.click( function (event) {
                event.preventDefault();
                self._deleteIt(event);
            });

            // Configure default success behaviour, but respect client's custom success callback.
            var client_ajax_success = this.options.ajax_success,
                client_options = $.extend(true, {}, this.options);  // clone original options
            this.options.ajax_success = function(xhr, json) {
                // hide the deleted element and signal deletion is complete.
                self.element.hide();
                if (client_ajax_success)
                    client_ajax_success(xhr, json);
                self._trigger('deletedIt', null, {
                    'element': self.element,
                    'json_response': json
                });
            };
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
            this.control.off('click');
        },

        _confirmDelete: function ( event ) {
            return !this.options.confirmation_message ||
                   confirm(this.options.confirmation_message);
        },

        _deleteIt: function ( event ) {
            if (this._confirmDelete()) {
                // allow user to augment or override default save logic
                var go = this._trigger( 'deleteIt', event );
                if ( go && this.options.url ) {
                    this._ajaxDelete(this.element, this.options);
                }
            }
        }
    });

    $(selectors.it).ajax_delete_it();

})( jQuery, window, document );

