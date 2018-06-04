# Bootstrap Extra Components

A collection of small, re-usable front-end components to extend Bootstrap functionality.

 * Version: 0.1
 * Author: powderflask
 * Author URI: https://github.com/powderflask/bootstrap-extras
 * License: MIt see License

CONTENTS:
--------
 * toggle_this:     got 2 views of same content (e.g., value/form field)? Let user toggle between them.
 * column_collapse: got a wide table?  short on real-estate?  Allow user to collapse some of those columns down.
 * spinner:         a simple, CSS-only spinner.
 * ajax_form_mixin: for simple, standardized AJAX interactions where form is being submitted
 * progress_report: want a user-adjustable progress bar?  This is it!  With optional Ajax interaction.
 * modal_carousel:  a bootstrap carousel in a modal pane
 * slidout_tools:   a sticky toolbar with slide-out tabs

INSTALLATION:
-------------
 Download distribution.  Add it to your project.  Done.
 Dependencies:  Bootstrap 3, JQuery 2+

USAGE:
------
 See Example HTML page with each project.

DEVELOPMENT:
------------
Code is available at: https://github.com/powderflask/bootstrap_extras

Pull requests welcome.

TOOL CHAIN:
----------
 - npm build scripts (see https://github.com/keithamus/npm-scripts-example, https://www.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/)
 - Jeckyll + Github Pages for docs

Future:
 - Babel js transpiler
 - Sass css transpiler

TO DO:
 - npm build script to copy markup folder to docs/components
 - check-in and publish to github pages
 - build other components
 - re-factor hydronet to add this as a dependency
 - add npm script to hydronet to manage JS packages
 - add JS dependencies to project docs.