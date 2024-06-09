import { Todo } from "../services/todo-service.js";

export class TodoModel {
    constructor(private todo: Todo, public todoState: TodoState) { }

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

    get creationDate() {
        return this.todo.creationDate
    }
}

export class TodoState { }

export class Show extends TodoState {
    constructor(public allowAction: boolean) { super() }
}

export class ShowEditing extends TodoState { }

export class ShowUpdating extends TodoState { }

export class ShowDeleting extends TodoState { }