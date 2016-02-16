# Javascript Unit Testing

## Product Overview

* Testing Frameworks
    - **Jasmine**
    - **Mocha** (similar the Jasmine but more extendable)
    - QUnit
* Test Runners
    - **Karma** (from Angular)
    - TestEm
* Assertion Libraries
    - **[Chai](http://chaijs.com/)**
    - [Should](http://github.com/visionmedia/should.js)
* Mocking Libraries
    - **[Sinon.JS](http://sinonjs.org/)**

* End-to-end test framework
    - **Protractor**
    - Selenium
    - Cucumber

See also: http://www.techtalkdc.com/which-javascript-test-library-should-you-use-qunit-vs-jasmine-vs-mocha/

We continue with Karma here

## Install Karma

    // command line
    npm install -g karma-cli

and install locally (for your project)

    npm install karma --save-dev

and some plugin that we need

    npm install karma-chrome-launcher --save-dev
    npm install karma-jasmin --save-dev

## Create a sample module

    // calc.js
    var calc = (function() {
        function add(arg1, arg2) {
            return arg1 + arg2;
        }

        function multiply(arg1, arg2) {
            return arg1 * arg2;
        }

        return {
            add: add,
            multiply: multiply
        }
    })();

## Configure

create your initial config file

    karma init  // use defaults and specify '*.js' for source files

```
    // Karma configuration
    // Generated on Fri Sep 25 2015 11:49:45 GMT+0200 (CEST)

    module.exports = function(config) {
      config.set({

        // base path that will be used to resolve all patterns
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
          '*.js',
        ],

        // list of files to exclude
        exclude: [
        ],

        // preprocess matching files before serving them to the browser
        // see: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values:
        // * config.LOG_DISABLE
        // * config.LOG_ERROR
        // * config.LOG_WARN
        // * config.LOG_INFO
        // * config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching files
        autoWatch: true,

        // start these browsers
        // see: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
      })
    }
```

## Test Template

```
    describe('describe your test scenario', function() {

        // place here the setup code for the scenario

        it('describe your test', function() {
            // your test code
        });

        describe('describe can be nested', function() {

            it('another test', function() {
                // your test code
            });

        }

    });

```

## Your first test

calc.spec.js

```
    describe('calc', function() {

        describe('adding', function() {
            it('should return 2 for 1 + 1', function() {
                var result = calc.add(1,1);
                expect(result).toBe(2);
            });
        }

    });

```

And run it

    karma start

Add another test

        describe('multiplying', function() {
            it('should return 4 for 2 * 2', function() {
                var result = calc.multiply(2, 2);
                expect(result).toBe(2);
            });
        }

See the test fail because we don't have any implementation. So go fix the problem :)

Now think about the edge cases

```
    it('should work for one argument', function() {
        var result = calc.add(2);
        expect(result).toBe(2);
    });

    it('should return 4 for "2" + 2 (string arguments)', function() {
        var result = calc.add('2', 2);
        expect(result).toBe(4);
    });

    ...
```

## Add Browsers

### Safari browser

need to install launcher

    npm install karma-safari-launcher --save-dev

more launchers: https://www.npmjs.com/browse/keyword/karma-launcher

config

    browsers: ['Chrome', 'Safari']

### PhantomJS browser

PhantomJS = command line browser for unit testing

    npm install karma-safari-launcher --save-dev

    browsers: ['PhantomJS2'],

You can also choose browser on startup

    karma start --browsers Chrome

## Reporters

Reporters = test result report generators

#### karma-nyan-reporter

> Fun and improved error reporting

install

    npm install --save-dev karma-nyan-reporter

karma start --browsers Chrome

    // test results reporter to use
    reporters: ['progress', 'nyan']

#### karma-html-reporter

> Nice looking html reporter

install

    npm install karma-html-reporter --save-dev

config

    reporters: ['nyan', 'html']

#### karma-coverage

> Test coverage

install reporter

    npm install karma-coverage --save-dev

configure (in karma.conf.js)

    // test results reporter to use
    reporters: ['progress', 'coverage', 'html'],

    // add preprocessor for all source files
    preprocessors: {
        // source files, that you wanna generate coverage for
        // (these files will be instrumented by Istanbul)
        'calc.js': 'coverage'
    },

    // optionally, configure the reporter
    coverageReporter: {
        dir : 'coverage/',
        reporters: [
            { type: "html"},
            { type: "text"}
        ]
    },

## Typescript

install

    // preprocessor
    npm install karma-typescript-preprocessor --save-dev

    // typescript compiler
    npm install typescript --save-dev

configure

    // pre-process the source files
    preprocessors: {
        'add.js': 'coverage',
        '**/*.ts': ['typescript']
    },

    // preprocessor options
    typescriptPreprocessor: {
        // options passed to the typescript compiler
        options: {
            sourceMap: false,
            target: 'ES5',
            noResolve: false
        },
        // transforming the filenames
        transformPath: function(path) {
            return path.replace(/\.ts$/, '.js');
        }
    },

and rename js files to TypeScript

    mv calc.js calc.ts
    mv calc.spec.js calc.spec.ts

and add TyeScript definition references

    /// <reference path="./node_modules/karma-typescript-preprocessor/typings/jasmine/jasmine.d.ts" />
    /// <reference path="./calc.ts" />
    describe('calc', function() {
        ...
    }

or better get typing with tsd

    npm install tsd -g
    tsd install jasmine

    // and update your references
    /// <reference path="./typings/jasmine/jasmine.d.ts" />
