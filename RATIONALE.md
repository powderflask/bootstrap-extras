# Project Rationale

Since this project is primarily for learning about the state of JS development in 2018,
I figured I should document what I learned and why I made specific choices / decisions.

ES6 (not):
---------
It's an interesting moment just now, seems [modern browser engines have better native support 
for ES6 than popular transpilers](https://kangax.github.io/compat-table/es6/).
However, it appears the development community is not settled on 
[best practices for deploying native ES6 modules](https://www.contentful.com/blog/2017/04/04/es6-modules-support-lands-in-browsers-is-it-time-to-rethink-bundling/).

 * use of transpiler adds extra complexity to build process, seems overkill and soon-to-be-outdated
 * develop 'old-school' in ES5 using browserify to handle compiling dist bundle
 * in future, re-develop whole package as straight-up ES6 modules with simpler build, fewer dependencies

Design:
------
The components in this package work with [Bootstrap](https://getbootstrap.com/docs/3.3/).
Thus, they implicitly depend on [jQuery](http://api.jquery.com/).
So, it made sense to utilize this dependency explicitly and design them as jQuery plugins.
I chose to go one step further and use the [jQuery UI Widget Factory](https://jqueryui.com/widget/),
based on the advice and boilerplate from [Essential JS Design Patterns](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#jquerypluginpatterns).

 * the [Widget Factory](http://api.jqueryui.com/jQuery.widget/) provides loads of built-in behaviours
 * very little boilerplate required for highly functional, customizable, and plugable components
 * consistency -- by building out every component using this design, all modules is consistent and easy to maintain
 
build:
-----
This [article](https://www.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/) 
makes a compelling case to  [use npm as a build tool](https://github.com/keithamus/npm-scripts-example).

 * given popular JS build tools require npm, this approach seems to "cut out the middle-man"
 * npm scripts are basically just CLI scripts - thus, easy to understand, mix-and-match CLI or npm tools
 * I chose npm tools used by authors I admire, simply by inspecting their package.json devDependencies.

tests:
-----
Yikes.  The code in this code base comes from a legacy production project with no tests.
I probably should have started by writing tests.  I didn't.  Kill me now.
Future: use [jest](https://facebook.github.io/jest/) with [Sinon fakes](http://sinonjs.org)

docs:
-----
[Jekyll](https://jekyllrb.com/) was a natural choice for building project docs because of its use
by [GitHub Pages](https://jekyllrb.com/docs/github-pages/).

 * site documentation hosted on GitHub: https://powderflask.github.io/bootstrap-extras/
 * uses [capture](https://shopify.github.io/liquid/tags/variable/#capture) 
   and [include](https://jekyllrb.com/docs/includes/) tags to show exact markup for each example, no duplication!
 
I see it is common practice to use the top-level repo directory as Jekyll doc root.  
That approach gives Jekyll access to all the source and dist folders below (Jekyll cannot traverse up a directory tree, only down)
But I can't stand the clutter, so to keep the repo tidy:

 * use 'docs' as the Jekyll root to keep docs separate from source (and works forGitHub pages)
 * have the build script copy in relevant bits of source and dist used in the docs
 