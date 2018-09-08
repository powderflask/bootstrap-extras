/*!
 * Score This Component (v0.1): score-this.js
 *  - compute a dynamic 'score' for a set of form fields
 *
 *   Dependencies:  JQuery
 *   MIT Open-source License (https://github.com/powderflask/bootstrap_extras/blob/master/LICENSE)
 */
require( './jquery-ui-widget');
require( './jquery-ui-widget-extensions');
require( './util');

;(function( $, window, document, undefined ) {

    var widgetName = 'bse.score_this',
        widgetClass = 'bse-score-this',
        classes = widgetClass.buildNamesMap(['className']),
        selectors = widgetClass.buildNamesMap(['sum', 'count'], '.'),

        markup = {
            true: '{score}/{total}',
            false: '{score}'
        };

    $.widget( widgetName, {

        // Options to be used as defaults
        options: {
            score_type: 'sum',  // or 'count'
            score_id : 'item',
            show_total: true,
        },

        // Template node for the widget
        _template : function(score, total) {
            return markup[this.options.show_total].formatUnicorn({score:score,total:total});
        },

        // Get the input elements that are being scored
        _getScoreCard: function() {
            var scoreCardSelector = selectors[widgetClass] + '-' + this.options.score_id;
            return $(scoreCardSelector + ':input');
        },

        // Events handled by this widget
        _configureEventHandlers : function(scoreCard) {
            console.log('Configure Event Handlers for:', scoreCard);
            scoreCard.change(this.reComputeScore.bind(this));
        },

        // Initialize widget instance (e.g. element creation, apply theming, bind events etc.)
        _create: function () {
            console.log('Create ', widgetName, 'instance for', this.element);
            this._getDataOptions(); // if widget recognizes data-* options in markup
            this.scoreCard = this._getScoreCard(); //
            this._configureEventHandlers(this.scoreCard);
            this.reComputeScore();
        },

        // Compute the score from the scoreCard
        reComputeScore: function() {
            score = 0;
            total = 0;
            var scoreIt = {
                'sum' : function() {
                    score += Number(this.value) || 0;
                    total += Number(this.max) || 0;
                },
                'count' : function() {
                    // This is SO specific to my use-case - be nice to generalize it a bit...
                    var checked = (this.value === 'Yes');
                    var applicable = checked || (this.value === 'No');  // otherwise, not applicable.
                    score += checked ? 1 : 0;
                    total += applicable ? 1 : 0;
                }
            };
            this.scoreCard.each(scoreIt[this.options.score_type]);
            this.element.html(this._template(score, total))
        }
     });

     $(selectors['sum']).score_this({score_type:'sum'});
     $(selectors['count']).score_this({score_type:'count'});

})( jQuery, window, document );