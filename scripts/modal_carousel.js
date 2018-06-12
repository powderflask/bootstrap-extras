/**
 * Modal Carousel Component (v0.1): modal_carousel.js
 *   -- a Bootstrap Image Carousel within a Bootstrap Modal
 *   -- data source for Carousel can be inline, loaded from another element, or loaded via Ajax request
 *
 *   Dependencies:  Bootstrap + JQuery
 *   MIT Open-source License (https://github.com/powderflask/bootstrap_extras/blob/master/LICENSE)
 */
require( './jquery-ui-widget');
require( './jquery-ui-widget-extensions');
require( './util' );

;(function( $, window, document, undefined ) {

    var widgetName = 'bse.modal_carousel',
        widgetClass = 'bse-modal-carousel',
        classes = widgetClass.buildNamesMap(['panel', 'form', 'value']),
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
/*
<div class="modal" id="modal-gallery" role="dialog">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
          <button class="close" type="button" data-dismiss="modal">×</button>
          <h3 class="modal-title"></h3>
      </div>
      <div class="modal-body">
          <div id="modal-carousel" class="carousel">

            <div class="carousel-inner">
            </div>

            <a class="carousel-control left" href="#modal-carousel" data-slide="prev"><i class="glyphicon glyphicon-chevron-left"></i></a>
            <a class="carousel-control right" href="#modal-carousel" data-slide="next"><i class="glyphicon glyphicon-chevron-right"></i></a>

          </div>
      </div>
      <div class="modal-footer">
          <button class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
*/
    $.widget( widgetName, {

        // Options to be used as defaults
        options: {
            title: false,     // Override for default modal title (title of active carousel image)
            items: '',        // optionally, a selector for carousel items elsewhere in the DOM
            action: false,
            method: 'POST',

            // event callbacks (ajax event callbacks also trigger)
            loadContent: null   // called just prior to loading content via Ajax - return false to prevent default action
        },

        // Template node for the widget
        _template : function(modal_id) {
            var carousel_id = modal_id+'-carousel',
                carousel_selector = '#'+carousel_id;
            // Carousel items may be inline in the element, content elsewhere on the DOM, or via Ajax
            this.items = this.element.find('.item')
                                     .add(this.options.items);

            this.carousel = $.apply(this, markup.carousel).attr('id', carousel_id)
                                .append($.apply(this, markup.inner)
                                    .append(this.items)
                                )
                                .append($.apply(this, markup.controlLeft).attr('href',carousel_selector)
                                    .append($.apply(this, markup.iconLeft))
                                )
                                .append($.apply(this, markup.controlRight).attr('href',carousel_selector)
                                    .append($.apply(this, markup.iconRight))
                                );
            this.modal_title = $.apply(this, markup.title);
            this._set_title();
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
            return this.modal_dialog;
        },

        // Set the modal title
        _set_title : function() {
            var title = this.options.title ||
                        this.carousel.find(".item.active img").attr("title")
            this.modal_title.html(title);
        },

        // Events handled by this widget
        _configureEventHandlers : function() {
            var self = this;
            this.carousel.on("slid.bs.carousel", function () {
                self._set_title();
            });
        },

        // Initialize widget instance (e.g. element creation, apply theming, bind events etc.)
        _create: function () {
            console.log("Create ", widgetName, " instance for", this.element);
            this._ajaxConfig();
            this._getDataOptions();
            this.element.addClass('modal').attr('role', 'dialog');
            this.element.append(this._template(this.element.attr('id')));
            //this.element.hide();
            this._configureEventHandlers();
        },

        // Destroy plugin instance  and clean up modifications the widget has made to the DOM
        _destroy: function () {
            console.log("Destroy: ", this.modal);
            this.element.append(this.items);
            this.element.removeClass('modal');
            this.modal_dialog.remove()
        }
    });

    $(selectors[widgetClass]).modal_carousel();

})( jQuery, window, document );

