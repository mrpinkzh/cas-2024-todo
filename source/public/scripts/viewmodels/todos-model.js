import { CreatingNewTodo, TodosLoaded, TodosNotLoaded } from "./todos-loading-states.js";

export default class TodosModel {
    constructor() {
        this.state = new TodosNotLoaded()
    }

    receivedTodos(todos) {
        this.state = new TodosLoaded(todos);
    }

    creatingNewTodo() {
        if (this.state instanceof TodosLoaded)
            this.state = new CreatingNewTodo(
                this.state.todos, 
                this.state.sortBy, 
                this.state.filter)
    }
}