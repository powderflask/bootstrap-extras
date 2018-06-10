# Bootstrap Extra Components

A collection of small, re-usable front-end components to extend Bootstrap functionality.

 * Version: 0.1
 * Author: powderflask
 * Author URI: https://github.com/powderflask/bootstrap-extras
 * License: MIt see License

CONTENTS:
--------
 * ajax_save:       Submit a form via Ajax.
 * edit_this:       a display value that reveals a form when clicked, optional Ajax save on form change.
 * toggle_that:     got 2 views of same content (e.g., value/form field)? Let user toggle between them.
 * column_collapse: got a wide table?  short on real-estate?  Allow user to collapse some of those columns down.
 * spinner:         a simple, CSS-only spinner (credit: http://jsfiddle.net/csswizardry/M2D4M/)
 * progress_report: want a user-adjustable progress bar?  This is it!  With optional Ajax save.
 * modal_carousel:  a bootstrap carousel in a modal pane
 * slidout_tools:   a sticky toolbar with slide-out tabs
 * Widget ajax mixin: mixin simple, standardized AJAX interactions to any widget & emit ajax events

INSTALLATION:
-------------
 Download distribution.  Add it to your project.  Done.
 External Dependencies:  Bootstrap 3, JQuery 2+
    -- these must be loaded in browser before bse;  Manual dependency to avoid browserify-shim nonsense.

USAGE:
------
 See:  https://powderflask.github.io/bootstrap-extras/

DEVELOPMENT:
------------
Each component is built using the jQuery UI Widget Factory:  http://jqueryui.com/widget/
  (no other dependency or relation to jQuery UI -- just a consistent, convenient way to build plugins)
  
The components in this library were custom-build for a specific application.
This project is primarily a sandbox for me to learn about modern JS development practices.
It is not really intended as a generic library, and should be considered a work-in-progress and subject to change.

Fork your own: https://github.com/powderflask/bootstrap_extras

TOOL CHAIN:
----------
 - npm build scripts (see https://github.com/keithamus/npm-scripts-example, https://www.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/)
 - Jeckyll + Github Pages for docs

Future:
 - Jest test framework (https://facebook.github.io/jest/) + Sinon fakes (http://sinonjs.org)
 - Sass css transpiler
 - ES6 modules & syntax (see: https://www.contentful.com/blog/2017/04/04/es6-modules-support-lands-in-browsers-is-it-time-to-rethink-bundling/)

BUILD:
-----
 > npm install; cd docs; bundle install;  
 > npm run build;      # build dist and docs
 > npm run serve:dev;  # serve docs on dev
 > npm make:dev;       # build, serve, and open docs on dev

TO DO:
 - add explicit credits here
 - build out other components
 - unit tests!!
 - add options and events to widget docs
