import { ShowCreationForm, ShowNewButton, TodoCreationPanelState } from "./todos-creation-states.js";
import { LoadingState, TodosLoaded, TodosNotLoaded } from "./todos-loading-states.js";

export default class TodosModel {
    creation: TodoCreationPanelState;
    todoList: LoadingState;
    themes = ['theme-light', 'theme-dark', 'theme-navy', 'theme-pink']
    selectedTheme = 0

    constructor() {
        this.creation = new ShowNewButton()
        this.todoList = new TodosNotLoaded()
    }

    switchTheme() {
        this.selectedTheme += 1
    }

    get theme(): string {
        return this.themes[this.selectedTheme % this.themes.length]
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