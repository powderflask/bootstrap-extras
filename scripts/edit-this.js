/**
 * Edit This Component (v0.1): edit-this.js
 *   -- toggle display value with edit form for the value
 *   -- optionally, AJAX save edited form.
 *
 *   Dependencies:  Bootstrap + JQuery
 *   MIT Open-source License (https://github.com/powderflask/bootstrap_extras/blob/master/LICENSE)
 */
require( './jquery-ui-widget');
require( './jquery-ui-widget-extensions');
require( './util' );

;(function( $, window, document, undefined ) {

    var widgetName = 'bse.edit_this',
        widgetClass = 'bse-edit-this',
        classes = widgetClass.buildNamesMap(['icon', 'content', 'control']),
        selectors = widgetClass.buildNamesMap(['content', 'control'], '.'),

        markup = {
            edit_icon: ['<span>', {'class': classes.icon, 'aria-hidden': 'true'}]
         };

    $.widget( widgetName, {

        // Options to be used as defaults
        options: {
            action: false,
            method: 'POST',
            icon_class: 'glyphicon glyphicon-edit',
            icon_title: 'Edit this',

            // event callbacks (ajax event callbacks also trigger)
            saveForm: null,   // called when range_input is changed, before saving - return false to prevent default action
            showForm: null,   // called when form is shown
            hideForm: null    // called when form is hidden
        },

        // Update the content area from the current form value.
        _updateContent : function() {
            // TODO: getting display value for any input type requires more logic... ** sigh **
            var value = this.form_control.is('select')?
                            this.form_control.find('option:selected').text():
                            this.form_control.val();
            this.content.html(value);
            this.content.append(this.edit_icon);
        },

        // Configure the widget controls (edit icon and form elements)
        _configureControls : function() {
            this.content = this.element.find(selectors.content);
            this.edit_icon = $.apply(this, markup.edit_icon)
                              .addClass(this.options.icon_class)
                              .attr('title', this.options.icon_title);
            this.content.append(this.edit_icon);

            // And the form...
            var form_id = this.element.data('form_id');
            this.form = $('#'+form_id);
            // Configure optional Ajax save with callback to hide the form on successful requests.
            this.form.ajax_save_form( $.extend(this.options, {ajax_success:this.hideForm.bind(this)}) );

            // ... move form to edit-this panel ...
            controls = this.form.find( selectors.control );
            console.assert(controls.length === 1, "BSE edit_this Error: a single control must be supplied\"")
            this.form_control = $(controls[0]);
            this.element.append(this.form.hide());
        },

        // is the target element part of the widget element?
        _contains : function(target) {
            return target.closest(this.element).length > 0;
        },

        // Events handled by this widget
        _configureEventHandlers : function() {
            var self = this;

            this.content.on('click', function (event) {
                event.preventDefault();
                self.showForm(event);
                self.form_control.focus();
            });
            // hide form on clicks that are not within the element.
            $('body').click(function(event) {
                if (!self._contains($(event.target))) {
                    self.hideForm(event);
                }
            });

            this.form.on('change', function (event) {
                event.preventDefault();
                self._updateContent();
                self.form.submit();
                self.hideForm(event);
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
            this.edit_icon.remove();
            this.hideForm();
            this.content.off('click');
            // TO DO: put form back from whence it came?
        },

        // Public methods
        showForm : function(event) {
            this.content.hide();
            this.form.show();
            this._trigger( 'showForm', event);
        },
        hideForm : function(event) {
            this.form.hide();
            this.content.show();
            this._trigger( 'hideForm', event);
        },
        isFormVisible: function() {
            return this.form.is(":visible");
        },
        toggleForm : function(event) {
            this.isFormVisible() ? this.showForm(event) : this.hideForm(event);
        }
    });

    $(selectors[widgetClass]).edit_this();

})( jQuery, window, document );

