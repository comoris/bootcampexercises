import TodoManager from './todomanager';

describe('calc', ()=>{

    let arrayObjects;
    let manager;

    beforeEach(() =>{
         arrayObjects = [
            { id: 1, title:'test1', completed: true },
            { id: 2, title:'test2', completed: false },
            { id: 3, title:'test2', completed: false }
        ];
        manager = new TodoManager(arrayObjects);
    });

    describe('todo-values', ()=>{
        it('should return the number of todos = 3', function() {
            var result = manager.getTodos();
            expect(result).to.have.length(3);
        })
    });

    describe('todo-filter', ()=>{
        it('should return 1 completed todos', function() {
            var result = manager.getTodos('completed');
            expect(result).to.have.length( 1 );
        })
        it('should return the active todos = 2' , function() {
            var result = manager.getTodos('active');
            expect(result).to.have.length(2);
        })
        it('should return all todos = 3' , function() {
            var result = manager.getTodos();
            expect(result).to.have.length(3);
        })
    });

    describe('toglle', () => {
        it('should toggle all todos: completed properties to false', function() {
            var isChecked = true;
            manager.toggleAll(isChecked);

            var checker = false;
            arrayObjects.forEach( function(obj) {
                if (obj.completed === false) {
                    checker = true;
                }
            });

            expect(checker).to.equal(false);
        })
        it('should toggle one todo: completed', function() {
            let manager_1 = new TodoManager([{ id: 1, title:'test1', completed: true }]);
            manager_1.toggleOne(0);
            expect(manager_1.todos[0].completed).to.equal(false);
        })
    });

    describe('create/destroy a new todo', ()=>{
        it('sould create an extra todo', function() {
            let manager_2 = new TodoManager([]);
            manager_2.createTodo();
            expect(manager_2.todos).to.have.length(1);
        })
        it('should destroy completed todo', function() {
            manager.destroyCompleted();
            expect(manager.todos).to.have.length(2);
        })
    });

});
