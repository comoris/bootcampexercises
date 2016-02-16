# Javascript Module Patterns

### The anomymous Closures ([IIFE](http://benalman.com/news/2010/11/immediately-invoked-function-expression/))

    (function () {
        // ... all vars and functions are in this scope only
        // still maintains access to all globals
    })();

### Global Import

    (function ($, YAHOO) {
        // now have access to globals jQuery (as $) and YAHOO in this code
    })(jQuery, YAHOO);

### Module Export: Locally scoped Object Literal

```
    var MyModule = (function () {
        var my = {},
        privateVariable = 1;

        function privateMethod() {
            // ...
        }

        my.moduleProperty = 1;
        my.moduleMethod = function () {
            // ...
        };

        return my;
    })();
```

### Module Export: Revealing Module Pattern

```
    var MyModule = (function () {
        var _privateMethod = function () {      // mark private notation
            // private stull
        };

        var someMethod = function () {
            _privateMethod();
        };

        var anotherMethod = function () {
            // public
        };

        return {
            someMethod: someMethod,
            another: anotherMethod              // <- method name is different
        };
    })();
```

### Augmenting Modules

```
    // module.js
    var Module = (function (Module) {

        Module.doSomething = function () {
            // a method!
        };

        return Module;

    })(Module || {});

    // moduleExtension.js
    var Module = (function (Module) {

        Module.extension = function () {
            // another method!
        };

        return Module;

    })(Module || {});
```

### Sub Modules

    MODULE.sub = (function () {
        var my = {};
        // ...
        return my;
    })();


### Use a module

    <script src="/assets/js/myModule.js"></script>
    <script src="/assets/js/otherModule.js"></script>

### Exercise

Write a calculator service (add, substract) and use it in a web page

# Javascript Modules - CommonJS

CommonJS is a way of defining modules with the help of an exports object, that defines the module contents. Typically used in nodeJS environment.

```
    // someModule.js
    exports.doSomething = function() {
        return "foo";
    };

    //otherModule.js
    var someModule = require('someModule');

    exports.doSomethingElse = function() {
        return someModule.doSomething() + "bar";
    };
```

> CommonJS was not particularly designed with browsers in mind so, it doesn't fit to the browser environment very well.

### Use the module

    node server.js

> And other modules gets loaded via require(...) :)

Be carefull how to export, a little quize :)

```
    // what is the result of
    var result = require('./foo')

    // foo.js
    exports.foo = 'foo';
    exports = 'foo';
    module.exports = 'foo';
    module.exports.foo = 'foo';
```

Let me explain

```
    // before your code
    var module = { exports: {} };
    var exports = module.exports;       // exports is just a little helper

    // your code
    exports.foo = 'foo';

    // after your code
    return module.exports;
```

We see this in many node modules:

    var app = exports = module.exports = {};

### Exports in detail

    module.exports = 1
    module.exports = NaN
    module.exports = 'foo'
    module.exports = { foo: 'bar' }
    module.exports = ['foo', 'bar']
    module.exports = function foo () {}

### Exercise

Write a calculator service (add, substract) and use it in a command line.

    node calc.js add 1 2
    node calc.js substract 5 2

Use [https://github.com/bcoe/yargs](https://github.com/bcoe/yargs) as a command line parser.

# Javascript Modules - AMD / RequireJS

AMD = Asynchronous module definition
RequireJS = loader for AMD modules in the browser

    http://requirejs.org/

On the contrary of CommonJS, RequireJS implements AMD, which is designed to suit the browser environment. Apparently AMD started as an offspin of CommonJS Transport format and evolved into its own module definition API.

You need to add a library

    bower install requirejs

My first module

    // package/myModule.js
    define(['jquery', 'otherModule'], function($, otherModule) {
            return {
                foobar: function() {
                    ...
                }
            };
       }
    );

Somewhere else the module can be used with:

    // main.js
    require(["package/myModule"], function(myModule) {
        myModule.foobar();
    });

The entry point in the html page (scripts/main.js)

    <script data-main="scripts/main"
            src="bower_components/requirejs/require.js"></script>

> Be carefull with jquery '$( document ).ready()', use 'requirejs-domready' instead.

Optional configure RequireJS

```
    // main.js
    require.config({
        paths: {
            'jquery': 'bower_components/jquery/dist/jquery',
            'domready': 'bower_components/requirejs-domready/domready'
        }
    })

    require(['jquery', 'domready', 'message'], function($, domReady, message) {

        domReady(function() {
            $('#output').html(message);
        });

    });
```

### See also

* https://darrenderidder.github.io/talks/ModulePatterns

### Exercise

Re-work the plain of javascript calculator service and use it with RequireJS

## Javascript Modules - ECMAScript 6 modules

### How to run ES6 in node

Node 4.x includes already many ES6 features already:
* Classes
* Let
* Const
* Set/Map/Proxy
* Arrow functions
* Promises
* ...

See: https://kangax.github.io/compat-table/es6/

> Many ES6 constructs are only supported in strict mode
>     node --use_strict main.js

For using 'ES6 Modules' modules you still need babel or traceur.

    // install babel
    npm install babel -g

    // run node (only experimental or debug)
    import {foo} from './foo';
    babel-node main.js

### Default export

    // commonJS
    module.exports = 1
    module.exports = NaN
    module.exports = 'foo'
    module.exports = { foo: 'bar' }
    module.exports = ['foo', 'bar']
    module.exports = function foo () {}

    // vs ES6 modules
    export default 1
    export default NaN
    export default 'foo'
    export default { foo: 'bar' }
    export default ['foo', 'bar']
    export default function foo () {}

Importing Default Exports

    // commonJS
    var _ = require('underscore');

    // ES6 Modules
    import _ from 'lodash'

A sample

    // mymodule.js
    export default function(x) {
      return x + x;
    }

    // main.js
    import double from 'mymodule';
    double(2); // 4

export a service

    class myService {
        method() {
            return "hello";
        }
    }

    export default myService;

    // or as an instance of
    export default new myService();

### Named export

Named export

    // commonJS
    module.exports.foo = 'bar'
    module.exports.baz = 'ponyfoo'

    // vs ES6 modules
    export var foo = 'bar'
    export var baz = 'ponyfoo'

Example

    // foo.js
    export var foo = 'foo'

    // mymodule.js
    export function double(x) {     // name of function is used for the export
      return x + x;
    };

and use it

    // main.js
    import { foo } from './foo';
    import { double } from './mymodule';
    double(2); // 4

### Multiple exports

    // multiple exports
    var double = function(x) {
      return x + x;
    }
    var foo = 'foo'
    export { double, foo }

    // use it
    import { double, foo } from 'mymodule';
    double(2); // 4
    foo; // 'foo'

example with underscore

    // import individual functions
    import {map, find} from 'underscore'

    // or mix with default
    import {default as _, map} from 'underscore'

### Best Practices on Export

> For the most part I’d encourage you to use ***export default***

    var api = {
      foo: 'bar',
      double: function(x) {
        return x + x;
      }
    }
    export default api

### Load a ES6 module in the browser

Use SystemJS, WebPack or JSM

* https://github.com/systemjs/systemjs
* https://github.com/webpack/webpack
* http://jspm.io/

## Extra Info
̦
* https://github.com/ModuleLoader/es6-module-loader/wiki/Brief-Overview-of-ES6-Module-syntax
* http://bites.goodeggs.com/posts/export-this/
* http://ponyfoo.com/articles/es6-modules-in-depth
