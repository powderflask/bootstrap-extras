/**
 * Slideout Tools Component (v0.1): slideout-tool.js
 *   -- adds control to a fixed toolbar menu with slideout buttons
 *
 *   Dependencies:  Bootstrap + JQuery + spinner
 *   MIT Open-source License (https://github.com/powderflask/bootstrap_extras/blob/master/LICENSE)
 */
require( './jquery-ui-widget');
require( './jquery-ui-widget-extensions');
require( './spinner');
require( './util' );

;(function( $, window, document, undefined ) {

    var widgetName = 'bse.slideout_tool',
        widgetClass = 'bse-slideout',
        classes = widgetClass.buildNamesMap(['toolbar', 'button', 'icon', 'label']),
        selectors = widgetClass.buildNamesMap(['tool', 'button'], '.'),
        toolbar_selector = '#' + classes.toolbar,

        markup = {
            toolbar: ['<div>', {'id': classes.toolbar}],
            button: ['<div>', {'class': classes.button, 'data-ordinal': "0"}],
            icon: ['<div>', {'class': classes.icon}],
            label: ['<div>', {'class': classes.label}],
            rotate: ['<div>', {'class': 'bse-rotate-90'}]
        };

    $.widget( widgetName, {

        // Options to be used as defaults
        options: {
            ordinal: 0,       // any values can be used to control ordering of buttons in toolbar, top-to-bottom
            hide: true,       // hide this.element after moving its functionality to the toolbar
            action: 'click',  // event to trigger on this.element when toolbar button is pressed
            container: 'body', // selector for container where the toolbar will be appended
            // event callbacks
            clicked: null     // callback made when this.element clicked, return false to prevent default behaviour
        },

        // Template node for the widget
        _template : function() {
            var label_text = this.element.find('span').html(),
                icon_icon = this.element.find('i').clone(),
                label = $.apply(this, markup.label)
                            .append($.apply(this, markup.rotate).html(label_text)),
                icon = $.apply(this, markup.icon)
                            .append(icon_icon),
                button = $.apply(this, markup.button)
                            .append(icon)
                            .append(label);
            button.label = label;
            button.label_element = label.find('div');
            button.data('ordinal', this.options.ordinal);  // set the ordinal in the DOM so it's easy to retrieve later
            button.attr('title', this.element.attr('title')); // copy over the button title
            this.options.hide ? this.element.hide():null;
            return button;
        },

        // Get the slideout toolbar, creating if neccessary (singleton pattern)
        _getToolbar: function() {
            var toolbar = $(toolbar_selector);
            if (toolbar.length === 0) {
                toolbar = $.apply(this, markup.toolbar);
                $(this.options.container).append(toolbar);
            }
            return toolbar;
        },

        // Add a button representing this.element's function to the toolbar
        _addToToolbar: function(button) {
            var toolbar = this._getToolbar(),
                added = false,
                self = this;
            // Attempt to insert in ordinal order
            toolbar.find(selectors.button).each(function(){
                if (self.options.ordinal < $(this).data('ordinal')) {
                    button.insertBefore($(this));
                    added = true;
                    return false;
                }
            });
            // Fallback - append button to end of toolbar.
            !added ? toolbar.append(button):null;
        },

        // if the element has a spinner configured, mirror it on the slideout
        _activate_spinner: function() {
            var orig_spinner = this.element.spinner('instance'),
                destination = this.button.label;
            if (orig_spinner) {
                destination.spinner(orig_spinner.options);
                orig_spinner.options.hidden = function (event) {
                    destination.spinner('hide');
                };
                orig_spinner.options.shown = function (event) {
                    destination.spinner('show');
                }
            }
        },

        // trigger the action on this.element corresponding to a click on the slideout tool
        _triggerNativeEvent: function(event) {
            // can't use trigger to mimic native browser events: http://learn.jquery.com/events/triggering-event-handlers/
            // instead, use the native click() on the native JS a element.
            // NOTE: same issue will apply to form submit and other native JS events ** sigh **
            if (this.element.is('a') && this.options.action === 'click')
                this.element[0].click();
            else
                this.element.trigger(this.options.action);
        },

        // Events handled by this widget
        _configureEventHandlers : function() {
            var self = this;
            this.button.click( function(event) {
                self._trigger( 'clicked', event ) ? self._triggerNativeEvent(event):null;
            });
        },

        // Initialize widget instance (e.g. element creation, apply theming, bind events etc.)
        _create: function () {
            // console.log('Create ', widgetName, 'instance for', this.element);
            this._getDataOptions(); // if widget recognizes data-* options in markup
            this.button = this._template();
            this._addToToolbar(this.button);
            this._configureEventHandlers();
            this._activate_spinner();
        },

        // Destroy plugin instance  and clean up modifications the widget has made to the DOM
        _destroy: function () {
            // console.log('Destroy:', this);
            this.button.remove();
            this.element.show();
        },

        // Retreive or set the button label
        label: function(label_text) {
            if (label_text){
                this.button.label_element.html(label_text);
            }
            else {
                return this.button.label_element.html();
            }
        }
    });

    $(selectors.tool).slideout_tool();

})( jQuery, window, document );