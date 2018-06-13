/**
 * Table Column Collapse (v0.1): col-collapse.js
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
        selectors = widgetClass.buildNamesMap(['collapsed', 'icon', 'add', 'controlAll', 'control', 'controlLabel'], '.'),

        markup = {
            expand_icon: ['<span>', {'class': classes.icon, 'aria-hidden': 'true'}],
        };

        // helpers
        expand = function(el){
            el.removeClass(classes.collapsed);
        };
        collapse = function(el){
            el.addClass(classes.collapsed);
        };
        toggleCollapsed = function(el) {
            el.toggleClass(classes.collapsed);
        };
        isCollapsed = function(el) {
            return el.hasClass(classes.collapsed);
        };

    $.widget( widgetName, {

        // Options to be used as defaults
        options: {
            control_title: 'Expand/Collapse Column',
            controlAll_title: 'Expand/Collapse All',
            controlAll_labels: {true: 'Expand All', false: 'Collapse All'},  // null or false to leave default
            icon_class: 'glyphicon glyphicon-resize-full bse-rotate-45',

            // event callbacks
            collapsed: null,
            expanded: null
        },

        // Configure and return the widget controls
        _configureControls : function() {
            var expand_icon = $.apply(this, markup.expand_icon).addClass(this.options.icon_class),
                col_controls = this.element.find(selectors.control),
                global_controls = this.element.find(selectors.controlAll);

            col_controls.append(expand_icon.clone())
                        .attr('title', this.options.control_title);
            global_controls.prepend(expand_icon.clone())
                           .attr('title', this.options.controlAll_title);
            collapse(global_controls);  // Assume initial state for global control is Expand All?
            global_controls.data('controls', col_controls);
            return {
                col : col_controls,
                global : global_controls
            };
        },

        // Configure the collapse targets for each control -- i.e., td elements in the same column
        _configureTargets : function(col_controls) {
            var table = this.element.is('table')?this.element:this.element.find('table')[0]
            table.addClass(widgetClass);
            // For each control, get all targets from its table column ( http://jsfiddle.net/8XSLF/ )
            $.each(col_controls, function(idx, val) {
                var control = $(this),
                    colNumber = control.parent("tr").children().index(control),
                    rows = table.find('> tbody > tr'),
                    targets = rows.find('td:nth-child(' + (colNumber + 1) + ')').add(control);
                if ( isCollapsed(control) ) {
                    collapse(targets);
                }
                control.data('targets', targets);
            });
        },

        // Events handled by this widget
        _configureEventHandlers : function() {
            var self = this;
            this.controls.col.click( function(event) {
                self.toggleTargets($(this), event);
            });
            this.controls.global.click( function(event) {
                var control = $(this);
                expandAll = isCollapsed(control);
                $.each(self.controls.col, function() {
                    expandAll ? self.expandTargets($(this), event):self.collapseTargets($(this), event);
                });

                // optionally, change control's label
                toggleCollapsed(control);
                if (self.options.controlAll_labels) {
                    var label = control.find(selectors.controlLabel);
                    label.html(self.options.controlAll_labels[isCollapsed(control)]);
                }

            });
        },

        // Initialize widget instance (e.g. element creation, apply theming, bind events etc.)
        _create: function () {
            // console.log('Create ', widgetName, 'instance for', this.element);
            this._getDataOptions(); // if widget recognizes data-* options in markup
            this.controls = this._configureControls();
            this._configureTargets(this.controls.col);
            this._configureEventHandlers();
        },

        // Destroy plugin instance  and clean up modifications the widget has made to the DOM
        _destroy: function () {
            // console.log('Destroy:', this);
            $(selectors.collapsed).removeClass(classes.collapsed);
            $(selectors.icon).remove();
            this.controls.col.attr('title', '').off('click');
            this.controls.global.attr('title', '').off('click');
            this.controls.col.data('targets', null);
            this.controls.global.data('controls', null);
        },

        // Public methods
        expandTargets : function(control, event) {
            var targets = control.data('targets');
            expand(targets);
            this._trigger( 'expanded', event, { control:control, targets:targets });
        },
        collapseTargets : function(control, event) {
            var targets = control.data('targets');
            collapse(targets);
            this._trigger( 'collapsed', event, { control:control, targets:targets });
        },
        toggleTargets : function(control, event) {
            isCollapsed(control) ? this.expandTargets(control, event) : this.collapseTargets(control, event);
        }
    });

    $(selectors.add).col_collapse();

})( jQuery, window, document );