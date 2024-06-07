export class TodoModel {
    todo: any
    constructor(todo){
        this.todo = todo;
    }

    get id() {
        return this.todo._id;
    }

    get title() {
        return this.todo.title;
    }

    get done() {
        return this.todo.done;
    }

    get importance() {
        return this.todo.importance;
    }

    get dueDate() {
        return this.todo.dueDate;
    }

    get description() {
        return this.todo.description;
    }
}