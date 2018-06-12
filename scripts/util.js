/**
 * Bootstrap Extra Utilities
 *   ... or, things you can't believe are not included out-of-the-box with JS
 *
 *   MIT Open-source License (https://github.com/powderflask/bootstrap_extras/blob/master/LICENSE)
 */

// https://stackoverflow.com/a/18234317/1993525
String.prototype.formatUnicorn = String.prototype.formatUnicorn ||
function () {
    "use strict";
    var str = this.toString();
    if (arguments.length) {
        var t = typeof arguments[0];
        var key;
        var args = ("string" === t || "number" === t) ?
            Array.prototype.slice.call(arguments)
            : arguments[0];

        for (key in args) {
            str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
        }
    }

    return str;
};

String.prototype.asTemplate = String.prototype.asTemplate ||
function () {
    "use strict";
    var template = this.toString();

    return function(args) {
        return template.formatUnicorn(args);
    };
};

// Return an object with property, el:name, for each el in extensions, where name = pre + this + sep + el
String.prototype.buildNamesMap = String.prototype.buildNamesMap ||
function (extentions, pre, sep) {
  pre = pre || '';
  sep = sep || '-';
  var base = this;
  function build(obj, key) {
    obj[key] = pre+base+sep+key;
    return obj;
  }
  var map = extentions.reduce(build, {});
  map[base] = pre+base;
  return map;
};
