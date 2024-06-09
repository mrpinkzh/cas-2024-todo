import { ItemActionState } from "./todos-loading-states";

export class TodoModel {
    todo: any
    constructor(todo, public todoState: TodoState) {
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

export class TodoState { }

export class Show extends TodoState {
    constructor(public allowAction: boolean) { super() }
}

export class ShowEditing extends TodoState { }

export class ShowUpdating extends TodoState { }

export class ShowDeleting extends TodoState { }