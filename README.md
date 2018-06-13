# Bootstrap Extra Components

A collection of small, re-usable front-end components to extend Bootstrap functionality.

 * Version: 0.1
 * Author: powderflask
 * Author URI: https://github.com/powderflask/bootstrap-extras
 * License: MIT see License

COMPONENTS:
----------
 * ajax_delete_it:  Submit a simple Delete request via Ajax.
 * ajax_save_form:  Submit a form via Ajax.
 * column_collapse: got a wide table?  short on real-estate?  Allow user to collapse some of those columns down.
 * edit_this:       a display value that reveals a form when clicked, optional Ajax save on form change.
 * modal_carousel:  a bootstrap carousel in a boostrap modal, with data loaded from DOM or AJAX
 * move_this:       move an element to a container elsewhere in the markup
 * progress_report: want a user-adjustable progress bar?  This is it!  With optional Ajax save.
 * slideout_tools:  a fixed toolbar with slide-out buttons constructed from DOM elements anywhere in markup
 * spinner:         a simple, CSS-only spinner (credit: http://jsfiddle.net/csswizardry/M2D4M/)
 * toggle_that:     got a bunch of disparate elements that all need to toggle together? 
 * Widget Ajax-mixin: mix-in simple, standardized AJAX interactions to any widget & emit ajax events

INSTALLATION:
-------------
 Download /dist  Add it to your project.  Done.
 External Dependencies:  Bootstrap 3, JQuery 2+
    -- these must be loaded in browser before bse;  Manual dependency to avoid browserify-shim nonsense.
 
USAGE:
------
 Each component is a [jQuery UI Widget](http://jqueryui.com/widget/) that can be activated with markup or in code.

 See:  https://powderflask.github.io/bootstrap-extras/

DEVELOPMENT:
------------
Each component is built using the jQuery UI Widget Factory:  http://api.jqueryui.com/jQuery.widget/
  (no other dependency or relation to jQuery UI -- just a consistent, convenient way to build plugins)
  
The components in this library were custom-build for a specific application.
This project is primarily a sandbox for me to learn about modern JS development practices.
It is not really intended as a generic library, and should be considered a work-in-progress and subject to change.

Fork your own: https://github.com/powderflask/bootstrap_extras

TOOL CHAIN:
----------
 - HTML5, CSS3, ES5, jQuery, Bootstrap 3
 - npm build scripts (see https://github.com/keithamus/npm-scripts-example, https://www.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/)
 - Jeckyll (gem) + Github Pages for docs

Future:
 - [Jest](https://facebook.github.io/jest/) or [Qunit](http://qunitjs.com/) test framework + Sinon fakes (http://sinonjs.org)
 - Sass css transpiler
 - ES6 modules & syntax (see: https://www.contentful.com/blog/2017/04/04/es6-modules-support-lands-in-browsers-is-it-time-to-rethink-bundling/)

BUILD:
-----
    > npm install; cd docs; bundle install;  
    > npm run build-dev;  # build dev dist and docs
    > npm run serve:dev;  # serve docs on dev
    > npm make:dev;       # build, serve, and open docs on dev
    > npm run build-prod; # build production dist and docs

TO DO:
 - improve options to pass ajax object, merged with ajax defaults (see Select2)
 - unit tests!!
 - add options and events to widget docs
 - add docs pages for component combo examples?
