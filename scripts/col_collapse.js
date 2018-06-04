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

module.exports = function() {
    var expand_icon=$('<span class="glyphicon glyphicon-resize-full cc-rotate-45 cc-offset" aria-hidden="true">');
    var col_collapse = $('.cc-col-collapse');

    col_collapse.find('.cc-control.cc-target').append(expand_icon);

    col_collapse.find('.cc-control').click(function () {
        var target = $(this).data('target');
        if (target === 'all') {
            col_collapse.find('.cc-target').toggleClass('cc-collapsed');
        }
        else {
            col_collapse.find('.cc-target.' + target).toggleClass('cc-collapsed');
        }
    });
    col_collapse.find('.cc-control.cc-expand-all').click(function () {
        var cc_targets = col_collapse.find('.cc-target, .cc-control');
        if (col_collapse.find('.cc-collapsed').length > 0)
            cc_targets.removeClass('cc-collapsed');
        else {
            cc_targets.addClass('cc-collapsed');
        }
    });
};
