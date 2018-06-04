/**
 * Bootstrap Extras (v0.1): main.js
 *   -- Collate all component scripts via Broswerify https://www.npmjs.com/package/browserify
 *
 *   Dependencies:  Bootstrap + JQuery + spinner
 *   MIT Open-source License (https://github.com/powderflask/bootstrap_extras/blob/master/LICENSE)
 */

spinner = require('./spinner');
col_collapse = require('./col_collapse.js');
progress_report = require('./progress_report.js');

$(document).ready(function() {
    spinner( jQuery );
    col_collapse();
    progress_report();
});
