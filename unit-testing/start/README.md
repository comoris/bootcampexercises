# Exercise

## Refactor

- use ES6 feature where you see fit (arrow functions, string interpolation, let & const, ...)
- fix all ESLint errors
    - webpack
    - webstorm 11
        enable Language & Frameworks - Javascript - Code Quality Tools - ESList - enable + config file
    - atom
        package: linter-eslint
- use ES6 modules in place of CommonJS
- use ES6 class for util.js
- use ES6 class for app.js

## Unit test, the basics

- add Karma with Webpack integration
- add unit tests for util.js
    - uuid
    - pluralize

## Refactor 2 & continue unit test

Move all none GUI related code into a new class ```TodoManager```,
this class will hold all the todo's and manage adding, filtering, removing, ...

Possible functions of TodoManager:

- getTodos(filter)
- getTodo(id)
- addTodo(value)
- removeTodo(id)
- toggleAll(completed)
- ...

During the refactor, write also unit test to test the TodoManager
