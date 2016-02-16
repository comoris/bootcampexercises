import util from './util';

class TodoManager {
    constructor(todos){
        this.todos = todos;
    }
    getTodos(filter) {
        if (filter === 'active') {
            return this.todos.filter(todo => !todo.completed);
        }

        if (filter === 'completed') {
            return this.todos.filter(todo => todo.completed);
        }

        return this.todos;
    }
    toggleAll( isChecked ){
        this.todos.forEach(todo => todo.completed = isChecked);
    }
    toggleOne(i){
        this.todos[i].completed = !this.todos[i].completed;
    }
    createTodo(val){
        this.todos.push({
                id: util.uuid(),
                title: val,
                completed: false,
        });
    }
    destroyCompleted(){
        this.todos = this.getTodos('active');
    }
}

export default TodoManager
