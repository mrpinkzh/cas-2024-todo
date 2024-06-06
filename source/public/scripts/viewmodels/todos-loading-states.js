import { TodosSorted } from "./todos-sorting-states.js";
import { TodosFiltered } from "./todos-filtering-states.js";

class State { }

export class TodosNotLoaded extends State { }

export class TodosLoaded extends State {
    constructor(todos = [], sortingState = new TodosSorted(), filteringState = new TodosFiltered()) {
        super();
        this.todos = todos;
        this.sortBy = sortingState;
        this.filter = filteringState;
    }
}

export class CreatingNewTodo extends TodosLoaded { }