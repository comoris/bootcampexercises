var util=function(){return{uuid:function(){var t,e,o="";for(t=0;32>t;t++)e=16*Math.random()|0,(8===t||12===t||16===t||20===t)&&(o+="-"),o+=(12===t?4:16===t?3&e|8:e).toString(16);return o},pluralize:function(t,e){return 1===t?e:e+"s"},store:function(t,e){if(arguments.length>1)return localStorage.setItem(t,JSON.stringify(e));var o=localStorage.getItem(t);return o&&JSON.parse(o)||[]}}}();jQuery(function(t){"use strict";Handlebars.registerHelper("eq",function(t,e,o){return t===e?o.fn(this):o.inverse(this)});var e=13,o=27,i={init:function(){this.todos=util.store("todos-jquery"),this.todoTemplate=Handlebars.compile(t("#todo-template").html()),this.footerTemplate=Handlebars.compile(t("#footer-template").html()),this.bindEvents(),new Router({"/:filter":function(t){this.filter=t,this.render()}.bind(this)}).init("/all")},bindEvents:function(){t("#new-todo").on("keyup",this.create.bind(this)),t("#toggle-all").on("change",this.toggleAll.bind(this)),t("#footer").on("click","#clear-completed",this.destroyCompleted.bind(this)),t("#todo-list").on("change",".toggle",this.toggle.bind(this)).on("dblclick","label",this.edit.bind(this)).on("keyup",".edit",this.editKeyup.bind(this)).on("focusout",".edit",this.update.bind(this)).on("click",".destroy",this.destroy.bind(this))},render:function(){var e=this.getFilteredTodos();t("#todo-list").html(this.todoTemplate(e)),t("#main").toggle(e.length>0),t("#toggle-all").prop("checked",0===this.getActiveTodos().length),this.renderFooter(),t("#new-todo").focus(),util.store("todos-jquery",this.todos)},renderFooter:function(){var e=this.todos.length,o=this.getActiveTodos().length,i=this.footerTemplate({activeTodoCount:o,activeTodoWord:util.pluralize(o,"item"),completedTodos:e-o,filter:this.filter});t("#footer").toggle(e>0).html(i)},toggleAll:function(e){var o=t(e.target).prop("checked");this.todos.forEach(function(t){t.completed=o}),this.render()},getActiveTodos:function(){return this.todos.filter(function(t){return!t.completed})},getCompletedTodos:function(){return this.todos.filter(function(t){return t.completed})},getFilteredTodos:function(){return"active"===this.filter?this.getActiveTodos():"completed"===this.filter?this.getCompletedTodos():this.todos},destroyCompleted:function(){this.todos=this.getActiveTodos(),this.filter="all",this.render()},indexFromEl:function(e){for(var o=t(e).closest("li").data("id"),i=this.todos,r=i.length;r--;)if(i[r].id===o)return r},create:function(o){var i=t(o.target),r=i.val().trim();o.which===e&&r&&(this.todos.push({id:util.uuid(),title:r,completed:!1}),i.val(""),this.render())},toggle:function(t){var e=this.indexFromEl(t.target);this.todos[e].completed=!this.todos[e].completed,this.render()},edit:function(e){var o=t(e.target).closest("li").addClass("editing").find(".edit");o.val(o.val()).focus()},editKeyup:function(i){i.which===e&&i.target.blur(),i.which===o&&t(i.target).data("abort",!0).blur()},update:function(e){var o=e.target,i=t(o),r=i.val().trim();return r?(i.data("abort")?i.data("abort",!1):this.todos[this.indexFromEl(o)].title=r,void this.render()):void this.destroy(e)},destroy:function(t){this.todos.splice(this.indexFromEl(t.target),1),this.render()}};i.init()});