/**
 * Table Column Collapse (v0.1): col_collapse.js
 *   -- Collapse / Expand table columns by clicking on a cc-control.
 *   -- Demo: https://jsfiddle.net/powderflask/gd7ct85q/
 *   Use data-controls attribute on control to specify class of cc-target elements to collapse.
 *   Use data-controls='all' to control all cc-target elements
 *
 *   Dependencies:  Bootstrap + JQuery
 *   MIT Open-source License (https://github.com/powderflask/bootstrap_extras/blob/master/LICENSE)
 */
require( './jquery-ui-widget');
require( './jquery-ui-widget-extensions');
require( './util' );

;(function( $, window, document, undefined ) {

    var widgetName = 'bse.col_collapse',
        widgetClass = 'bse-col-collapse',
        classes = widgetClass.buildNamesMap(['collapsed', 'icon']),
        selectors = widgetClass.buildNamesMap(['collapsed', 'icon', 'add', 'controlAll', 'control'], '.'),

        markup = {
            expand_icon: ['<span>', {'class': classes.icon+' glyphicon glyphicon-resize-full bse-rotate-45',
                                     'aria-hidden': 'true'}],
            item: ['<div>', {'class': widgetClass}]
        };

    $.widget( widgetName, {

        // Options to be used as defaults
        options: {
            control_title: 'Expand/Collapse Column',
            controlAll_title: 'Expand/Collapse All',

            // event callbacks
            collapsed: null,
            expanded: null
        },

        // Configure and return the widget controls
        _configureControls : function() {
            var expand_icon = $.apply(this, markup.expand_icon),
                col_controls = this.element.find(selectors.control),
                global_controls = this.element.find(selectors.controlAll);

            col_controls.append(expand_icon.clone()).attr('title', this.options.control_title);
            global_controls.prepend(expand_icon.clone()).attr('title', this.options.controlAll_title);
            $.data(global_controls, 'controls', col_controls);
            return {
                col : col_controls,
                global : global_controls
            };
        },

        // Configure the collapse targets for each control -- i.e., td elements in the same column
        // Elements with the collapse-all class become a control for all collapse targets
        _configureTargets : function(col_controls) {
            var table = this.element.is('table')?this.element:this.element.find('table')[0]
            table.addClass(widgetClass);
            // For each control, get all targets from its table column ( http://jsfiddle.net/8XSLF/ )
            $.each(col_controls, function(idx, val) {
                var control = $(this),
                    colNumber = control.parent("tr").children().index(control),
                    rows = table.find('> tbody > tr'),
                    targets = rows.find('td:nth-child(' + (colNumber + 1) + ')').add(control);
                if ( control.hasClass(classes.collapsed) ) {
                    targets.addClass(classes.collapsed);
                }
                $.data(this, 'targets', targets);
            });
        },

        _expandTargets : function(control, event) {
            var targets = control.data('targets');
            targets.removeClass(classes.collapsed);
            this._trigger( 'expanded', event, { control:control, targets:targets });
        },
        _collapseTargets : function(control, event) {
            var targets = control.data('targets');
            targets.addClass(classes.collapsed);
            this._trigger( 'collapsed', event, { control:control, targets:targets });
        },
        _toggleTargets : function(control, event) {
            var expand = control.hasClass(classes.collapsed);
            expand ? this._expandTargets(control, event) : this._collapseTargets(control, event);
        },

        // Events handled by this widget
        _configureEventHandlers : function() {
            var self = this;
            this.controls.col.click( function(event) {
                self._toggleTargets($(this), event);
            });
            this.controls.global.click( function(event) {
                var expand = $(this).hasClass(classes.collapsed);
                $(this).toggleClass(classes.collapsed);
                // TODO: change button label?

                $.each(self.controls.col, function() {
                    expand ? self._expandTargets($(this), event):self._collapseTargets($(this), event);
                });
            });
        },

        // Initialize widget instance (e.g. element creation, apply theming, bind events etc.)
        _create: function () {
            console.log('Create ', widgetName, 'instance for', this.element);
            this._getDataOptions(); // if widget recognizes data-* options in markup
            this.controls = this._configureControls();
            this._configureTargets(this.controls.col);

            // Access the element on which the widget was called via this.element
            // Access widget options via this.options
            this._configureEventHandlers();

        },

        // Destroy plugin instance  and clean up modifications the widget has made to the DOM
        _destroy: function () {
            console.log('Destroy:', this);
            $(selectors.collapsed).removeClass(classes.collapsed);
            $(selectors.icon).remove();
            this.controls.col.attr('title', '').off('click');
            this.controls.global.attr('title', '').off('click');
            $.data(this.controls.col, 'targets', null);
            $.data(this.controls.global, 'controls', null);
        }
    });

    $(selectors.add).col_collapse();

})( jQuery, window, document );