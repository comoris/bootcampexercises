'use strict';

import util from './util';
import $ from 'jquery';
import Handlebars from 'handlebars';
import { Router } from 'director';

import todoTemplate from '../todoTemplate.html';
import footerTemplate from '../footerTemplate.html';

import TodoManager from './todomanager';
import '../styles/index.scss';

Handlebars.registerHelper('eq', function (a, b, options) {
    return (a === b) ? options.fn(this) : options.inverse(this);
});

const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

class App {
    init() {
        const todos = util.store('todos-jquery');
        this.todomanager = new TodoManager(todos);
        this.todoTemplate = Handlebars.compile(todoTemplate);
        this.footerTemplate = Handlebars.compile(footerTemplate);
        this.bindEvents();

        new Router({
            '/:filter': function (filter) {
                this.filter = filter;
                this.render();
            }.bind(this),
        }).init('/all');
    }
    bindEvents() {
        $('#new-todo').on('keyup', this.create.bind(this));
        $('#toggle-all').on('change', this.toggleAll.bind(this));
        $('#footer').on('click', '#clear-completed', this.destroyCompleted.bind(this));
        $('#todo-list')
            .on('change', '.toggle', this.toggle.bind(this))
            .on('dblclick', 'label', this.edit.bind(this))
            .on('keyup', '.edit', this.editKeyup.bind(this))
            .on('focusout', '.edit', this.update.bind(this))
            .on('click', '.destroy', this.destroy.bind(this));
    }
    render() {
        //const todos = this.getFilteredTodos();
        const todos = this.todomanager.getTodos(this.filter);
        $('#todo-list').html(this.todoTemplate(todos));
        $('#main').toggle(todos.length > 0);
        $('#toggle-all').prop('checked', this.todomanager.getTodos('active').length === 0);
        this.renderFooter();
        $('#new-todo').focus();
        util.store('todos-jquery', this.todomanager.getTodos());
    }
    renderFooter() {
        const todoCount = this.todomanager.getTodos().length;
        const activeTodoCount = this.todomanager.getTodos('active').length;
        const template = this.footerTemplate({
            activeTodoCount,
            activeTodoWord: util.pluralize(activeTodoCount, 'item'),
            completedTodos: todoCount - activeTodoCount,
            filter: this.filter,
        });

        $('#footer').toggle(todoCount > 0).html(template);
    }
    toggleAll(e) {
        const isChecked = $(e.target).prop('checked');

        this.todomanager.toggleAll(isChecked);

        this.render();
    }

    destroyCompleted() {
        //this.todomanager.todos = this.todomanager.getTodos('active');
        this.todomanager.destroyCompleted();
        this.filter = 'all';
        this.render();
    }
    // accepts an element from inside the `.item` div and
    // returns the corresponding index in the `todos` array
    indexFromEl(el) {
        const id = $(el).closest('li').data('id');
        const todos = this.todomanager.todos;
        let i = this.todomanager.todos.length;

        while (i--) {
            if ( this.todomanager.todos[i].id === id) {
                return i;
            }
        }
    }
    create(e) {
        const $input = $(e.target);
        const val = $input.val().trim();

        if (e.which !== ENTER_KEY || !val) {
            return;
        }

        this.todomanager.createTodo(val);

        $input.val('');

        this.render();
    }
    toggle(e) {
        // met id werken
        const i = this.indexFromEl(e.target);
        // this.todomanager.todos[i].completed = !this.todomanager.todos[i].completed;
        this.todomanager.toggleOne(i);
        this.render();
    }
    edit(e) {
        const $input = $(e.target).closest('li').addClass('editing').find('.edit');
        $input.val($input.val()).focus();
    }
    editKeyup(e) {
        if (e.which === ENTER_KEY) {
            e.target.blur();
        }

        if (e.which === ESCAPE_KEY) {
            $(e.target).data('abort', true).blur();
        }
    }
    update(e) {
        const el = e.target;
        const $el = $(el);
        const val = $el.val().trim();

        if (!val) {
            this.destroy(e);
            return;
        }

        if ($el.data('abort')) {
            $el.data('abort', false);
        } else {
            this.todomanager.todos[this.indexFromEl(el)].title = val;
        }

        this.render();
    }
    destroy(e) {
        this.todomanager.todos.splice(this.indexFromEl(e.target), 1);
        this.render();
    }
}
const app = new App();

app.init();
