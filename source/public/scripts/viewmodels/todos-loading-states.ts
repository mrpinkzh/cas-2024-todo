import { SortingState, TodosSorted, TodosSorting } from "./todos-sorting-states.js";
import { FilteringState, TodosFiltered, TodosFiltering } from "./todos-filtering-states.js";

export abstract class LoadingState {
    sortBy: SortingState;
    filter: FilteringState;

    constructor(sortBy: SortingState, filter: FilteringState) {
        this.sortBy = sortBy;
        this.filter = filter;
    }
}

export class TodosNotLoaded extends LoadingState {
    constructor(sortBy = new TodosSorted(), filter = new TodosFiltered()) {
        super(sortBy, filter)
    }
}

export class TodosLoaded extends LoadingState {
    constructor(
        public todos = [],
        sortingState: SortingState = new TodosSorted(),
        filteringState: FilteringState = new TodosFiltered(),
        public itemAction: ItemActionState = new NoItemAction()) {

        super(sortingState, filteringState)
    }

    showSortCriterias() {
        if (this.sortBy instanceof TodosSorted)
            this.sortBy = new TodosSorting(this.sortBy.criteria)
    }

    sortWith(criteria) {
        if (this.sortBy instanceof TodosSorting)
            this.sortBy = new TodosSorted(criteria)
    }

    showFilterCriterias() {
        if (this.filter instanceof TodosFiltered)
            this.filter = new TodosFiltering(this.filter.criteria)
    }

    filterWith(criteria) {
        if (this.filter instanceof TodosFiltering)
            this.filter = new TodosFiltered(criteria)
    }

    showEditMode(todoId: string): void {
        if (this.itemAction instanceof NoItemAction)
            this.itemAction = new ShowEditMode(todoId);
    }

    showReadOnlyMode(): void {
        if (this.itemAction instanceof ShowEditMode)
            this.itemAction = new NoItemAction();
    }

    deletingTodo(todoId): void {
        this.itemAction = new ShowDeleting(todoId);
    }
}

export abstract class ItemActionState {
}

export class NoItemAction extends ItemActionState { }

export abstract class ItemActionWithTodoId {
    constructor(public todoId: string) { }
}
export class ShowEditMode extends ItemActionWithTodoId { }

export class ShowDeleting extends ItemActionWithTodoId { }