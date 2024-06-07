import { CreatingTodo, ShowCreationForm, ShowNewButton, TodoCreated, TodoCreationPanelState } from "./todos-creation-states.js";
import { LoadingState, TodosLoaded, TodosNotLoaded } from "./todos-loading-states.js";

export default class TodosModel {
    creation : TodoCreationPanelState;
    todoList: LoadingState;
    
    constructor() {
        this.creation = new ShowNewButton()
        this.todoList = new TodosNotLoaded()
    }

    loadingTodos() {
        if (this.todoList instanceof TodosLoaded)
            this.todoList = new TodosNotLoaded(this.todoList.sortBy, this.todoList.filter)
    }

    receivedTodos(todos) {
        if (this.todoList instanceof TodosNotLoaded)
        this.todoList = new TodosLoaded(todos, this.todoList.sortBy, this.todoList.filter)
    }

    showCreationForm() {
        this.creation = new ShowCreationForm()
    }

    showNewButton() {
        this.creation = new ShowNewButton()
    }
}