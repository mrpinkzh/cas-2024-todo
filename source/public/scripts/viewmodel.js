class State {}

export class TodosNotLoadedState extends State {
    constructor() {
        super();
    }
}

export class TodosLoadedState extends State {
    constructor(todos = [], sortingState = new TodosSorted(), filteringState = new TodosFiltered()) {
        super();
        this.todos = todos;
        this.sortBy = sortingState;
        this.filter = filteringState;
    }
}

export class CreatingNewTodoState extends TodosLoadedState {
    constructor(todos, sortingState, filteringState) {
        super(todos, sortingState, filteringState);
    }
}

export class TodosSortingState {
    static TITLE_ASC() { return "title asc" }
}

export class TodosSorted extends TodosSortingState {
    constructor(criteria = TodosSortingState.TITLE_ASC()) {
        super()
        this.criteria = criteria
    }
}

export class TodosSorting extends TodosSortingState {
    constructor(currentCriteria) {
        super()
        this.currentCriteria = currentCriteria
        this.criterias = [
            TodosSortingState.TITLE_ASC(),
            "title desc",
            "most important",
            "least important",
            "next due",
            "last due"
        ]
    }
}

export class TodosFilteringState {
    static NONE() { return  "none" }
}

export class TodosFiltered extends TodosFilteringState {
    constructor(criteria = TodosFilteringState.NONE()){
        super()
        this.criteria = criteria
    }
}


export class TodosFiltering extends TodosFilteringState {
    constructor(currentCriteria){
        super()
        this.criteria = currentCriteria,
        this.criterias = [
            "only pending",
            "only done", 
            TodosFilteringState.NONE()
        ]
    }
}