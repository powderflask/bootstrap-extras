/**
 * Modal Carousel Component (v0.1): modal-carousel.js
 *   -- a Bootstrap Image Carousel within a Bootstrap Modal
 *   -- data source for Carousel can be inline, loaded from another element, or loaded via Ajax request
 *
 *   Dependencies:  Bootstrap + JQuery
 *   MIT Open-source License (https://github.com/powderflask/bootstrap_extras/blob/master/LICENSE)
 */
require( './jquery-ui-widget');
require( './jquery-ui-widget-extensions');
require( './spinner.js' );
require( './util' );

;(function( $, window, document, undefined ) {

    var widgetName = 'bse.modal_carousel',
        widgetClass = 'bse-modal-carousel',
        selectors = widgetClass.buildNamesMap([], '.'),

        markup = {
            dialog : ['<div>', {'class': 'modal-dialog'}],
            content : ['<div>', {'class': 'modal-content'}],
            header : ['<div>', {'class': 'modal-header'}],
            dismiss : ['<button>', {'class': 'close', 'type':'button', 'data-dismiss': 'modal', text: '×'}],
            title : ['<h3>', {'class': 'modal-title'}],
            body : ['<div>', {'class': 'modal-body'}],
            carousel : ['<div>', {'class': 'carousel'}],
            inner : ['<div>', {'class': 'carousel-inner'}],
            controlLeft : ['<a>', {'class': 'carousel-control left', 'data-slide': 'prev'}],
            iconLeft : ['<i>', {'class': 'glyphicon glyphicon-chevron-left'}],
            controlRight : ['<a>', {'class': 'carousel-control right', 'data-slide': 'next'}],
            iconRight : ['<i>', {'class': 'glyphicon glyphicon-chevron-right'}],
            footer : ['<div>', {'class': 'modal-footer'}],
            close : ['<button>', {'class': 'btn btn-default', 'data-dismiss': 'modal', text: 'Close'}],
        };

    $.widget( widgetName, {

        // Options to be used as defaults
        options: {
            title: false,     // Override for modal title to use instead of title of active carousel img
            items: '',        // optional, a selector for carousel items elsewhere in the DOM
            url: false,       // optional, a url for carousel items loaded via Ajax
            carouselOptions: {interval: false},  // prevent auto-slide by default

            // event callbacks (ajax event callbacks also trigger)
            loadContent: null   // called just prior to loading content via Ajax - return false to prevent default action
        },

        // Template node for the widget
        _template : function(modal_id) {
            var carousel_id = modal_id+'-carousel',
                carousel_selector = '#'+carousel_id;
            // The carousel and carousel items...
            this.carousel_inner = $.apply(this, markup.inner);
            this.items = this._loadItems(this.carousel_inner);
            this.carousel = $.apply(this, markup.carousel).attr('id', carousel_id)
                                .append(this.carousel_inner)
                                .append($.apply(this, markup.controlLeft).attr('href',carousel_selector)
                                    .append($.apply(this, markup.iconLeft))
                                )
                                .append($.apply(this, markup.controlRight).attr('href',carousel_selector)
                                    .append($.apply(this, markup.iconRight))
                                );
            // ... loaded into a modal dialog ...
            this.modal_title = $.apply(this, markup.title).text(this._getTitleText());
            this.modal_dialog = $.apply(this, markup.dialog)
                                    .append($.apply(this, markup.content)
                                        .append($.apply(this, markup.header)
                                            .append($.apply(this, markup.dismiss))
                                            .append(this.modal_title)
                                        )
                                        .append($.apply(this, markup.body)
                                            .append(this.carousel)
                                        )
                                        .append($.apply(this, markup.footer)
                                            .append($.apply(this, markup.close))
                                        )
                                    );
            this.carousel.carousel(this.options.carouselOptions);
            return this.modal_dialog;
        },

        // Load carousel items to the target element and check exactly 1 item is active
        _loadItems: function(target) {
            // Carousel items may be inline in the element or added from elsewhere on the DOM...
            var items = this.element.find('.item')
                                     .add(this.options.items);
            // ... or loaded via Ajax...
            if (this.options.url) {
                this._loadAjaxItems(target, this.options.url, items);
            }
            // Activate current set of items and move them to the target container.
            this._activateItems(items);
            target.append(items);
            return items;
        },

        // Remove carousel items from this carousel.
        _removeItems: function() {
            this.element.find('.item').remove();
            this.items = this.element.find('.item');
        },

        // Load carousel items via Ajax, adding any items loaded to the items object when they arrive
        _loadAjaxItems: function(target, url, items) {
            var spinner = this._addSpinner(target),
                self = this;
            target.load(url, function() {
                // self._removeSpinner(spinner);  // spinner element is removed when Ajax content is loaded to target!
                var ajax_items = target.find('.item');
                items = items.add(ajax_items);
                self._activateItems(items);
                self.modal_title.html(self._getTitleText());
            });
        },

        // Create a spinner item in the given target
        _addSpinner: function(target) {
            var spinner = $('<div>', {'class': 'item active'}).spinner();
            spinner.spinner('show');
            target.append(spinner);
            return spinner;
        },
        // destroy the given spinner
        _removeSpinner: function(spinner) {
            spinner.spinner('destroy');
        },

        // Get the modal title text, which may be set by option or pulled from active img in carousel
        _getTitleText: function() {
            return this.options.title || this.carousel.find(".item.active img").attr("title");
        },

        // Ensure exactly one item is active.
        _activateItems: function(items) {
            var active = items.filter('.active');
            if (active.length>1) {
                active.removeClass('active');
                active.first().addClass('active');
            }
            else if (active.length < 1) {
                items.first().addClass('active');
            }
        },

        // Events handled by this widget
        _configureEventHandlers : function() {
            var self = this;
            this.carousel.on("slid.bs.carousel", function () {
                self.modal_title.html(self._getTitleText());
            });
            this.element.on('show.bs.modal', function (event) {
              var button = $(event.relatedTarget), // Button that triggered the modal
                  url = button.data('url'); // If button supplies a URL, use it to load items...
              if (url) {
                  self._removeItems();
                  self._loadAjaxItems(self.carousel_inner, url, self.items);
              }
            })
        },

        // Initialize widget instance (e.g. element creation, apply theming, bind events etc.)
        _create: function () {
            // console.log("Create ", widgetName, " instance for", this.element);
            this._ajaxConfig();
            this._getDataOptions();
            this.element.addClass('modal').attr('role', 'dialog');
            this.element.append(this._template(this.element.attr('id')));
            this._configureEventHandlers();
        },

        // Destroy plugin instance  and clean up modifications the widget has made to the DOM
        _destroy: function () {
            //console.log("Destroy: ", this.modal);
            // Does not appear to be a way to disable a BS modal once it's been enabled.
            // this.element.append(this.items);
            // this.element.removeClass('modal');
            // this.modal_dialog.remove()
        }
    });

    $(selectors[widgetClass]).modal_carousel();

})( jQuery, window, document );
