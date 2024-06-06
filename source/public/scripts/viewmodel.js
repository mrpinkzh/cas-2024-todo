class State {}

export class TodosNotLoadedState extends State {
    constructor() {
        super();
    }
}

export class TodosLoadedState extends State {
    constructor(todos) {
        super();
        this.todos = todos;
    }
}

export class CreatingNewTodoState extends TodosLoadedState {
    constructor(todos) {
        super(todos);
    }
}
